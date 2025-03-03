'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export default function EditRolePage() {
  const router = useRouter();
  const params = useParams();
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    fetchRole();
  }, []);

  const fetchRole = async () => {
    const response = await fetch(`/api/roles/${params?.id}`);
    const data = await response.json();
    setRole(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch(`/api/roles/${params?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(role),
    });

    if (response.ok) {
      router.push('/admin/roles');
    }
  };

  if (!role) return <div>Loading...</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Edit Role</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow-lg p-8">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={role.name}
            onChange={(e) => setRole({ ...role, name: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={role.description}
            onChange={(e) => setRole({ ...role, description: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Permissions</label>
          <select
            multiple
            value={role.permissions}
            onChange={(e) => setRole({
              ...role,
              permissions: Array.from(e.target.selectedOptions, option => option.value)
            })}
            className="w-full border border-gray-300 p-3 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="read">Read</option>
            <option value="write">Write</option>
            <option value="delete">Delete</option>
            <option value="admin">Admin</option>
          </select>
          <p className="mt-1 text-sm text-gray-500">Hold Ctrl/Cmd to select multiple permissions</p>
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