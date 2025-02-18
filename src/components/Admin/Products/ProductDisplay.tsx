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

    const handleAddProduct = () => {
        // TODO: Implement add product functionality
    };

    const handleUploadExcel = () => {
        // TODO: Implement excel upload functionality
    };

    return (
        <div id="admin-product-container" className='flex flex-col gap-4 bg-gray-50 min-h-screen relative'>
            <div className='w-full px-6 py-4 bg-white shadow-sm sticky top-0 left-0 z-10'>
                <div className='flex items-center justify-between max-w-6xl mx-auto gap-6'>
                    <TextInput
                        value={searchTerm}
                        onChange={handleSearch}
                        onClear={handleClear}
                        placeholder="Search products..."
                        boundaryClass="relative flex items-center w-full max-w-xl"
                        iconClass="absolute left-3 text-gray-500"
                        className="pl-10 border border-gray-200 rounded-lg focus:border-gray-300 transition-all duration-200"
                    />
                    <div className='flex gap-3'>
                        <button 
                            onClick={handleAddProduct}
                            className='px-5 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors duration-200'
                        >
                            Add Product
                        </button>
                        <button 
                            onClick={handleUploadExcel}
                            className='px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200'
                        >
                            Upload Excel
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex flex-col  p-6 gap-3 w-full max-w-6xl mx-auto overflow-y-scroll h-[calc(100vh-10rem)]'>
                {filteredProducts.map((product) => (
                    <ProductList key={product.id} data={product} />
                ))}
            </div>
        </div>
    )
}

export default ProductDisplay