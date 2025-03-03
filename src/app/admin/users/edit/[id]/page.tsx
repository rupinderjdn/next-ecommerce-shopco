'use client';

import { useState, useEffect } from 'react';
import { User } from '@/types/user';
import { useParams, useRouter } from 'next/navigation';

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const response = await fetch(`/api/users/${params?.id}`);
    const data = await response.json();
    setUser(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch(`/api/users/${params?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      router.push('/admin/users');
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Edit User</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow-lg p-8">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Role</label>
          <select
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value as 'admin' | 'user' })}
            className="w-full border border-gray-300 p-3 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Status</label>
          <select
            value={user.isActive.toString()}
            onChange={(e) => setUser({ ...user, isActive: e.target.value === 'true' })}
            className="w-full border border-gray-300 p-3 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
} 