import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbs: BreadcrumbItem[] = pathnames.map((name, index) => {
    const path = `/${pathnames.slice(0, index + 1).join('/')}`;
    
    // Format label: remove hyphens, title case, handle '-calculator' suffix
    let label = name
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
    
    if (label.toLowerCase().endsWith(' calculator')) {
      // Keep it as is or trim if necessary, but usually full name is better for SEO
    }

    return { label, path };
  });

  if (location.pathname === '/') return null;

  // Schema Markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://alltypesofcalculators.com/"
      },
      ...breadcrumbs.map((bc, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": bc.label,
        "item": `https://alltypesofcalculators.com${bc.path}`
      }))
    ]
  };

  return (
    <nav className="flex mb-6 overflow-x-auto whitespace-nowrap pb-2 no-scrollbar" aria-label="Breadcrumb">
      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup)}
      </script>
      <ol className="flex items-center space-x-2 text-sm text-gray-500">
        <li>
          <Link to="/" className="hover:text-blue-600 transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {breadcrumbs.map((bc, index) => (
          <li key={bc.path} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            {index === breadcrumbs.length - 1 ? (
              <span className="font-bold text-gray-900" aria-current="page">
                {bc.label}
              </span>
            ) : (
              <Link to={bc.path} className="hover:text-blue-600 transition-colors">
                {bc.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
