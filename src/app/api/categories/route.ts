import { NextResponse } from 'next/server';
import { Category } from '@/types/product.types';
import fs from 'fs';
import path from 'path';

const JSON_FILE_PATH = path.join(process.cwd(), 'src/database/categories.json');

// Ensure the file exists with initial data
if (!fs.existsSync(JSON_FILE_PATH)) {
  fs.writeFileSync(JSON_FILE_PATH, JSON.stringify({ categories: [] }, null, 2), 'utf-8');
}

// GET all categories
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    console.log("id", id);
    // If no ID is provided, return all categories (existing functionality)
    if (!id) {
      const data = fs.readFileSync(JSON_FILE_PATH, 'utf-8');
      const categories = JSON.parse(data).categories;
      return NextResponse.json({ success: true, categories });
    }

    // If ID is provided, find specific category
    const categories: Category[] = JSON.parse(fs.readFileSync(JSON_FILE_PATH, 'utf-8')).categories;
    const category = categories.find(c => c.id === Number(id));

    if (!category) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.error('Error getting category:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to get category' },
      { status: 500 }
    );
  }
}

// POST new category
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const categories: Category[] = JSON.parse(fs.readFileSync(JSON_FILE_PATH, 'utf-8')).categories;

    const newCategory: Category = {
      ...data,
      id: Math.max(0, ...categories.map(c => c.id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    categories.push(newCategory);
    fs.writeFileSync(JSON_FILE_PATH, JSON.stringify({ categories }, null, 2), 'utf-8');

    return NextResponse.json({ 
      success: true, 
      message: 'Category created successfully',
      category: newCategory 
    });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create category' },
      { status: 500 }
    );
  }
}

// PUT update category
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const {searchParams} = new URL(request.url);
    const id = searchParams.get('id');
    const {  ...updateData } = data;

    const categories: Category[] = JSON.parse(fs.readFileSync(JSON_FILE_PATH, 'utf-8')).categories;
    console.log("id", id);
    const index = categories.findIndex(c => Number(c.id) === Number(id));

    if (index === -1) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404 }
      );
    }

    categories[index] = {
      ...categories[index],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    fs.writeFileSync(JSON_FILE_PATH, JSON.stringify({ categories }, null, 2), 'utf-8');

    return NextResponse.json({ 
      success: true, 
      message: 'Category updated successfully',
      category: categories[index]
    });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update category' },
      { status: 500 }
    );
  }
}

// DELETE category
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id'));

    const categories: Category[] = JSON.parse(fs.readFileSync(JSON_FILE_PATH, 'utf-8')).categories;
    const index = categories.findIndex(c => c.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404 }
      );
    }

    const deletedCategory = categories[index];
    categories.splice(index, 1);
    fs.writeFileSync(JSON_FILE_PATH, JSON.stringify({ categories }, null, 2), 'utf-8');

    return NextResponse.json({ 
      success: true, 
      message: 'Category deleted successfully',
      category: deletedCategory
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete category' },
      { status: 500 }
    );
  }
} 