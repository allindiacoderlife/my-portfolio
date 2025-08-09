import { NextResponse } from 'next/server';
import { validateCertificate, processCertificateData } from '@/lib/certificateSchema';
import clientPromise from '@/lib/mongodb';

// Database collection name
const COLLECTION_NAME = 'certificates';

export async function GET() {
  try {
    // If no MongoDB URI is set, return empty array with warning
    if (!process.env.MONGODB_URI) {
      console.warn('MongoDB URI not configured. Using empty dataset.');
      return NextResponse.json({ 
        success: true, 
        certificates: [],
        warning: 'Database not configured'
      });
    }

    const client = await clientPromise;
    const db = client.db();
    const certificates = await db.collection(COLLECTION_NAME).find({}).toArray();
    
    return NextResponse.json({ 
      success: true, 
      certificates: certificates 
    });
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch certificates' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('Received certificate data:', { ...body, image: body.image ? '[IMAGE_DATA]' : 'none' });
    
    // Validate the certificate data
    const validationErrors = validateCertificate(body);
    if (validationErrors.length > 0) {
      console.error('Validation failed:', validationErrors);
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    // Process the certificate data
    const processedData = processCertificateData(body);
    console.log('Processed certificate data:', { ...processedData, image: processedData.image ? '[IMAGE_DATA]' : 'none' });
    
    // If no MongoDB URI is set, return success but warn about no persistence
    if (!process.env.MONGODB_URI) {
      console.warn('MongoDB URI not configured. Certificate not saved to database.');
      return NextResponse.json({
        success: true,
        message: 'Certificate validated but not saved (database not configured)',
        certificate: processedData,
        warning: 'Database not configured - data not persisted'
      });
    }

    // Add timestamps
    processedData.createdAt = new Date();
    processedData.updatedAt = new Date();
    
    // Save to MongoDB
    console.log('Connecting to MongoDB...');
    const client = await clientPromise;
    const db = client.db();
    
    console.log('Inserting certificate into collection:', COLLECTION_NAME);
    const result = await db.collection(COLLECTION_NAME).insertOne(processedData);
    
    // Add the MongoDB _id to the response
    processedData._id = result.insertedId;
    
    console.log('Certificate successfully saved to database with ID:', result.insertedId);
    
    return NextResponse.json({
      success: true,
      message: 'Certificate added successfully',
      certificate: processedData
    });

  } catch (error) {
    console.error('Error adding certificate:', error);
    return NextResponse.json(
      { error: 'Failed to add certificate' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Certificate ID is required' },
        { status: 400 }
      );
    }

    // If no MongoDB URI is set, return error
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      );
    }
    
    const client = await clientPromise;
    const db = client.db();
    
    // Use ObjectId for MongoDB _id or string for custom id
    let query;
    try {
      const { ObjectId } = require('mongodb');
      query = { _id: new ObjectId(id) };
    } catch (error) {
      // If ObjectId fails, try with string id
      query = { id: id };
    }
    
    const result = await db.collection(COLLECTION_NAME).deleteOne(query);
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Certificate not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Certificate deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting certificate:', error);
    return NextResponse.json(
      { error: 'Failed to delete certificate' },
      { status: 500 }
    );
  }
}
