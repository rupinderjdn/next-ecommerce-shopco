interface Permission {
  value: string;
  label: string;
  description: string;
}

interface PermissionCheckboxProps {
  permission: Permission;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function PermissionCheckbox({ permission, checked, onChange }: PermissionCheckboxProps) {
  return (
    <label
      className="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
          {permission.label}
        </p>
        <p className="text-sm text-gray-500">
          {permission.description}
        </p>
      </div>
    </label>
  );
} 