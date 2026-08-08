import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!uri || uri.includes('auth@') || uri === 'your_mongodb_connection_string_here') {
  console.warn('Warning: MONGODB_URI is not set or not configured. Database operations will use fallback/mock data.');
  // Resolve with null so that backend doesn't crash during initialization
  clientPromise = Promise.resolve(null);
} else {
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR.
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

// Export a module-scoped MongoClient promise.
export default clientPromise;
