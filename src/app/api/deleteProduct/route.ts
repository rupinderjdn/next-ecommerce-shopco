import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Product } from '@/types/product.types';

export async function DELETE(request: Request) {
  try {
    // Get ID from URL
    const url = new URL(request.url);
    const id = Number(url.searchParams.get('id'));

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Read existing products
    const productsPath = path.join(process.cwd(), 'src/database/allProducts.json');
    const products: Product[] = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

    // Find product index
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    // Delete associated images
    const product = products[productIndex];
    if (product.srcUrl && product.srcUrl.startsWith('/uploads/')) {
      const mainImagePath = path.join(process.cwd(), 'public', product.srcUrl);
      if (fs.existsSync(mainImagePath)) {
        fs.unlinkSync(mainImagePath);
      }
    }

    if (product.gallery && Array.isArray(product.gallery)) {
      product.gallery.forEach(galleryPath => {
        if (galleryPath.startsWith('/uploads/')) {
          const galleryImagePath = path.join(process.cwd(), 'public', galleryPath);
          if (fs.existsSync(galleryImagePath)) {
            fs.unlinkSync(galleryImagePath);
          }
        }
      });
    }

    // Remove product from array
    products.splice(productIndex, 1);

    // Save updated products
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
