const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const { sendEmail } = require('../utils/emailService');

// Subscribe to newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    // Check if already subscribed
    const existingSubscription = await Subscription.findOne({ email: email.toLowerCase() });
    
    if (existingSubscription) {
      if (existingSubscription.isActive) {
        return res.status(400).json({ error: 'Email is already subscribed' });
      } else {
        // Reactivate subscription
        existingSubscription.isActive = true;
        existingSubscription.unsubscribedAt = null;
        await existingSubscription.save();
        
        // Send welcome back email
        await sendEmail(email, 'subscriptionConfirmation', email);
        
        return res.json({ 
          message: 'Successfully resubscribed!',
          subscription: existingSubscription
        });
      }
    }
    
    // Create new subscription
    const subscription = new Subscription({
      email: email.toLowerCase()
    });
    
    await subscription.save();
    
    // Send welcome email
    await sendEmail(email, 'subscriptionConfirmation', email);
    
    res.status(201).json({
      message: 'Successfully subscribed to newsletter!',
      subscription
    });
    
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ error: 'Failed to subscribe. Please try again.' });
  }
});

// Unsubscribe from newsletter
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    const subscription = await Subscription.findOne({ email: email.toLowerCase() });
    
    if (!subscription) {
      return res.status(404).json({ error: 'Email not found in subscriptions' });
    }
    
    if (!subscription.isActive) {
      return res.status(400).json({ error: 'Email is already unsubscribed' });
    }
    
    subscription.isActive = false;
    subscription.unsubscribedAt = new Date();
    await subscription.save();
    
    // Send unsubscribe confirmation email
    await sendEmail(email, 'unsubscribeConfirmation');
    
    res.json({ 
      message: 'Successfully unsubscribed from newsletter',
      subscription
    });
    
  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({ error: 'Failed to unsubscribe. Please try again.' });
  }
});

// Unsubscribe via link (GET request)
router.get('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({ error: 'Email parameter is required' });
    }
    
    const subscription = await Subscription.findOne({ email: email.toLowerCase() });
    
    if (!subscription) {
      return res.status(404).json({ error: 'Email not found in subscriptions' });
    }
    
    if (!subscription.isActive) {
      return res.status(400).json({ error: 'Email is already unsubscribed' });
    }
    
    subscription.isActive = false;
    subscription.unsubscribedAt = new Date();
    await subscription.save();
    
    // Send unsubscribe confirmation email
    await sendEmail(email, 'unsubscribeConfirmation');
    
    res.json({ 
      message: 'Successfully unsubscribed from newsletter',
      subscription
    });
    
  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({ error: 'Failed to unsubscribe. Please try again.' });
  }
});

// Get subscription status
router.get('/status/:email', async (req, res) => {
  try {
    const { email } = req.params;
    
    const subscription = await Subscription.findOne({ email: email.toLowerCase() });
    
    if (!subscription) {
      return res.json({ subscribed: false });
    }
    
    res.json({ 
      subscribed: subscription.isActive,
      subscription
    });
    
  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({ error: 'Failed to check subscription status' });
  }
});

// Get all subscribers (admin only)
router.get('/all', async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ isActive: true })
      .sort({ createdAt: -1 });
    
    res.json({
      count: subscriptions.length,
      subscriptions
    });
    
  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({ error: 'Failed to get subscribers' });
  }
});

// Get subscription statistics
router.get('/stats', async (req, res) => {
  try {
    const totalSubscribers = await Subscription.countDocuments({ isActive: true });
    const totalUnsubscribed = await Subscription.countDocuments({ isActive: false });
    const newThisMonth = await Subscription.countDocuments({
      isActive: true,
      createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
    });
    
    res.json({
      totalSubscribers,
      totalUnsubscribed,
      newThisMonth,
      total: totalSubscribers + totalUnsubscribed
    });
    
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Failed to get subscription statistics' });
  }
});

module.exports = router; 