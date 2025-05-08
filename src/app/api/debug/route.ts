import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Debug endpoint is working',
    timestamp: new Date().toISOString(),
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      DATABASE_URI_SET: !!process.env.DATABASE_URI,
      PAYLOAD_SECRET_SET: !!process.env.PAYLOAD_SECRET
    }
  });
}
