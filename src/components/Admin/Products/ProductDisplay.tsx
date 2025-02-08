import React from 'react'
import allProductsDataJson from "@/database/allProducts.json";
import { Product } from '@/types/product.types'
import ProductCard from '@/components/common/ProductCard';

const ProductDisplay = () => {

    const allProductsData: Product[] = allProductsDataJson;

    return (
        <div className='flex flex-row flex-wrap p-2 gap-4 justify-center items-center'>
            {allProductsData.map((product) => (
                <ProductCard key={product.id} data={product} />
            ))}
        </div>
    )
}

export default ProductDisplay