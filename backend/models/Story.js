const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  subtitle: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  heroType: {
    type: String,
    required: true,
    enum: ['warrior', 'writer', 'rebel', 'spiritual']
  },
  era: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female']
  },
  birthYear: {
    type: Number,
    required: true
  },
  deathYear: {
    type: Number,
    required: true
  },
  readingTime: {
    type: String,
    required: true
  },
  listeningTime: {
    type: String,
    default: null
  },
  conditions: [{
    type: String,
    enum: ['widow', 'paralyzed', 'mentally-stressed', 'social-outcast', 'caste-discrimination', 'victim-violence']
  }],
  historicalContext: {
    type: String,
    required: true
  },
  chapters: [{
    id: String,
    title: String,
    content: String,
    emotionalTone: String,
    annotation: String
  }],
  quotes: [{
    type: String
  }],
  legacy: {
    type: String,
    required: true
  },
  modernRelevance: {
    type: String,
    default: null
  },
  voiceNarrationStyle: {
    type: String,
    default: null
  },
  audioUrl: {
    type: String,
    default: null
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: false // Allow stories without a creator (for imports/demo)
  }
}, {
  timestamps: true
});

// Indexes for better query performance
storySchema.index({ title: 'text', subtitle: 'text', description: 'text' });
storySchema.index({ heroType: 1 });
storySchema.index({ era: 1 });
storySchema.index({ region: 1 });
storySchema.index({ isPublished: 1 });
storySchema.index({ isFeatured: 1 });

module.exports = mongoose.model('Story', storySchema); 