'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PermissionCheckbox from '@/components/PermissionCheckbox';
import { AVAILABLE_PERMISSIONS } from '@/config/permissions';

export default function CreateRolePage() {
  const router = useRouter();
  const [role, setRole] = useState({
    name: '',
    description: '',
    permissions: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch('/api/roles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(role),
    });

    if (response.ok) {
      router.push('/admin/roles');
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 tracking-tight">Create Role</h1>
      <form onSubmit={handleSubmit} className="space-y-8 bg-white rounded-xl shadow-md p-8 border border-gray-100">
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-800">Role Name</label>
          <input
            type="text"
            value={role.name}
            onChange={(e) => setRole({ ...role, name: e.target.value })}
            className="w-full border border-gray-200 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Enter role name"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-800">Description</label>
          <textarea
            value={role.description}
            onChange={(e) => setRole({ ...role, description: e.target.value })}
            className="w-full border border-gray-200 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors min-h-[120px]"
            placeholder="Describe the role's purpose"
            required
          />
        </div>
        <div>
          <label className="block mb-3 text-sm font-semibold text-gray-800">Permissions</label>
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setRole({ ...role, permissions: AVAILABLE_PERMISSIONS.map(p => p.value) })}
              className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
            >
              Select All
            </button>
            <button
              type="button"
              onClick={() => setRole({ ...role, permissions: [] })}
              className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
            >
              Deselect All
            </button>
          </div>
          <div className="space-y-3">
            {AVAILABLE_PERMISSIONS.map((permission) => (
              <PermissionCheckbox
                key={permission.value}
                permission={permission}
                checked={role.permissions.includes(permission.value)}
                onChange={(checked) => {
                  const newPermissions = checked
                    ? [...role.permissions, permission.value]
                    : role.permissions.filter(p => p !== permission.value);
                  setRole({ ...role, permissions: newPermissions });
                }}
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3.5 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
        >
          Create Role
        </button>
      </form>
    </div>
  );
} 