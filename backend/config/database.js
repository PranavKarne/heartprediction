// config/database.js
const mongoose = require('mongoose');

const registerConnectionEvents = () => {
  // Only attach listeners once per process
  if (mongoose.connection.listenerCount('connected') === 0) {
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to MongoDB');
    });
  }

  if (mongoose.connection.listenerCount('error') === 0) {
    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });
  }

  if (mongoose.connection.listenerCount('disconnected') === 0) {
    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected');
    });
  }

  if (process.listenerCount('SIGINT') === 0) {
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });
  }
};

const attemptConnection = async (uri, label) => {
  if (!uri) {
    throw new Error('Missing MongoDB connection string');
  }

  console.log(`Attempting MongoDB connection (${label})...`);
  const conn = await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 15000
  });

  console.log(`MongoDB Connected (${label}): ${conn.connection.host}`);
};

const connectDB = async () => {
  // Load URI at runtime to ensure env vars are loaded
  const MONGODB_URI = process.env.MONGODB_URI;
  
  if (!MONGODB_URI) {
    console.error('MONGODB_URI environment variable is not set');
    process.exit(1);
  }

  try {
    console.log('Attempting MongoDB Atlas connection...');
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 15000
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    registerConnectionEvents();
  } catch (error) {
    console.error('MongoDB Atlas connection failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;

// .env file (create this in your root directory)
/*
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/cardiopredict?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
JWT_EXPIRE=7d
NODE_ENV=development
PORT=5000
*/