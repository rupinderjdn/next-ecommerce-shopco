'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PermissionCheckbox from '@/components/PermissionCheckbox';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

interface Permission {
  value: string;
  label: string;
  description: string;
}

const AVAILABLE_PERMISSIONS: Permission[] = [
  {
    value: 'read',
    label: 'Read',
    description: 'View resources and data'
  },
  {
    value: 'write',
    label: 'Write',
    description: 'Create and edit resources'
  },
  {
    value: 'delete',
    label: 'Delete',
    description: 'Remove resources from the system'
  },
  {
    value: 'admin',
    label: 'Admin',
    description: 'Full system access and management'
  }
];

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

  if (!role) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-pulse text-gray-600">Loading...</div>
    </div>
  );

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 tracking-tight">Edit Role</h1>
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
          <label className="block mb-2 text-sm font-semibold text-gray-800">Permissions</label>
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
          Save Changes
        </button>
      </form>
    </div>
  );
} 