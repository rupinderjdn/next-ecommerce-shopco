"use client"
import React from 'react'
import { notFound, useParams } from 'next/navigation';
import  data  from '@/database/allProducts.json';
import { Product } from '@/types/product.types';
const ProductViewPage = () => {
    const { productSlug } = useParams();
    console.log(productSlug);
    const productData: Product | undefined = data.find(
        (product) => product.id === Number(productSlug)
      );

      if (!productData?.title) {
        notFound();
      }
  return (
    <div>ProductViewPage</div>
  )
}

export default ProductViewPage;