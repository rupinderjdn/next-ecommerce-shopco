import React, { useState, useEffect } from 'react';
import { Category } from '../types/product.types';
import { categoryApi } from '../api/category.api';

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    parentId: null as number | null,
    isActive: true
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const response = await categoryApi.getAll();
    setCategories(response);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedCategory) {
        await categoryApi.update(selectedCategory.id, formData);
      } else {
        await categoryApi.create(formData);
      }
      loadCategories();
      resetForm();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      await categoryApi.delete(id);
      loadCategories();
    }
  };

  const resetForm = () => {
    setSelectedCategory(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      parentId: null,
      isActive: true
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Category Management</h1>
      
      {/* Category Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid gap-4">
          <input
            type="text"
            placeholder="Category Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="border p-2"
          />
          <input
            type="text"
            placeholder="Slug"
            value={formData.slug}
            onChange={(e) => setFormData({...formData, slug: e.target.value})}
            className="border p-2"
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="border p-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2">
            {selectedCategory ? 'Update' : 'Create'} Category
          </button>
        </div>
      </form>

      {/* Categories Table */}
      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Slug</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>{category.slug}</td>
              <td>{category.description}</td>
              <td>
                <button
                  onClick={() => setSelectedCategory(category)}
                  className="bg-yellow-500 text-white p-1 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="bg-red-500 text-white p-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryManagement; 