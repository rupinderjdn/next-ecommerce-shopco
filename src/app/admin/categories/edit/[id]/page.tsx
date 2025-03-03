"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import CategoryForm from '@/components/Admin/CategoryForm/CategoryForm';
import { Category } from '@/types/product.types';

const EditCategoryPage = () => {
  const params = useParams();
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`/api/categories?id=${params?.id}`);
        const data = await response.json();
        setCategory(data.category);
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    if (params?.id) {
      fetchCategory();
    }
  }, [params?.id]);

  if (!category) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
        <div className="p-8 border-b border-gray-200 bg-gray-50">
          <h1 className="text-3xl font-bold text-gray-900">Edit Category</h1>
          <p className="mt-2 text-sm text-gray-600">Update your category information below.</p>
        </div>
        <div className="p-8 bg-white">
          <CategoryForm category={category} />
        </div>
      </div>
    </div>
  );
};

export default EditCategoryPage; 