import { NextResponse } from 'next/server';
import { initializePayload } from '@/lib/payload';

export async function GET() {
  try {
    // Initialize Payload with our optimized helper
    const payload = await initializePayload();
    
    if (!payload) {
      return NextResponse.json(
        { status: 'error', message: 'Failed to initialize Payload' },
        { status: 500 }
      );
    }
    
    // Check MongoDB connection by doing a simple query
    try {
      const healthCheck = await payload.find({
        collection: 'users',
        limit: 1,
      });
      
      return NextResponse.json({
        status: 'ok',
        message: 'MongoDB connection successful',
        timestamp: new Date().toISOString(),
        data: {
          collectionsAvailable: Object.keys(payload.collections).length,
          usersFound: healthCheck.totalDocs
        }
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { 
          status: 'error', 
          message: 'Database connection error',
          error: dbError instanceof Error ? dbError.message : 'Unknown error'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API Health Check Error:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Health check failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
