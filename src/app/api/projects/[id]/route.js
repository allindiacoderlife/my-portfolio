import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { validateProject } from '@/lib/projectSchema';

export async function GET(request, { params }) {
  try {
    const { id } = params;

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('portfolio');
    const collection = db.collection('projects');

    const project = await collection.findOne({ _id: new ObjectId(id) });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Project fetched successfully',
        project: project
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    
    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('portfolio');
    const collection = db.collection('projects');

    const body = await request.json();
    
    // Validate the project data
    const validationErrors = validateProject(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData = {
      title: body.title.trim(),
      description: body.description.trim(),
      technologies: body.technologies.trim(),
      githubUrl: body.githubUrl || '',
      liveUrl: body.liveUrl || '',
      thumbnail: body.thumbnail || '',
      updatedAt: new Date()
    };

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    if (result.modifiedCount > 0) {
      return NextResponse.json(
        { message: 'Project updated successfully!' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: 'No changes made to the project' },
        { status: 200 }
      );
    }

  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('portfolio');
    const collection = db.collection('projects');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Project deleted successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
