const express = require('express');
const router = express.Router();
const Suggestion = require('../models/Suggestion');
const { verifyToken } = require('../middleware/auth');

// Submit a new suggestion
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      legendName,
      description,
      era,
      region,
      heroType,
      whyImportant,
      sources
    } = req.body;
    
    // Validate required fields
    if (!name || !email || !legendName || !description || !era || !region || !heroType || !whyImportant) {
      return res.status(400).json({ 
        error: 'All required fields must be provided' 
      });
    }
    
    // Validate description length
    if (description.length < 50) {
      return res.status(400).json({ 
        error: 'Description must be at least 50 characters long' 
      });
    }
    
    // Validate hero type
    const validHeroTypes = ['warrior', 'writer', 'rebel', 'spiritual'];
    if (!validHeroTypes.includes(heroType)) {
      return res.status(400).json({ 
        error: 'Invalid hero type. Must be one of: warrior, writer, rebel, spiritual' 
      });
    }
    
    // Create new suggestion
    const suggestion = new Suggestion({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      legendName: legendName.trim(),
      description: description.trim(),
      era: era.trim(),
      region: region.trim(),
      heroType,
      whyImportant: whyImportant.trim(),
      sources: sources ? sources.trim() : ''
    });
    
    await suggestion.save();
    
    res.status(201).json({
      message: 'Suggestion submitted successfully! We will review it and get back to you.',
      suggestion
    });
    
  } catch (error) {
    console.error('Suggestion submission error:', error);
    res.status(500).json({ error: 'Failed to submit suggestion. Please try again.' });
  }
});

// Get all suggestions (admin only)
router.get('/', verifyToken, async (req, res) => {
  try {
    const { status, heroType, era, page = 1, limit = 10 } = req.query;
    
    const query = {};
    
    if (status) query.status = status;
    if (heroType) query.heroType = heroType;
    if (era) query.era = era;
    
    const skip = (page - 1) * limit;
    
    const suggestions = await Suggestion.find(query)
      .populate('reviewedBy', 'name username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Suggestion.countDocuments(query);
    
    res.json({
      suggestions,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        hasNext: skip + suggestions.length < total,
        hasPrev: page > 1
      },
      total
    });
    
  } catch (error) {
    console.error('Get suggestions error:', error);
    res.status(500).json({ error: 'Failed to get suggestions' });
  }
});

// Get suggestion by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const suggestion = await Suggestion.findById(req.params.id)
      .populate('reviewedBy', 'name username');
    
    if (!suggestion) {
      return res.status(404).json({ error: 'Suggestion not found' });
    }
    
    res.json({ suggestion });
    
  } catch (error) {
    console.error('Get suggestion error:', error);
    res.status(500).json({ error: 'Failed to get suggestion' });
  }
});

// Update suggestion status (admin only)
router.patch('/:id/status', verifyToken, async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const { adminId } = req; // From auth middleware
    
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }
    
    const validStatuses = ['pending', 'approved', 'rejected', 'implemented'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const suggestion = await Suggestion.findById(req.params.id);
    
    if (!suggestion) {
      return res.status(404).json({ error: 'Suggestion not found' });
    }
    
    suggestion.status = status;
    suggestion.adminNotes = adminNotes || '';
    suggestion.reviewedBy = adminId;
    suggestion.reviewedAt = new Date();
    
    await suggestion.save();
    
    res.json({
      message: 'Suggestion status updated successfully',
      suggestion
    });
    
  } catch (error) {
    console.error('Update suggestion error:', error);
    res.status(500).json({ error: 'Failed to update suggestion' });
  }
});

// Get suggestion statistics
router.get('/stats/overview', verifyToken, async (req, res) => {
  try {
    const total = await Suggestion.countDocuments();
    const pending = await Suggestion.countDocuments({ status: 'pending' });
    const approved = await Suggestion.countDocuments({ status: 'approved' });
    const rejected = await Suggestion.countDocuments({ status: 'rejected' });
    const implemented = await Suggestion.countDocuments({ status: 'implemented' });
    
    // Count by hero type
    const byHeroType = await Suggestion.aggregate([
      {
        $group: {
          _id: '$heroType',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Count by era
    const byEra = await Suggestion.aggregate([
      {
        $group: {
          _id: '$era',
          count: { $sum: 1 }
        }
      }
    ]);
    
    res.json({
      total,
      byStatus: {
        pending,
        approved,
        rejected,
        implemented
      },
      byHeroType,
      byEra
    });
    
  } catch (error) {
    console.error('Suggestion stats error:', error);
    res.status(500).json({ error: 'Failed to get suggestion statistics' });
  }
});

// Delete suggestion (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const suggestion = await Suggestion.findByIdAndDelete(req.params.id);
    
    if (!suggestion) {
      return res.status(404).json({ error: 'Suggestion not found' });
    }
    
    res.json({ message: 'Suggestion deleted successfully' });
    
  } catch (error) {
    console.error('Delete suggestion error:', error);
    res.status(500).json({ error: 'Failed to delete suggestion' });
  }
});

module.exports = router; 