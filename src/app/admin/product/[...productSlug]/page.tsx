"use client"
import React from 'react'
import { notFound, useParams } from 'next/navigation';
import  data  from '@/database/allProducts.json';
import { Product } from '@/types/product.types';
import ProductCard from '@/components/common/ProductCard';
import BreadcrumbProduct from '@/components/product-page/BreadcrumbProduct';
import Tabs from '@/components/product-page/Tabs';
import Header from "@/components/product-page/Header";
const ProductViewPage = () => {
    const { productSlug } : { productSlug: string[] } = useParams();
    console.log(productSlug);
    const productData: Product | undefined = data.find(
        (product) => product.id === Number(productSlug[0])
      );

      if (!productData?.title) {
        notFound();
      }
  return (
    <main>
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        {/* <BreadcrumbProduct title={productData?.title ?? "product"} /> */}
        <section className="mb-11">
          <Header data={productData} />
        </section>
        <Tabs />
      </div>
      {/* // TODO related products should have a linkage */}
      {/* <div className="mb-[50px] sm:mb-20">
        <ProductListSec title="You might also like" data={relatedProductData} />
      </div> */}
    </main>
  )
}

export default ProductViewPage;