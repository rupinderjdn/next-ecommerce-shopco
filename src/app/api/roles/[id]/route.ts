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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await getRolesData();
    const role = data.roles.find((r: any) => r.id === params.id);
    
    if (!role) {
      return NextResponse.json({ error: 'Role not found' }, { status: 404 });
    }
    
    return NextResponse.json(role);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch role' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await getRolesData();
    const updateData = await request.json();
    const roleIndex = data.roles.findIndex((r: any) => r.id === params.id);
    
    if (roleIndex === -1) {
      return NextResponse.json({ error: 'Role not found' }, { status: 404 });
    }
    
    data.roles[roleIndex] = {
      ...data.roles[roleIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    await saveRolesData(data);
    return NextResponse.json(data.roles[roleIndex]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update role' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await getRolesData();
    data.roles = data.roles.filter((r: any) => r.id !== params.id);
    await saveRolesData(data);
    return NextResponse.json({ message: 'Role deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete role' }, { status: 500 });
  }
} 