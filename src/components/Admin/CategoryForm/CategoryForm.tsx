"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Category } from '@/types/product.types';

interface CategoryFormProps {
  category?: Category;
}

const CategoryForm = ({ category }: CategoryFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: category?.name || '',
    description: category?.description || '',
    isActive: category?.isActive ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = category 
        ? `/api/categories?id=${category.id}`
        : '/api/categories';
      
      const method = category ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/categories');
      }
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-8">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-800">
            Category Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-2 block w-full px-4 py-3 rounded-lg border-2 border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white hover:border-gray-300 transition-colors duration-200"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-800">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="mt-2 block w-full px-4 py-3 rounded-lg border-2 border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white hover:border-gray-300 transition-colors duration-200"
          />
        </div>

        <div className="flex items-center p-4 bg-gray-50 rounded-lg border-2 border-gray-100">
          <div className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                id="active"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="h-5 w-5 text-indigo-600 focus:ring-2 focus:ring-indigo-500 border-2 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="active" className="font-medium text-gray-800">Active</label>
              <p className="text-gray-600">Enable or disable this category</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={() => router.push('/admin/categories')}
            className="inline-flex items-center px-6 py-3 border-2 border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 border-2 border-transparent text-sm font-medium rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            {category ? 'Update Category' : 'Create Category'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CategoryForm; 