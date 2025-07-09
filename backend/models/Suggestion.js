const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  legendName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    minlength: 50
  },
  era: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  heroType: {
    type: String,
    required: true,
    enum: ['warrior', 'writer', 'rebel', 'spiritual']
  },
  whyImportant: {
    type: String,
    required: true
  },
  sources: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'implemented'],
    default: 'pending'
  },
  adminNotes: {
    type: String,
    default: ''
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    default: null
  },
  reviewedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Indexes
suggestionSchema.index({ status: 1 });
suggestionSchema.index({ heroType: 1 });
suggestionSchema.index({ era: 1 });
suggestionSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Suggestion', suggestionSchema); 