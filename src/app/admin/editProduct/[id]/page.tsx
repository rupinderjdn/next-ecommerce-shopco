'use client'
import React from 'react'
import ProductForm from '@/components/Admin/ProductForm/ProductForm'
import { useParams } from 'next/navigation';
const EditProductPage = () => {
    const { id }  = useParams();
    return (
        <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg p-6">
                <ProductForm id={id as string} />
            </div>
        </div>
    )
}

export default EditProductPage