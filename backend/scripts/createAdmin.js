const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config();

const createInitialAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/glorious-tales');
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create initial admin user
    const admin = new Admin({
      username: 'admin',
      email: 'admin@glorioustales.com',
      password: '123456qwertyQ!', // This will be hashed by the pre-save hook
      name: 'Super Admin',
      role: 'admin',
      isActive: true
    });

    await admin.save();
    
    console.log('✅ Initial admin user created successfully!');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('Email: admin@glorioustales.com');
    console.log('\n⚠️  Please change the password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createInitialAdmin(); 