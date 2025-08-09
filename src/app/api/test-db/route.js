import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    // Check if MongoDB URI is configured
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({
        success: false,
        error: 'MONGODB_URI environment variable is not configured',
        suggestions: [
          'Create or check .env.local file',
          'Add MONGODB_URI=your_mongodb_connection_string',
          'Restart the development server'
        ]
      });
    }

    // Test MongoDB connection
    const client = await clientPromise;
    const db = client.db();
    
    // Test basic database operations
    const adminDb = client.db().admin();
    const serverStatus = await adminDb.ping();
    
    // Get database statistics
    const stats = await db.stats();
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      connection: {
        connected: true,
        dbName: db.databaseName,
        collections: stats.collections || 0,
        documents: stats.objects || 0,
        dataSize: stats.dataSize || 0
      },
      mongoStatus: serverStatus
    });

  } catch (error) {
    console.error('Database connection test failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      details: {
        name: error.name,
        code: error.code || 'UNKNOWN',
        connectionString: process.env.MONGODB_URI ? 'Present' : 'Missing'
      }
    }, { status: 500 });
  }
}
