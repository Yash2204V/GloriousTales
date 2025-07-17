const express = require('express');
const router = express.Router();
const Story = require('../models/Story');
const { sendBulkEmail } = require('../utils/emailService');
const Subscription = require('../models/Subscription');
const { verifyToken } = require('../middleware/auth');

// Get all published stories
router.get('/', async (req, res) => {
  try {
    const { 
      heroType, 
      era, 
      region, 
      gender, 
      conditions,
      search, 
      page = 1, 
      limit = 12,
      sort = 'newest'
    } = req.query;
    
    const query = { isPublished: true };
    
    // Apply filters
    if (heroType) query.heroType = heroType;
    if (era) query.era = era;
    if (region) query.region = region;
    if (gender) query.gender = gender;
    
    // Apply conditions filter
    if (conditions) {
      const conditionArray = conditions.split(',').map(c => c.trim());
      query.conditions = { $in: conditionArray };
    }
    
    // Apply search
    if (search) {
      query.$text = { $search: search };
    }
    
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
      case 'popular':
        sortObj = { views: -1, likes: -1 };
        break;
      case 'featured':
        sortObj = { isFeatured: -1, createdAt: -1 };
        break;
      default:
        sortObj = { createdAt: -1 };
    }
    
    const stories = await Story.find(query)
      .populate('createdBy', 'name')
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Story.countDocuments(query);
    
    res.json({
      stories,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        hasNext: skip + stories.length < total,
        hasPrev: page > 1
      },
      total
    });
    
  } catch (error) {
    console.error('Get stories error:', error);
    res.status(500).json({ error: 'Failed to get stories' });
  }
});

// Get story by ID
router.get('/:id', async (req, res) => {
  try {
    const story = await Story.findById(req.params.id)
      .populate('createdBy', 'name username');
    
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    
    // Increment view count
    story.views += 1;
    await story.save();
    
    res.json({ story });
    
  } catch (error) {
    console.error('Get story error:', error);
    res.status(500).json({ error: 'Failed to get story' });
  }
});

// Get featured stories
router.get('/featured/list', async (req, res) => {
  try {
    const stories = await Story.find({ 
      isPublished: true, 
      isFeatured: true 
    })
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 })
      .limit(6);
    
    res.json({ stories });
    
  } catch (error) {
    console.error('Get featured stories error:', error);
    res.status(500).json({ error: 'Failed to get featured stories' });
  }
});

// Get story statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const totalStories = await Story.countDocuments({ isPublished: true });
    const totalViews = await Story.aggregate([
      { $match: { isPublished: true } },
      { $group: { _id: null, total: { $sum: '$views' } } }
    ]);
    
    const totalLikes = await Story.aggregate([
      { $match: { isPublished: true } },
      { $group: { _id: null, total: { $sum: '$likes' } } }
    ]);
    
    const byHeroType = await Story.aggregate([
      { $match: { isPublished: true } },
      {
        $group: {
          _id: '$heroType',
          count: { $sum: 1 },
          totalViews: { $sum: '$views' }
        }
      }
    ]);
    
    const byEra = await Story.aggregate([
      { $match: { isPublished: true } },
      {
        $group: {
          _id: '$era',
          count: { $sum: 1 }
        }
      }
    ]);
    
    res.json({
      totalStories,
      totalViews: totalViews.length > 0 ? totalViews[0].total : 0,
      totalLikes: totalLikes.length > 0 ? totalLikes[0].total : 0,
      byHeroType,
      byEra
    });
    
  } catch (error) {
    console.error('Get story stats error:', error);
    res.status(500).json({ error: 'Failed to get story statistics' });
  }
});

// Share story (increment share count)
router.post('/:id/share', async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    
    story.shares += 1;
    await story.save();
    
    res.json({
      message: 'Story shared successfully',
      shares: story.shares
    });
    
  } catch (error) {
    console.error('Share story error:', error);
    res.status(500).json({ error: 'Failed to share story' });
  }
});

// Like story
router.post('/:id/like', async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    
    story.likes += 1;
    await story.save();
    
    res.json({
      message: 'Story liked successfully',
      likes: story.likes
    });
    
  } catch (error) {
    console.error('Like story error:', error);
    res.status(500).json({ error: 'Failed to like story' });
  }
});

// Get all stories (admin only)
router.get('/admin/all', verifyToken, async (req, res) => {
  try {
    const { 
      status, 
      heroType, 
      era, 
      page = 1, 
      limit = 20 
    } = req.query;
    
    const query = {};
    
    if (status !== undefined) query.isPublished = status === 'published';
    if (heroType) query.heroType = heroType;
    if (era) query.era = era;
    
    const skip = (page - 1) * limit;
    
    const stories = await Story.find(query)
      .populate('createdBy', 'name username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Story.countDocuments(query);
    
    res.json({
      stories,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        hasNext: skip + stories.length < total,
        hasPrev: page > 1
      },
      total
    });
    
  } catch (error) {
    console.error('Get all stories error:', error);
    res.status(500).json({ error: 'Failed to get stories' });
  }
});

// Create new story (admin only)
router.post('/', verifyToken, async (req, res) => {
  try {
    const {
      title,
      slug,
      subtitle,
      description,
      image,
      heroType,
      era,
      region,
      gender,
      birthYear,
      deathYear,
      readingTime,
      listeningTime,
      conditions,
      historicalContext,
      chapters,
      quotes,
      legacy,
      modernRelevance,
      voiceNarrationStyle,
      audioUrl,
      isPublished,
      isFeatured
    } = req.body;
    
    // Validate required fields
    const requiredFields = [
      'title','slug','subtitle', 'description', 'image', 'heroType', 
      'era', 'region', 'gender', 'birthYear', 'deathYear', 
      'readingTime', 'historicalContext', 'chapters', 'legacy'
    ];
    
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }
    
    // Validate hero type
    const validHeroTypes = ['warrior', 'writer', 'rebel', 'spiritual'];
    if (!validHeroTypes.includes(heroType)) {
      return res.status(400).json({ error: 'Invalid hero type' });
    }
    
    // Validate gender
    const validGenders = ['male', 'female'];
    if (!validGenders.includes(gender)) {
      return res.status(400).json({ error: 'Invalid gender' });
    }
    
    const story = new Story({
      title: title.trim(),
      slug: slug.trim(),
      subtitle: subtitle.trim(),
      description: description.trim(),
      image,
      heroType,
      era: era.trim(),
      region: region.trim(),
      gender,
      birthYear: parseInt(birthYear),
      deathYear: parseInt(deathYear),
      readingTime,
      listeningTime,
      conditions: conditions || [],
      historicalContext: historicalContext.trim(),
      chapters: chapters || [],
      quotes: quotes || [],
      legacy: legacy.trim(),
      modernRelevance: modernRelevance ? modernRelevance.trim() : null,
      voiceNarrationStyle: voiceNarrationStyle ? voiceNarrationStyle.trim() : null,
      audioUrl: audioUrl || null,
      isPublished: isPublished || false,
      isFeatured: isFeatured || false,
      createdBy: req.adminId // From auth middleware
    });
    
    await story.save();
    
    // If story is published, send email to subscribers
    if (isPublished) {
      const subscribers = await Subscription.find({ isActive: true });
      const storyUrl = `${process.env.FRONTEND_URL}/stories/${story._id}`;
      
      await sendBulkEmail(subscribers, 'newStoryNotification', story.title, storyUrl);
    }
    
    res.status(201).json({
      message: 'Story created successfully',
      story
    });
    
  } catch (error) {
    console.error('Create story error:', error);
    res.status(500).json({ error: 'Failed to create story' });
  }
});

// Update story (admin only)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    
    const wasPublished = story.isPublished;
    
    // Update fields
    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined) {
        story[key] = req.body[key];
      }
    });
    
    await story.save();
    
    // If story was just published, send email to subscribers
    if (!wasPublished && story.isPublished) {
      const subscribers = await Subscription.find({ isActive: true });
      const storyUrl = `${process.env.FRONTEND_URL}/stories/${story._id}`;
      
      await sendBulkEmail(subscribers, 'newStoryNotification', story.title, storyUrl);
    }
    
    res.json({
      message: 'Story updated successfully',
      story
    });
    
  } catch (error) {
    console.error('Update story error:', error);
    res.status(500).json({ error: 'Failed to update story' });
  }
});

// Delete story (admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);
    
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    
    res.json({ message: 'Story deleted successfully' });
    
  } catch (error) {
    console.error('Delete story error:', error);
    res.status(500).json({ error: 'Failed to delete story' });
  }
});

module.exports = router; 