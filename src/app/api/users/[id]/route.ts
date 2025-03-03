import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Helper function to get user data file path
const JSON_FILE_PATH = path.join(process.cwd(), 'src/database/users.json');

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Read the JSON file
    const fileContent = await fs.readFile(JSON_FILE_PATH, 'utf-8');
    const users = JSON.parse(fileContent);
    
    const user = users.find((u: any) => u.id === params.id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching user' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    // Read current users
    const fileContent = await fs.readFile(JSON_FILE_PATH, 'utf-8');
    const users = JSON.parse(fileContent);
    
    // Find and update user
    const userIndex = users.findIndex((u: any) => u.id === params.id);
    if (userIndex === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    users[userIndex] = {
      ...users[userIndex],
      name: body.name,
      email: body.email,
      role: body.role,
      isActive: body.isActive,
    };

    // Write back to file
    await fs.writeFile(JSON_FILE_PATH, JSON.stringify(users, null, 2));

    return NextResponse.json(users[userIndex]);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating user' }, { status: 500 });
  }
} 