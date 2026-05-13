import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  twitterHandle?: string;
  structuredData?: object;
  keywords?: string[];
  noindex?: boolean;
}

export default function SEO({
  title = 'All Types of Calculators | Fast, Accurate & Free Online Tools',
  description = 'Free online calculators for finance, health, maths, mortgages, investments, BMI, loans and more. Fast, accurate and easy to use.',
  canonical,
  ogType = 'website',
  ogImage = 'https://picsum.photos/seed/calculator/1200/630',
  twitterHandle = '@calculators',
  structuredData,
  keywords = ['calculator', 'online calculator', 'free calculator tools'],
  noindex = false
}: SEOProps) {
  const siteName = 'AllTypesOfCalculators';
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      {canonical && <link rel="canonical" href={canonical} />}
      {noindex && <meta name="robots" content="noindex, follow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical || window.location.href} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical || window.location.href} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
      {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
