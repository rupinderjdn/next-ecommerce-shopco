import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: Request) {
    try {
        // Get the id from the URL
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
        }

        // Read the JSON file
        const jsonDirectory = path.join(process.cwd(), 'src/database/');
        const fileContents = await fs.readFile(jsonDirectory + '/allProducts.json', 'utf8');
        const products = JSON.parse(fileContents);

        // Find the product with matching id
        const product = products.find((p: any) => p.id === Number(id));

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(product);

    } catch (error) {
        console.error('Error fetching product details:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
