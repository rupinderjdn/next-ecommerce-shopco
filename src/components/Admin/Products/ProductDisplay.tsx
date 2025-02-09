import React from 'react'
import allProductsDataJson from "@/database/allProducts.json";
import { Product } from '@/types/product.types'
import ProductCard from '@/components/common/ProductCard';
import ProductList from '@/components/ui/ProductListView';

const ProductDisplay = () => {

    const allProductsData: Product[] = allProductsDataJson;

    return (
        <div id="admin-product-container" className='flex flex-col gap-2 '>
            {/* // TODO need a search filter and delete all handling  */}
            <div className='flex flex-col flex-wrap p-2 gap-2  w-full items-center'>
                {allProductsData.map((product) => (
                    <ProductList key={product.id} data={product} />
                ))}
            </div>
        </div>
    )
}

export default ProductDisplay