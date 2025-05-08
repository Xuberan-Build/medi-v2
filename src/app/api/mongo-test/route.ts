import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  try {
    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      return NextResponse.json({
        status: 'ok',
        message: 'MongoDB already connected',
        readyState: mongoose.connection.readyState
      });
    }
    
    // Try to connect directly without Payload
    const connectionString = process.env.DATABASE_URI || '';
    
    // Don't log the actual connection string
    console.log('Attempting to connect to MongoDB...');
    
    await mongoose.connect(connectionString, {
      serverSelectionTimeoutMS: 5000, // 5 seconds
    });
    
    return NextResponse.json({
      status: 'ok',
      message: 'MongoDB connection successful',
      readyState: mongoose.connection.readyState
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to connect to MongoDB',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    try {
      // Close the connection to prevent hanging
      if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
      }
    } catch (err) {
      console.error('Error closing MongoDB connection:', err);
    }
  }
}
