"use client"
import React from 'react'
import { useParams } from 'next/navigation';
import ProductDisplay from '@/components/Admin/Products/ProductDisplay';
import { notFound } from 'next/navigation';
const AdminSelection = () => {
    const { slug } = useParams();

    const renderAdminSelection = () => {
        switch (slug) {
            case 'products':
                return <ProductDisplay />
            case 'categories':
                return <p>Categories</p>
            case 'users':
                return <p>Users</p>
            default:
                return <p>{notFound()}</p>
        }
    }
  return (
    <div>
        {renderAdminSelection()}
    </div>
  )
}

export default AdminSelection