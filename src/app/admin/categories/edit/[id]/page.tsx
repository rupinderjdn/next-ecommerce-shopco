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
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-6">Edit Category</h1>
        <CategoryForm category={category} />
      </div>
    </div>
  );
};

export default EditCategoryPage; 