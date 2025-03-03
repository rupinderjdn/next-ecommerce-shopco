import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/roles.json');

async function getRolesData() {
  const jsonData = await fs.readFile(dataFilePath, 'utf8');
  return JSON.parse(jsonData);
}

async function saveRolesData(data: any) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
}

export async function GET() {
  try {
    const data = await getRolesData();
    return NextResponse.json(data.roles);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch roles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await getRolesData();
    const newRole = await request.json();
    
    const role = {
      id: Date.now().toString(),
      name: newRole.name,
      description: newRole.description,
      permissions: newRole.permissions,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    data.roles.push(role);
    await saveRolesData(data);
    
    return NextResponse.json(role);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create role' }, { status: 500 });
  }
} 