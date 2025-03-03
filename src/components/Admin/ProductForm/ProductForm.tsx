import { SelectInput } from '@/components/common/SelectInput/SelectInput';
import TextInput from '@/components/common/TextInput/TextInput';
import { Product } from '@/types/product.types';
import { Discount } from '@/types/product.types';
import React, { useEffect, useState } from 'react'
import { Category } from '@/types/product.types';

interface ProductFormProps {
    id?: string;
}

const ProductForm = ({ id }: ProductFormProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);

    const [product, setProduct] = useState<Partial<Omit<Product, 'discount'>> & { discount: Discount }>({
        title: '',
        price: 0,
        category: {
            id: 0,
            name: '',
            slug: '',
            isActive: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        brand: '',
        srcUrl: '',
        gallery: [],
        description: '',
        finalPrice: 0,
        discount: { amount: 0, percentage: 0 },
        rating: 0,
        orientation: ''
    });

    const [mainImage, setMainImage] = useState<File | null>(null);
    const [galleryImages, setGalleryImages] = useState<File[]>([]);
    
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
    
    useEffect(() => {
        const fetchProductDetails = async () => {
            if (id) {
                try {
                    const response = await fetch(`/api/fetchProductDetails?id=${id}`);
                    const productToEdit = await response.json();
                    
                    if (productToEdit) {
                        setProduct({
                            ...productToEdit,
                            discount: productToEdit.discount || { amount: 0, percentage: 0 }
                        });

                        // Create File objects from existing URLs if they exist
                        if (productToEdit.srcUrl) {
                            const response = await fetch(productToEdit.srcUrl);
                            const blob = await response.blob();
                            setMainImage(new File([blob], 'main-image', { type: blob.type }));
                        }

                        if (productToEdit.gallery && productToEdit.gallery.length > 0) {
                            const galleryFiles = await Promise.all(
                                productToEdit.gallery.map(async (url: string) => {
                                    const response = await fetch(url);
                                    const blob = await response.blob();
                                    return new File([blob], 'gallery-image', { type: blob.type });
                                })
                            );
                            setGalleryImages(galleryFiles);
                        }
                    }
                } catch (error) {
                    console.error('Error fetching product details:', error);
                    alert('Error loading product details');
                }
            }
            setIsLoading(false);
        };

        fetchProductDetails();
    }, [id]);
    
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await fetch('/api/categories');
                const data = await response.json();
                if (data.success) {
                    console.log("data.categories", data.categories);
                    setCategories(data.categories);
                } else {
                    console.error('Error loading categories:', data.message);
                }
            } catch (error) {
                console.error('Error loading categories:', error);
            }
        };
        
        loadCategories();
    }, []);
    
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

    const handleMainImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setMainImage(file);
            const imageUrl = URL.createObjectURL(file);
            handleInputChange('srcUrl', imageUrl);
        }
    };

    const handleGalleryImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        
        if (galleryImages.length + imageFiles.length <= 4) {
            setGalleryImages(prev => [...prev, ...imageFiles]);
            const imageUrls = imageFiles.map(file => URL.createObjectURL(file));
            setProduct(prev => ({
                ...prev,
                gallery: [...(prev.gallery || []), ...imageUrls]
            }));
        }
    };

    const handleGalleryRemove = (index: number) => {
        setGalleryImages(prev => prev.filter((_, i) => i !== index));
        setProduct(prev => ({
            ...prev,
            gallery: prev.gallery?.filter((_, i) => i !== index)
        }));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!mainImage) {
            alert('Please select a main image');
            return;
        }

        const formData = new FormData();
        formData.append('productData', JSON.stringify({ ...product, id }));
        formData.append('mainImage', mainImage);
        galleryImages.forEach(image => {
            formData.append('galleryImages', image);
        });

        try {
            const endpoint = id ? '/api/updateProduct' : '/api/updateProduct';
            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.success) {
                alert(`Product ${id ? 'updated' : 'created'} successfully!`);
            } else {
                alert(`Failed to ${id ? 'update' : 'create'} product`);
            }
        } catch (error) {
            console.error(`Error ${id ? 'updating' : 'saving'} product:`, error);
            alert(`Error ${id ? 'updating' : 'creating'} product`);
        }
    };
    
    const categoryOptions = categories.map(category => ({
        value: category.id.toString(),
        label: category.name,
        optionLabel: category.name,
        isActive: category.isActive
    })).filter(category => category.isActive);

    const orientationOptions = [
        { value: 'Men', label: 'Men', optionLabel: 'Men' },
        { value: 'Women', label: 'Women', optionLabel: 'Women' },
        { value: 'Boys', label: 'Boys', optionLabel: 'Boys' },
        { value: 'Girls', label: 'Girls', optionLabel: 'Girls' }
    ];
    
    if (isLoading && id) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow-sm rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">
                        {id ? 'Edit Product' : 'Add New Product'}
                    </h1>
                    
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
                                    value={product.category?.id?.toString() || ''}
                                    onChange={(value) => {
                                        const selectedCategory = categories.find(c => c.id.toString() === value);
                                        handleInputChange('category', selectedCategory || null);
                                    }}
                                    placeholder="Select category"
                                    className="flex items-center w-full border"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Orientation</label>
                                <SelectInput        
                                    id="orientation-select"
                                    options={orientationOptions}
                                    value={product.orientation}
                                    onChange={(value) => handleInputChange('orientation', value)}
                                    placeholder="Select orientation"
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

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                                <TextInput
                                    type="number"
                                    value={product.rating}
                                    onChange={(e) => handleInputChange('rating', Number(e.target.value))}
                                    placeholder="0.0"
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    boundaryClass="flex items-center w-full border"
                                    onClear={() => handleInputChange('rating', 0)}
                                />
                            </div>
                        </div>
    
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Main Image</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors duration-200">
                                <div className="space-y-1 text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                        <label htmlFor="main-image-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                            <span>Upload a file</span>
                                            <input id="main-image-upload" type="file" accept="image/*" onChange={handleMainImageSelect} className="sr-only" />
                                        </label>
                                        {/* <p className="pl-1">or drag and drop</p> */}
                                    </div>
                                    {/* <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p> */}
                                </div>
                            </div>
                            {mainImage && (
                                <img 
                                    src={URL.createObjectURL(mainImage)} 
                                    alt="Preview" 
                                    className="mt-2 h-32 object-cover rounded-md"
                                />
                            )}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium text-gray-700">Gallery Images (Max 4)</label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors duration-200 w-full">
                                    <div className="space-y-1 text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label htmlFor="gallery-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                <span>Upload files</span>
                                                <input 
                                                    id="gallery-upload" 
                                                    type="file" 
                                                    accept="image/*" 
                                                    multiple 
                                                    onChange={handleGalleryImageSelect} 
                                                    className="sr-only"
                                                    disabled={galleryImages.length >= 4}
                                                />
                                            </label>
                                            {/* <p className="pl-1">or drag and drop</p> */}
                                        </div>
                                        {/* <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p> */}
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-2">
                                {galleryImages.map((file, index) => (
                                    <div key={index} className="relative">
                                        <img 
                                            src={URL.createObjectURL(file)} 
                                            alt={`Gallery ${index + 1}`} 
                                            className="h-32 w-full object-cover rounded-md"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleGalleryRemove(index)}
                                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
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
                                {id ? 'Update Product' : 'Create Product'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProductForm