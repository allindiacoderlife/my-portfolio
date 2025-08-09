import { NextRequest, NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Check if ImageKit is configured
    if (!process.env.IMAGEKIT_PUBLIC_KEY || !process.env.IMAGEKIT_PRIVATE_KEY || !process.env.IMAGEKIT_URL_ENDPOINT) {
      return NextResponse.json(
        { error: 'ImageKit not configured. Please add ImageKit credentials to .env.local' },
        { status: 400 }
      );
    }

    const imagekit = (await import('@/lib/imagekit')).default;
    const formData = await request.formData();
    const file = formData.get('file');
    const fileName = formData.get('fileName') || 'upload';
    const folder = formData.get('folder') || '/portfolio';

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to ImageKit
    const uploadResponse = await imagekit.upload({
      file: buffer,
      fileName: fileName,
      folder: folder,
      useUniqueFileName: true,
      transformation: {
        pre: 'q-80,f-auto', // Quality 80, auto format
      },
    });

    return NextResponse.json({
      message: 'File uploaded successfully',
      url: uploadResponse.url,
      fileId: uploadResponse.fileId,
      name: uploadResponse.name,
      thumbnail: uploadResponse.thumbnail,
    });

  } catch (error) {
    console.error('ImageKit upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file', details: error.message },
      { status: 500 }
    );
  }
}
