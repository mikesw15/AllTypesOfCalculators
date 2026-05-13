import React, { Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCalculatorById, calculators } from '../calculators';
import { calculatorExplanations, calculatorComparisons } from '../calculators/explanations';
import CalculatorLayout from '../components/CalculatorLayout';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { useRecentCalculators } from '../hooks/useRecentCalculators';

export default function CalculatorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addRecent } = useRecentCalculators();
  
  // Find calculator by primary ID or variation ID
  let calculator = id ? getCalculatorById(id) : undefined;
  let variation = null;

  if (!calculator && id) {
    // Try to find by variation ID
    for (const currentCalc of calculators) {
      const currentVariation = currentCalc.variations?.find(v => v.id === id || v.id === `${id}-calculator`);
      if (currentVariation) {
        calculator = currentCalc;
        variation = currentVariation;
        break;
      }
    }
  }

  React.useEffect(() => {
    if (!calculator) {
      navigate('/');
    } else {
      addRecent(calculator.id);
    }
  }, [calculator, navigate]);

  if (!calculator) return null;

  const displayTitle = variation?.title || calculator.title;
  const seoTitle = variation?.seoTitle || calculator.seoTitle || calculator.title;
  const seoDescription = variation?.seoDescription || calculator.seoDescription || calculator.description;
  
  // Decide on a preferred canonical version (always include -calculator suffix if it's the standard)
  // This prevents duplicate content issues with and without the suffix.
  const preferredId = id?.endsWith('-calculator') ? id : `${id}-calculator`;
  const canonicalUrl = `https://alltypesofcalculators.com/${preferredId}`;
  
  // If the current URL has search params, it's likely a shared result state.
  // We want to index the clean calculator page, not every variation of shared results.
  const hasResultParams = window.location.search.length > 0;

  const Component = calculator.component;

  const defaultExplanation = (
    <>
      <p>This calculator helps you understand your numbers by taking your inputs and applying standard formulas.</p>
      <p><strong>Note:</strong> The results provided by this calculator are estimates and should be used for informational purposes only. They do not constitute financial or medical advice.</p>
    </>
  );

  const relatedCalculators = calculator.relatedIds 
    ? calculators.filter(c => calculator.relatedIds?.includes(c.id))
    : [];

    const generateKeywords = (title: string, category: string, description: string, customKeywords?: string[]) => {
      const base = ['calculator', 'online calculator', 'free tool', category.toLowerCase(), 'how to calculate'];
      
      const titleWords = title.toLowerCase().split(/[^a-z0-9]/).filter(w => w.length >= 3);
      const descWords = description.toLowerCase().split(/[^a-z0-9]/).filter(w => w.length >= 4);
      
      const combined = [`${title.toLowerCase()} calculator`, `${title.toLowerCase()} formula`, `${title.toLowerCase()} examples`].map(s => s.trim());
      const keywords = [...base, ...titleWords, ...descWords, ...combined];
      
      if (customKeywords && customKeywords.length > 0) {
        keywords.push(...customKeywords);
      }
      
      const stopWords = ['this', 'that', 'with', 'from', 'your', 'help', 'calculate', 'helps', 'using', 'numbers', 'provide', 'calculator'];
      return [...new Set(keywords)].filter(k => k.length > 1 && !stopWords.includes(k)).slice(0, 20);
    };

    const schemaData: any[] = [
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": displayTitle,
        "description": seoDescription,
        "applicationCategory": "CalculatorApplication",
        "genre": calculator.category,
        "operatingSystem": "All",
        "url": canonicalUrl,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "GBP"
        },
        "author": {
          "@type": "Organization",
          "name": "All Types of Calculators",
          "url": "https://alltypesofcalculators.com"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://alltypesofcalculators.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": calculator.category,
            "item": `https://alltypesofcalculators.com/categories/${calculator.category.toLowerCase().replace(/\s+/g, '-')}`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": displayTitle,
            "item": canonicalUrl
          }
        ]
      }
    ];

    // Add high-value AI Overview schema
    if (calculator.quickDefinition) {
      schemaData.push({
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        "name": displayTitle,
        "description": calculator.quickDefinition,
        "inDefinedTermSet": "https://alltypesofcalculators.com/glossary"
      });
    }

    // Add Article schema for long content
    if (calculator.longContent) {
      schemaData.push({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": seoTitle,
        "description": seoDescription,
        "author": {
          "@type": "Organization",
          "name": "All Types of Calculators"
        },
        "publisher": {
          "@type": "Organization",
          "name": "All Types of Calculators"
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": canonicalUrl
        }
      });
    }

    if (calculator.explanation || calculatorExplanations[calculator.id]) {
      schemaData.push({
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": `How to use the ${calculator.title}`,
        "description": calculator.description,
        "step": [
          {
            "@type": "HowToStep",
            "name": "Step 1: Input Data",
            "text": "Enter your figures and data points into the required input fields."
          },
          {
            "@type": "HowToStep",
            "name": "Step 2: Instant Calculation",
            "text": "Our engine processes your data instantly using industry-standard formulas."
          },
          {
            "@type": "HowToStep",
            "name": "Step 3: Analyze Results",
            "text": "Review the detailed breakdown, charts, and summaries provided."
          }
        ]
      });
    }

  if (calculator.faq && calculator.faq.length > 0) {
    schemaData.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": calculator.faq.map((item: any) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    });
  }

  return (
    <>
      <SEO 
        title={seoTitle}
        description={seoDescription}
        canonical={canonicalUrl}
        keywords={generateKeywords(displayTitle, calculator.category, seoDescription, variation?.keywords || calculator.keywords)}
        ogType="website"
        structuredData={schemaData}
        noindex={hasResultParams}
      />
      <CalculatorLayout 
        meta={{...calculator, title: displayTitle}} 
        explanation={calculator.explanation || calculatorExplanations[calculator.id] || defaultExplanation}
        faq={calculator.faq}
        relatedCalculators={relatedCalculators}
        comparison={calculatorComparisons[calculator.id]}
      >
        <Suspense fallback={
          <div className="bg-gray-50 dark:bg-gray-900 p-12 rounded-2xl flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Loading your calculator...</p>
          </div>
        }>
          <Component />
        </Suspense>
      </CalculatorLayout>
    </>
  );
}
