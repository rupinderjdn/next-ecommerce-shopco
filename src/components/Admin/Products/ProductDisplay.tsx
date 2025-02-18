import React, { useMemo, useState, useCallback } from 'react'
import allProductsDataJson from "@/database/allProducts.json";
import { Product } from '@/types/product.types'
import ProductList from '@/components/ui/ProductListView';
import TextInput from '@/components/common/TextInput/TextInput';

const ProductDisplay = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const allProductsData: Product[] = allProductsDataJson;

    const filteredProducts = useMemo(() => {
        return allProductsData.filter(product => 
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [allProductsData, searchTerm]);

    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }, []);

    const handleClear = useCallback(() => {
        setSearchTerm('');
    }, []);

    return (
        <div id="admin-product-container" className='flex flex-col gap-2'>
            <div className='w-full px-4'>
                <TextInput
                    value={searchTerm}
                    onChange={handleSearch}
                    onClear={handleClear}
                    placeholder="Search products..."
                    boundaryClass="relative flex items-center w-full max-w-md mx-auto"
                    iconClass="absolute left-3 text-gray-400"
                    className="pl-10 border border-gray-500 rounded-md"
                />
            </div>
            <div className='flex flex-col flex-wrap p-2 gap-2 w-full items-center'>
                {filteredProducts.map((product) => (
                    <ProductList key={product.id} data={product} />
                ))}
            </div>
        </div>
    )
}

export default ProductDisplay