"use client"
import React from 'react';
import CategoryForm from '@/components/Admin/CategoryForm/CategoryForm';

const AddCategoryPage = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-6">Add New Category</h1>
        <CategoryForm />
      </div>
    </div>
  );
};

export default AddCategoryPage; 