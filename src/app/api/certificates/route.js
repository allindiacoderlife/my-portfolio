import { NextResponse } from 'next/server';
import { validateCertificate, processCertificateData } from '@/lib/certificateSchema';

// Mock database - replace with real database connection
let certificates = [];

export async function GET() {
  try {
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
    
    // Validate the certificate data
    const validationErrors = validateCertificate(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    // Process the certificate data
    const processedData = processCertificateData(body);
    
    // Add a unique ID for mock database
    processedData.id = Date.now().toString();
    
    // Add to mock database
    certificates.push(processedData);
    
    console.log('Certificate added:', processedData);
    
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
    
    const initialLength = certificates.length;
    certificates = certificates.filter(cert => cert.id !== id);
    
    if (certificates.length === initialLength) {
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
