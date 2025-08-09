import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if ImageKit is configured
    if (!process.env.IMAGEKIT_PUBLIC_KEY || !process.env.IMAGEKIT_PRIVATE_KEY || !process.env.IMAGEKIT_URL_ENDPOINT) {
      return NextResponse.json(
        { error: 'ImageKit not configured. Please add ImageKit credentials to .env.local' },
        { status: 400 }
      );
    }

    const imagekit = (await import('@/lib/imagekit')).default;
    const authenticationParameters = imagekit.getAuthenticationParameters();
    return NextResponse.json(authenticationParameters);
  } catch (error) {
    console.error('ImageKit auth error:', error);
    return NextResponse.json(
      { error: 'Failed to get authentication parameters' },
      { status: 500 }
    );
  }
}
