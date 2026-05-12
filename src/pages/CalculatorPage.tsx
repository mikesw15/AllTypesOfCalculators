import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCalculatorById, calculators } from '../calculators';
import { calculatorExplanations } from '../calculators/explanations';
import CalculatorLayout from '../components/CalculatorLayout';
import SEO from '../components/SEO';
import { useRecentCalculators } from '../hooks/useRecentCalculators';

export default function CalculatorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addRecent } = useRecentCalculators();
  
  const calculator = id ? getCalculatorById(id) : undefined;

  React.useEffect(() => {
    if (!calculator) {
      navigate('/');
    } else {
      addRecent(calculator.id);
    }
  }, [calculator, navigate]);

  if (!calculator) return null;

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

  const generateKeywords = (title: string, category: string, customKeywords?: string[]) => {
    const base = ['calculator', 'online calculator', 'free tool', category.toLowerCase()];
    if (customKeywords && customKeywords.length > 0) {
      return [...new Set([...base, ...customKeywords])];
    }
    const words = title.toLowerCase().split(' ').filter(w => w.length > 3);
    const combined = `${title.toLowerCase()} calculator`;
    return [...new Set([...base, ...words, combined])];
  };

    const schemaData: any[] = [
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": calculator.title,
        "description": calculator.seoDescription || calculator.description,
        "applicationCategory": "CalculatorApplication",
        "genre": calculator.category,
        "operatingSystem": "All",
        "url": `https://alltypesofcalculators.com/calculators/${calculator.id}`,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
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
            "item": "https://alltypesofcalculators.com/categories"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": calculator.title,
            "item": `https://alltypesofcalculators.com/calculators/${calculator.id}`
          }
        ]
      }
    ];

    if (calculator.explanation || calculatorExplanations[calculator.id]) {
      schemaData.push({
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": `How to use the ${calculator.title}`,
        "description": calculator.description,
        "step": [
          {
            "@type": "HowToStep",
            "text": "Enter your inputs into the calculator fields."
          },
          {
            "@type": "HowToStep",
            "text": "Review the calculated results instantly."
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
        title={calculator.seoTitle || calculator.title}
        description={calculator.seoDescription || calculator.description}
        canonical={`https://alltypesofcalculators.com/calculators/${calculator.id}`}
        keywords={generateKeywords(calculator.title, calculator.category, calculator.keywords)}
        ogType="website"
        structuredData={schemaData}
      />
      <CalculatorLayout 
        meta={calculator} 
        explanation={calculator.explanation || calculatorExplanations[calculator.id] || defaultExplanation}
        faq={calculator.faq}
        relatedCalculators={relatedCalculators}
      >
        <Component />
      </CalculatorLayout>
    </>
  );
}
