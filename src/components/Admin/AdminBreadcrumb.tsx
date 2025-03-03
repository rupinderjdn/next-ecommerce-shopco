'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminBreadcrumb() {
  const pathname = usePathname();
  
  const getBreadcrumbs = () => {
    if (!pathname) return [];
    const segments = pathname.split('/').filter(Boolean);
    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join('/')}`;
      return {
        name: segment.charAt(0).toUpperCase() + segment.slice(1),
        path,
      };
    });
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav aria-label="Breadcrumb" className="py-2">
      <ol className="flex items-center gap-1 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center">
            {index > 0 && (
              <svg
                className="mx-2 h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
            <Link
              href={crumb.path}
              className="rounded px-2 py-1 transition-colors duration-150
                text-gray-600 hover:text-gray-900 hover:bg-gray-100
                dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
            >
              {crumb.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
} 