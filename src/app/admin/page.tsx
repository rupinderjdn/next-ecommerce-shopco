import DisplayCard from '@/components/DisplayCard/DisplayCard'
import React from 'react'

const AdminPage = () => {

    // TODO have to display the logged in user's name

    // TODO need an authenticator here to check if the user is admin
    // TODO need to check if the user is logged in
    // TODO need to check if the user has the correct permissions

  return (
        <div className='flex flex-col gap-4 justify-center items-center min-h-[50vh] p-8 bg-background'>
            <h1 className='text-3xl font-bold text-primary mb-6 tracking-tight'>Welcome to the Admin Dashboard</h1>
            <div className='flex flex-row justify-center items-center gap-6 p-4 flex-wrap max-w-7xl'>
                <DisplayCard title="Products" description="List of all products" routingUrl="/admin/products" />
                <DisplayCard title="Users" description="List of all users" routingUrl="/admin/users" />
                <DisplayCard title="Categories" description="List of all categories" routingUrl="/admin/categories" />
                <DisplayCard title="Roles" description="Manage user roles" routingUrl="/admin/roles" />
            </div>
        </div>
    )
}

export default AdminPage