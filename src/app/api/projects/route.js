import { NextResponse } from 'next/server';

// Mock data for development when MongoDB is not available
const mockProjects = [];

let projects = [...mockProjects];
let nextId = 1;

export async function POST(request) {
  try {
    // Check if MongoDB is configured properly
    if (!process.env.MONGODB_URI || 
        process.env.MONGODB_URI.includes('auth@') || 
        process.env.MONGODB_URI === 'your_mongodb_connection_string_here') {
      
      // Use mock database for development
      const body = await request.json();
      
      // Simple validation
      if (!body.title || !body.description || !body.technologies) {
        return NextResponse.json(
          { error: 'Title, description, and technologies are required' },
          { status: 400 }
        );
      }

      const newProject = {
        _id: nextId.toString(),
        title: body.title.trim(),
        description: body.description.trim(),
        technologies: body.technologies.trim(),
        githubUrl: body.githubUrl || '',
        liveUrl: body.liveUrl || '',
        thumbnail: body.thumbnail || '',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      projects.unshift(newProject);
      nextId++;

      return NextResponse.json(
        { 
          message: 'Project added successfully! (Using mock database - Configure MongoDB for persistence)',
          projectId: newProject._id,
          project: newProject
        },
        { status: 201 }
      );
    }

    // Try MongoDB connection
    const clientPromise = (await import('@/lib/mongodb')).default;
    const { validateProject } = await import('@/lib/projectSchema');
    
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

    // Prepare project data
    const projectData = {
      title: body.title.trim(),
      description: body.description.trim(),
      technologies: body.technologies.trim(),
      githubUrl: body.githubUrl || '',
      liveUrl: body.liveUrl || '',
      thumbnail: body.thumbnail || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Insert the project
    const result = await collection.insertOne(projectData);

    if (result.acknowledged) {
      return NextResponse.json(
        { 
          message: 'Project added successfully!', 
          projectId: result.insertedId,
          project: { ...projectData, _id: result.insertedId }
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { error: 'Failed to add project' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error adding project:', error);
    
    // Fallback to mock database if MongoDB fails
    if (error.message.includes('authentication failed') || error.message.includes('bad auth')) {
      const body = await request.json();
      
      const newProject = {
        _id: nextId.toString(),
        title: body.title.trim(),
        description: body.description.trim(),
        technologies: body.technologies.trim(),
        githubUrl: body.githubUrl || '',
        liveUrl: body.liveUrl || '',
        thumbnail: body.thumbnail || '',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      projects.unshift(newProject);
      nextId++;

      return NextResponse.json(
        { 
          message: 'Project added successfully! (MongoDB authentication failed, using fallback storage)',
          projectId: newProject._id,
          project: newProject
        },
        { status: 201 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Check if MongoDB is configured properly
    if (!process.env.MONGODB_URI || 
        process.env.MONGODB_URI.includes('auth@') || 
        process.env.MONGODB_URI === 'your_mongodb_connection_string_here') {
      
      // Use mock database for development
      return NextResponse.json(
        { 
          message: 'Projects fetched successfully (Using mock database - Configure MongoDB for persistence)',
          projects: projects,
          count: projects.length
        },
        { status: 200 }
      );
    }

    // Try MongoDB connection
    const clientPromise = (await import('@/lib/mongodb')).default;
    const client = await clientPromise;
    const db = client.db('portfolio');
    const collection = db.collection('projects');

    // Fetch all projects, sorted by creation date (newest first)
    const projectsFromDB = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(
      { 
        message: 'Projects fetched successfully',
        projects: projectsFromDB,
        count: projectsFromDB.length
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching projects:', error);
    
    // Fallback to mock database if MongoDB fails
    if (error.message.includes('authentication failed') || error.message.includes('bad auth')) {
      return NextResponse.json(
        { 
          message: 'Projects fetched successfully (MongoDB authentication failed, using fallback storage)',
          projects: projects,
          count: projects.length
        },
        { status: 200 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
