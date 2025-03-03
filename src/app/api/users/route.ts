import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Helper function to get user data file path
const JSON_FILE_PATH = path.join(process.cwd(), 'src/database/users.json');

export async function GET() {
  try {
    // Read the JSON file
    const fileContent = await fs.readFile(JSON_FILE_PATH, 'utf-8');
    const users = JSON.parse(fileContent);
    
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching users' }, 
      { status: 500 }
    );
  }
} 