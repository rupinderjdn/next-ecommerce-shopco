import DisplayCard from '@/components/DisplayCard/DisplayCard'
import React from 'react'

const AdminPage = () => {

    // TODO have to display the logged in user's name

    // TODO need an authenticator here to check if the user is admin
    // TODO need to check if the user is logged in
    // TODO need to check if the user has the correct permissions


    // TODO product card
    // TODO users  card
    // TODO categories card
  return (
        <div className='flex flex-col gap-4 justify-center items-center'>
            <h1 className='text-2xl font-bold'>Welcome to the admin dashboard</h1>
            <div className='flex flex-row justify-center items-center gap-4 p-2'>
                <DisplayCard title="Products" description="List of all products" routingUrl="/admin/products" />
                <DisplayCard title="Users" description="List of all users" routingUrl="/admin/users" />
                <DisplayCard title="Categories" description="List of all categories" routingUrl="/admin/categories" />
            </div>
        </div>
    )
}

export default AdminPage