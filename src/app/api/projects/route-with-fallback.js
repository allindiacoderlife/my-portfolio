import { NextResponse } from 'next/server';

// Mock data for development when MongoDB is not available
const mockProjects = [
  {
    _id: '1',
    title: 'Sample Project 1',
    description: 'This is a sample project for demonstration purposes.',
    technologies: 'React, Next.js, TailwindCSS',
    githubUrl: 'https://github.com/example/project1',
    liveUrl: 'https://project1.vercel.app',
    thumbnail: '',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  },
  {
    _id: '2',
    title: 'Sample Project 2',
    description: 'Another sample project with different technologies.',
    technologies: 'Vue.js, Node.js, MongoDB',
    githubUrl: 'https://github.com/example/project2',
    liveUrl: 'https://project2.netlify.app',
    thumbnail: '',
    createdAt: new Date('2025-01-02'),
    updatedAt: new Date('2025-01-02')
  }
];

let projects = [...mockProjects];
let nextId = 3;

export async function POST(request) {
  try {
    // Check if MongoDB is configured
    if (!process.env.MONGODB_URI || process.env.MONGODB_URI.includes('auth@')) {
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
          message: 'Project added successfully! (Using mock database - MongoDB not configured)',
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
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Check if MongoDB is configured
    if (!process.env.MONGODB_URI || process.env.MONGODB_URI.includes('auth@')) {
      // Use mock database for development
      return NextResponse.json(
        { 
          message: 'Projects fetched successfully (Using mock database - MongoDB not configured)',
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
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
