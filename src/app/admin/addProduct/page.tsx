"use client"
import React from 'react';
import ProductForm from '@/components/Admin/ProductForm/ProductForm';
import { Product } from '@/types/product.types';

const AddProductPage = () => {

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <ProductForm  />
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;