const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { verifyToken } = require('../middleware/auth');



router.get("/", async (req, res) => {
  const admin = await Admin.create({
    "username": "editor123",
    "email": "editor@example.com",
    "password": "securePassword123",
    "name": "Priya Sharma",
    "role": "editor",
    "isActive": true,
    "lastLogin": new Date(),
    "permissions": {
      "stories": {
        "create": true,
        "edit": true,
        "delete": false,
        "publish": true
      },
      "comments": {
        "moderate": true,
        "approve": true,
        "delete": true
      },
      "suggestions": {
        "review": true,
        "approve": true
      },
      "subscriptions": {
        "manage": true
      }
    }
  })
  await admin.save();
  res.send(admin);
});



// Admin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Find admin by username
    const admin = await Admin.findOne({ username: username.toLowerCase() });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!admin.isActive) {
      return res.status(401).json({ error: 'Account is deactivated' });
    }

    // Check password
    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate JWT token
    const token = jwt.sign(
      {
        adminId: admin._id,
        username: admin.username,
        role: admin.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      admin: admin.toPublicJSON()
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get admin profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select('-password');

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.json({ admin });

  } catch (error) {
    console.error('Get admin profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

// Update admin profile
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { name, email, currentPassword, newPassword } = req.body;

    const admin = await Admin.findById(req.adminId);

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Update basic info
    if (name) admin.name = name.trim();
    if (email) admin.email = email.toLowerCase().trim();

    // Update password if provided
    if (currentPassword && newPassword) {
      const isCurrentPasswordValid = await admin.comparePassword(currentPassword);

      if (!isCurrentPasswordValid) {
        return res.status(400).json({ error: 'Current password is incorrect' });
      }

      admin.password = newPassword;
    }

    await admin.save();

    res.json({
      message: 'Profile updated successfully',
      admin: admin.toPublicJSON()
    });

  } catch (error) {
    console.error('Update admin profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Create new admin (super admin only)
router.post('/create', verifyToken, async (req, res) => {
  try {
    const { username, email, password, name, role } = req.body;

    // Check if current admin is super admin
    const currentAdmin = await Admin.findById(req.adminId);
    if (currentAdmin.role !== 'admin') {
      return res.status(403).json({ error: 'Only super admins can create new admins' });
    }

    // Validate required fields
    if (!username || !email || !password || !name) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if username or email already exists
    const existingAdmin = await Admin.findOne({
      $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }]
    });

    if (existingAdmin) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    const newAdmin = new Admin({
      username: username.toLowerCase().trim(),
      email: email.toLowerCase().trim(),
      password,
      name: name.trim(),
      role: role || 'editor'
    });

    await newAdmin.save();

    res.status(201).json({
      message: 'Admin created successfully',
      admin: newAdmin.toPublicJSON()
    });

  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({ error: 'Failed to create admin' });
  }
});

// Get all admins (super admin only)
router.get('/all', verifyToken, async (req, res) => {
  try {
    // Check if current admin is super admin
    const currentAdmin = await Admin.findById(req.adminId);
    if (currentAdmin.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const admins = await Admin.find().select('-password').sort({ createdAt: -1 });

    res.json({ admins });

  } catch (error) {
    console.error('Get all admins error:', error);
    res.status(500).json({ error: 'Failed to get admins' });
  }
});

// Update admin status (super admin only)
router.patch('/:id/status', verifyToken, async (req, res) => {
  try {
    const { isActive } = req.body;

    // Check if current admin is super admin
    const currentAdmin = await Admin.findById(req.adminId);
    if (currentAdmin.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Prevent deactivating self
    if (admin._id.toString() === req.adminId) {
      return res.status(400).json({ error: 'Cannot deactivate your own account' });
    }

    admin.isActive = isActive;
    await admin.save();

    res.json({
      message: 'Admin status updated successfully',
      admin: admin.toPublicJSON()
    });

  } catch (error) {
    console.error('Update admin status error:', error);
    res.status(500).json({ error: 'Failed to update admin status' });
  }
});

// Get dashboard statistics
router.get('/dashboard/stats', verifyToken, async (req, res) => {
  try {
    const Story = require('../models/Story');
    const Comment = require('../models/Comment');
    const Suggestion = require('../models/Suggestion');
    const Subscription = require('../models/Subscription');

    // Story statistics
    const totalStories = await Story.countDocuments();
    const publishedStories = await Story.countDocuments({ isPublished: true });
    const draftStories = totalStories - publishedStories;
    const totalViews = await Story.aggregate([
      { $group: { _id: null, total: { $sum: '$views' } } }
    ]);

    // Comment statistics
    const totalComments = await Comment.countDocuments();
    const pendingComments = await Comment.countDocuments({ isApproved: false });
    const spamComments = await Comment.countDocuments({ isSpam: true });

    // Suggestion statistics
    const totalSuggestions = await Suggestion.countDocuments();
    const pendingSuggestions = await Suggestion.countDocuments({ status: 'pending' });

    // Subscription statistics
    const totalSubscribers = await Subscription.countDocuments({ isActive: true });
    const newSubscribersThisMonth = await Subscription.countDocuments({
      isActive: true,
      createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
    });

    // Recent activity
    const recentStories = await Story.find()
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    const recentComments = await Comment.find()
      .populate('storyId', 'title')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      stories: {
        total: totalStories,
        published: publishedStories,
        drafts: draftStories,
        totalViews: totalViews.length > 0 ? totalViews[0].total : 0
      },
      comments: {
        total: totalComments,
        pending: pendingComments,
        spam: spamComments
      },
      suggestions: {
        total: totalSuggestions,
        pending: pendingSuggestions
      },
      subscriptions: {
        total: totalSubscribers,
        newThisMonth: newSubscribersThisMonth
      },
      recentActivity: {
        stories: recentStories,
        comments: recentComments
      }
    });

  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ error: 'Failed to get dashboard statistics' });
  }
});

module.exports = router; 