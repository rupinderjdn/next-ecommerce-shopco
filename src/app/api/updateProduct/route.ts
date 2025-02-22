import { NextResponse } from 'next/server';
import { Product } from '@/types/product.types';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {

  try {
    const formData = await request.formData();
    const productData = JSON.parse(formData.get('productData') as string) as Product;
    const mainImage = formData.get('mainImage') as File;
    const galleryImages = formData.getAll('galleryImages') as File[];

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public/uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Save main image
    const mainImageBuffer = Buffer.from(await mainImage.arrayBuffer());
    const mainImagePath = `/uploads/${Date.now()}-${mainImage.name}`;
    fs.writeFileSync(path.join(process.cwd(), 'public', mainImagePath), mainImageBuffer);
    productData.srcUrl = mainImagePath;

    // Save gallery images
    const galleryPaths: string[] = [];
    for (const image of galleryImages) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const imagePath = `/uploads/${Date.now()}-${image.name}`;
      fs.writeFileSync(path.join(process.cwd(), 'public', imagePath), buffer);
      galleryPaths.push(imagePath);
    }
    productData.gallery = galleryPaths;

    // Read existing products
    const productsPath = path.join(process.cwd(), 'src/database/allProducts.json');
    const products: Product[] = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

    // Update product if exists, otherwise add new
    const productIndex = products.findIndex(p => p.id === productData.id);
    if (productIndex !== -1) {
      products[productIndex] = productData;
    } else {
      productData.id = Math.max(...products.map(p => p.id)) + 1;
      products.push(productData);
    }

    // Save updated products
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));

    return NextResponse.json({ 
      success: true, 
      message: 'Product updated successfully',
      product: productData 
    });

  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update product' },
      { status: 500 }
    );
  }
}
