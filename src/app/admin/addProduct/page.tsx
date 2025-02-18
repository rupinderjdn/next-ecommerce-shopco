"use client"
import React, { useState, useEffect } from 'react';
import TextInput from '@/components/common/TextInput/TextInput';
import { SelectInput } from '@/components/common/SelectInput/SelectInput';
import { Product, Discount } from '@/types/product.types';

const AddProductPage = () => {
  const [product, setProduct] = useState<Partial<Omit<Product, 'discount'>> & { discount: Discount }>({
    title: '',
    price: 0,
    category: '',
    brand: '',
    srcUrl: '',
    description: '',
    finalPrice: 0,
    discount: { amount: 0, percentage: 0 },
    rating: 0
  });

  useEffect(() => {
    if (product.price && product.discount.percentage) {
      const discountAmount = (product.price * product.discount.percentage) / 100;
      const finalPrice = product.price - discountAmount;
      setProduct(prev => ({
        ...prev,
        finalPrice,
        discount: {
          ...prev.discount,
          amount: discountAmount
        }
      }));
    }
  }, [product.price, product.discount.percentage]);

  const handleInputChange = (field: keyof Product, value: any) => {
    setProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDiscountChange = (field: keyof Discount, value: number) => {
    if (field === 'percentage') {
      setProduct(prev => ({
        ...prev,
        discount: {
          ...prev.discount,
          [field]: value
        }
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement product submission
    console.log(product);
  };

  const categoryOptions = [
    { value: 'electronics', label: 'Electronics', optionLabel: 'Electronics' },
    { value: 'clothing', label: 'Clothing', optionLabel: 'Clothing' },
    { value: 'books', label: 'Books', optionLabel: 'Books' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <TextInput
                  value={product.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Product title"
                  boundaryClass="flex items-center w-full border"
                  onClear={() => handleInputChange('title', '')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <TextInput
                  type="number"
                  value={product.price}
                  onChange={(e) => handleInputChange('price', Number(e.target.value))}
                  placeholder="0.00"
                  boundaryClass="flex items-center w-full border"
                  onClear={() => handleInputChange('price', 0)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <SelectInput
                  id="category-select"
                  options={categoryOptions}
                  value={product.category}
                  onChange={(value) => handleInputChange('category', value)}
                  placeholder="Select category"
                  className="flex items-center w-full border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                <TextInput
                  value={product.brand}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  placeholder="Brand name"
                  boundaryClass="flex items-center w-full border"
                  onClear={() => handleInputChange('brand', '')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Percentage</label>
                <TextInput
                  type="number"
                  value={product.discount.percentage}
                  onChange={(e) => handleDiscountChange('percentage', Number(e.target.value))}
                  placeholder="0.00"
                  boundaryClass="flex items-center w-full border"
                  onClear={() => handleDiscountChange('percentage', 0)}
                />
                
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Amount</label>
                <TextInput
                  type="number"
                  value={product.discount.amount}
                  placeholder="0.00"
                  boundaryClass="flex items-center w-full border"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Final Price</label>
                <TextInput
                  type="number"
                  value={product.finalPrice}
                  placeholder="0.00"
                  boundaryClass="flex items-center w-full border"
                  disabled
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <TextInput
                value={product.srcUrl}
                onChange={(e) => handleInputChange('srcUrl', e.target.value)}
                placeholder="https://example.com/image.jpg"
                boundaryClass="flex items-center w-full border"
                onClear={() => handleInputChange('srcUrl', '')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={product.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="Product description"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
