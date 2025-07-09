const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Email templates
const emailTemplates = {
  newStoryNotification: (storyTitle, storyUrl) => ({
    subject: `🎉 New Story Published: ${storyTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background: linear-gradient(135deg, #ff6b35, #f7931e); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Glorious Tales</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Stories of India's Greatest Heroes</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-bottom: 20px;">🎉 New Story Published!</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
            We're excited to share a new inspiring story with you! A new legend has been added to our collection.
          </p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #333; margin: 0 0 10px 0;">${storyTitle}</h3>
            <p style="color: #666; margin: 0;">Discover the incredible journey of this remarkable hero.</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${storyUrl}" style="background: linear-gradient(135deg, #ff6b35, #f7931e); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);">
              Read the Story Now
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Thank you for being part of our community. We hope this story inspires you as much as it has inspired us.
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="color: #999; font-size: 14px; text-align: center; margin: 0;">
            You're receiving this email because you subscribed to Glorious Tales notifications.<br>
            <a href="${process.env.FRONTEND_URL}/unsubscribe" style="color: #ff6b35;">Unsubscribe</a> | 
            <a href="${process.env.FRONTEND_URL}" style="color: #ff6b35;">Visit Website</a>
          </p>
        </div>
      </div>
    `
  }),
  
  subscriptionConfirmation: (email) => ({
    subject: '✅ Welcome to Glorious Tales!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background: linear-gradient(135deg, #ff6b35, #f7931e); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Glorious Tales</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Stories of India's Greatest Heroes</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-bottom: 20px;">✅ Welcome to Glorious Tales!</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
            Thank you for subscribing to our newsletter! You'll now receive notifications whenever we publish new stories about India's greatest heroes.
          </p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #333; margin: 0 0 10px 0;">What to expect:</h3>
            <ul style="color: #666; margin: 0; padding-left: 20px;">
              <li>New story notifications</li>
              <li>Featured legends of the week</li>
              <li>Behind-the-scenes insights</li>
              <li>Community updates</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}" style="background: linear-gradient(135deg, #ff6b35, #f7931e); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);">
              Explore Stories
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            We're excited to share these incredible stories with you. Each story is carefully researched and written to inspire and educate.
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="color: #999; font-size: 14px; text-align: center; margin: 0;">
            You can unsubscribe at any time by clicking the link below.<br>
            <a href="${process.env.FRONTEND_URL}/unsubscribe?email=${encodeURIComponent(email)}" style="color: #ff6b35;">Unsubscribe</a>
          </p>
        </div>
      </div>
    `
  }),
  
  unsubscribeConfirmation: () => ({
    subject: '👋 You\'ve been unsubscribed from Glorious Tales',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background: linear-gradient(135deg, #ff6b35, #f7931e); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Glorious Tales</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Stories of India's Greatest Heroes</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-bottom: 20px;">👋 You've been unsubscribed</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
            We're sorry to see you go! You've been successfully unsubscribed from our newsletter and won't receive any more email notifications.
          </p>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
            You can still visit our website anytime to read our stories and learn about India's greatest heroes.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}" style="background: linear-gradient(135deg, #ff6b35, #f7931e); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);">
              Visit Website
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            If you change your mind, you can always subscribe again from our website.
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="color: #999; font-size: 14px; text-align: center; margin: 0;">
            Thank you for being part of our community, even if only for a short while.
          </p>
        </div>
      </div>
    `
  })
};

// Send email function
const sendEmail = async (to, template, data = {}) => {
  try {
    const transporter = createTransporter();
    const emailContent = emailTemplates[template](...Object.values(data));
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: to,
      subject: emailContent.subject,
      html: emailContent.html
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
};

// Send bulk emails to subscribers
const sendBulkEmail = async (subscribers, template, data = {}) => {
  const results = [];
  
  for (const subscriber of subscribers) {
    const result = await sendEmail(subscriber.email, template, data);
    results.push({
      email: subscriber.email,
      success: result.success,
      error: result.error
    });
    
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return results;
};

module.exports = {
  sendEmail,
  sendBulkEmail,
  emailTemplates
}; 