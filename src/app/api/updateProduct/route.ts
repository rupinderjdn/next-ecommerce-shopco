import { NextResponse } from 'next/server';
import { Product } from '@/types/product.types';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {

  try {
    const formData = await request.formData();
    let productData = JSON.parse(formData.get('productData') as string) as Product;
    productData.id = Number(productData.id);
    const mainImage = formData.get('mainImage');
    const galleryImages = formData.getAll('galleryImages') as File[];

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public/uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Handle main image
    if (mainImage instanceof File) {
      // Handle regular file upload
      const mainImageBuffer = Buffer.from(await mainImage.arrayBuffer());
      const mainImagePath = `/uploads/${Date.now()}-${mainImage.name}`;
      fs.writeFileSync(path.join(process.cwd(), 'public', mainImagePath), mainImageBuffer);
      productData.srcUrl = mainImagePath;
    } else {
      // If it's a Google Drive URL, use it directly
      const mainImageUrl = formData.get('mainImage') as string;
      if (mainImageUrl.includes('drive.google.com')) {
        productData.srcUrl = mainImageUrl;
      }
    }

    // Handle gallery images
    const galleryPaths: string[] = [];
    for (const image of galleryImages) {
      if (image instanceof File) {
        // Handle regular file upload
        const buffer = Buffer.from(await image.arrayBuffer());
        const imagePath = `/uploads/${Date.now()}-${image.name}`;
        fs.writeFileSync(path.join(process.cwd(), 'public', imagePath), buffer);
        galleryPaths.push(imagePath);
      } else if (typeof image === 'string' && (image as string).includes('drive.google.com')) {
        // If it's a Google Drive URL, use it directly
        galleryPaths.push(image as string);
      }
    }
    productData.gallery = galleryPaths;

    // Read existing products
    const productsPath = path.join(process.cwd(), 'src/database/allProducts.json');
    const products: Product[] = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

    // Check if this is an update (ID exists and is valid)
    if (productData.id && !isNaN(productData.id)) {
      console.log("productData.id type:", typeof productData.id, "value:", productData.id);
      console.log("first product id type:", typeof products[0].id, "value:", products[0].id);
      const productIndex = products.findIndex(p => Number(p.id) === Number(productData.id));
      if (productIndex === -1) {
        return NextResponse.json(
          { success: false, message: 'Product not found' },
          { status: 404 }
        );
      }
      
      // Delete old images
      const existingProduct = products[productIndex];
      if (existingProduct.srcUrl) {
        const oldMainImagePath = path.join(process.cwd(), 'public', existingProduct.srcUrl);
        if (fs.existsSync(oldMainImagePath)) {
          fs.unlinkSync(oldMainImagePath);
        }
      }
      
      if (existingProduct.gallery && Array.isArray(existingProduct.gallery)) {
        existingProduct.gallery.forEach(galleryPath => {
          const oldGalleryImagePath = path.join(process.cwd(), 'public', galleryPath);
          if (fs.existsSync(oldGalleryImagePath)) {
            fs.unlinkSync(oldGalleryImagePath);
          }
        });
      }

      // Update existing product
      products[productIndex] = {
        ...existingProduct,
        ...productData,
        srcUrl: productData.srcUrl,
        gallery: productData.gallery,
      };
    } else {
      // Add new product
      productData.id = Math.max(...products.map(p => p.id), 0) + 1;
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
