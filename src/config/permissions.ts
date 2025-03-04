export interface Permission {
  value: string;
  label: string;
  description: string;
  category?: string;
}

export const AVAILABLE_PERMISSIONS: Permission[] = [
  // User Management
  {
    value: 'users.view',
    label: 'View Users',
    description: 'View user list and details',
    category: 'User Management'
  },
  {
    value: 'users.create',
    label: 'Create Users',
    description: 'Create new user accounts',
    category: 'User Management'
  },
  {
    value: 'users.edit',
    label: 'Edit Users',
    description: 'Modify existing user accounts',
    category: 'User Management'
  },
  {
    value: 'users.delete',
    label: 'Delete Users',
    description: 'Remove user accounts',
    category: 'User Management'
  },

  // Product Management
  {
    value: 'products.view',
    label: 'View Products',
    description: 'View product list and details',
    category: 'Product Management'
  },
  {
    value: 'products.create',
    label: 'Create Products',
    description: 'Add new products to the system',
    category: 'Product Management'
  },
  {
    value: 'products.edit',
    label: 'Edit Products',
    description: 'Modify existing products',
    category: 'Product Management'
  },
  {
    value: 'products.delete',
    label: 'Delete Products',
    description: 'Remove products from the system',
    category: 'Product Management'
  },

  // Category Management
  {
    value: 'categories.view',
    label: 'View Categories',
    description: 'View category list and details',
    category: 'Category Management'
  },
  {
    value: 'categories.create',
    label: 'Create Categories',
    description: 'Create new categories',
    category: 'Category Management'
  },
  {
    value: 'categories.edit',
    label: 'Edit Categories',
    description: 'Modify existing categories',
    category: 'Category Management'
  },
  {
    value: 'categories.delete',
    label: 'Delete Categories',
    description: 'Remove categories from the system',
    category: 'Category Management'
  },

  // Role Management
  {
    value: 'roles.view',
    label: 'View Roles',
    description: 'View role list and details',
    category: 'Role Management'
  },
  {
    value: 'roles.create',
    label: 'Create Roles',
    description: 'Create new roles',
    category: 'Role Management'
  },
  {
    value: 'roles.edit',
    label: 'Edit Roles',
    description: 'Modify existing roles',
    category: 'Role Management'
  },
  {
    value: 'roles.delete',
    label: 'Delete Roles',
    description: 'Remove roles from the system',
    category: 'Role Management'
  }
];