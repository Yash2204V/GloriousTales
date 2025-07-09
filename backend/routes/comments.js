const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Story = require('../models/Story');
const { verifyToken } = require('../middleware/auth');

// Submit a new comment
router.post('/', async (req, res) => {
  try {
    const {
      storyId,
      name,
      email,
      content,
      rating,
      parentComment
    } = req.body;
    
    // Validate required fields
    if (!storyId || !name || !email || !content) {
      return res.status(400).json({ 
        error: 'Story ID, name, email, and content are required' 
      });
    }
    
    // Validate content length
    if (content.length < 10 || content.length > 1000) {
      return res.status(400).json({ 
        error: 'Comment must be between 10 and 1000 characters' 
      });
    }
    
    // Validate rating if provided
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ 
        error: 'Rating must be between 1 and 5' 
      });
    }
    
    // Check if story exists
    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    
    // Check if parent comment exists if provided
    if (parentComment) {
      const parent = await Comment.findById(parentComment);
      if (!parent) {
        return res.status(404).json({ error: 'Parent comment not found' });
      }
    }
    
    // Create new comment
    const comment = new Comment({
      storyId,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      content: content.trim(),
      rating: rating || null,
      parentComment: parentComment || null,
      userIp: req.ip,
      userAgent: req.get('User-Agent')
    });
    
    await comment.save();
    
    // If this is a reply, add it to parent's replies array
    if (parentComment) {
      await Comment.findByIdAndUpdate(parentComment, {
        $push: { replies: comment._id }
      });
    }
    
    // Update story stats if rating provided
    if (rating) {
      await Story.findByIdAndUpdate(storyId, {
        $inc: { likes: 1 } // Using likes field for rating count
      });
    }
    
    res.status(201).json({
      message: 'Comment submitted successfully! It will be reviewed before appearing.',
      comment
    });
    
  } catch (error) {
    console.error('Comment submission error:', error);
    res.status(500).json({ error: 'Failed to submit comment. Please try again.' });
  }
});

// Get comments for a story
router.get('/story/:storyId', async (req, res) => {
  try {
    const { storyId } = req.params;
    const { page = 1, limit = 10, sort = 'newest' } = req.query;
    
    const skip = (page - 1) * limit;
    
    // Build sort object
    let sortObj = {};
    switch (sort) {
      case 'newest':
        sortObj = { createdAt: -1 };
        break;
      case 'oldest':
        sortObj = { createdAt: 1 };
        break;
      case 'rating':
        sortObj = { rating: -1, createdAt: -1 };
        break;
      case 'likes':
        sortObj = { likes: -1, createdAt: -1 };
        break;
      default:
        sortObj = { createdAt: -1 };
    }
    
    const comments = await Comment.find({ 
      storyId, 
      isApproved: true, 
      isSpam: false,
      parentComment: null // Only top-level comments
    })
      .populate({
        path: 'replies',
        match: { isApproved: true, isSpam: false },
        options: { sort: { createdAt: 1 } }
      })
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Comment.countDocuments({ 
      storyId, 
      isApproved: true, 
      isSpam: false,
      parentComment: null
    });
    
    res.json({
      comments,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        hasNext: skip + comments.length < total,
        hasPrev: page > 1
      },
      total
    });
    
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ error: 'Failed to get comments' });
  }
});

// Get comment statistics for a story
router.get('/story/:storyId/stats', async (req, res) => {
  try {
    const { storyId } = req.params;
    
    const totalComments = await Comment.countDocuments({ 
      storyId, 
      isApproved: true, 
      isSpam: false 
    });
    
    const totalReplies = await Comment.countDocuments({ 
      storyId, 
      isApproved: true, 
      isSpam: false,
      parentComment: { $ne: null }
    });
    
    const avgRating = await Comment.aggregate([
      {
        $match: { 
          storyId: storyId, 
          isApproved: true, 
          isSpam: false,
          rating: { $ne: null }
        }
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalRatings: { $sum: 1 }
        }
      }
    ]);
    
    const ratingDistribution = await Comment.aggregate([
      {
        $match: { 
          storyId: storyId, 
          isApproved: true, 
          isSpam: false,
          rating: { $ne: null }
        }
      },
      {
        $group: {
          _id: '$rating',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    
    res.json({
      totalComments,
      totalReplies,
      averageRating: avgRating.length > 0 ? avgRating[0].averageRating : 0,
      totalRatings: avgRating.length > 0 ? avgRating[0].totalRatings : 0,
      ratingDistribution
    });
    
  } catch (error) {
    console.error('Get comment stats error:', error);
    res.status(500).json({ error: 'Failed to get comment statistics' });
  }
});

// Get all comments (admin only)
router.get('/', verifyToken, async (req, res) => {
  try {
    const { 
      storyId, 
      status, 
      isSpam, 
      page = 1, 
      limit = 20 
    } = req.query;
    
    const query = {};
    
    if (storyId) query.storyId = storyId;
    if (status !== undefined) query.isApproved = status === 'approved';
    if (isSpam !== undefined) query.isSpam = isSpam === 'true';
    
    const skip = (page - 1) * limit;
    
    const comments = await Comment.find(query)
      .populate('storyId', 'title')
      .populate('parentComment', 'content')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Comment.countDocuments(query);
    
    res.json({
      comments,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        hasNext: skip + comments.length < total,
        hasPrev: page > 1
      },
      total
    });
    
  } catch (error) {
    console.error('Get all comments error:', error);
    res.status(500).json({ error: 'Failed to get comments' });
  }
});

// Approve/reject comment (admin only)
router.patch('/:id/approve', verifyToken, async (req, res) => {
  try {
    const { isApproved, isSpam } = req.body;
    
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    
    if (isApproved !== undefined) comment.isApproved = isApproved;
    if (isSpam !== undefined) comment.isSpam = isSpam;
    
    await comment.save();
    
    res.json({
      message: 'Comment status updated successfully',
      comment
    });
    
  } catch (error) {
    console.error('Update comment error:', error);
    res.status(500).json({ error: 'Failed to update comment' });
  }
});

// Delete comment (admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    
    // If this is a reply, remove it from parent's replies array
    if (comment.parentComment) {
      await Comment.findByIdAndUpdate(comment.parentComment, {
        $pull: { replies: comment._id }
      });
    }
    
    // Delete all replies to this comment
    await Comment.deleteMany({ parentComment: comment._id });
    
    // Delete the comment itself
    await Comment.findByIdAndDelete(comment._id);
    
    res.json({ message: 'Comment deleted successfully' });
    
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

// Like a comment
router.post('/:id/like', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    
    comment.likes += 1;
    await comment.save();
    
    res.json({
      message: 'Comment liked successfully',
      likes: comment.likes
    });
    
  } catch (error) {
    console.error('Like comment error:', error);
    res.status(500).json({ error: 'Failed to like comment' });
  }
});

module.exports = router; 