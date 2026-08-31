import dns from 'dns';
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

import mongoose from 'mongoose';

let database: any = null;

export const connectToDatabase = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not configured');
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 30000,
      connectTimeoutMS: 30000,
      retryWrites: true,
      w: 'majority',
    });
    
    // Get the underlying MongoDB database instance from Mongoose
    database = conn.connection.getClient().db(process.env.MONGODB_DB_NAME);
    
    console.log('✅ Database connected successfully');
    return conn;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`❌ Database connection error: ${errorMessage}`);
    process.exit(1);
  }
};

export const getDatabase = () => {
  if (!database) {
    throw new Error('Database not connected. Call connectToDatabase() first.');
  }
  return database;
};

export default connectToDatabase;
