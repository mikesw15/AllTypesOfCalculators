import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCalculatorById, calculators } from '../calculators';
import CalculatorLayout from '../components/CalculatorLayout';
import SEO from '../components/SEO';

export default function CalculatorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const calculator = id ? getCalculatorById(id) : undefined;

  React.useEffect(() => {
    if (!calculator) {
      navigate('/');
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

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": calculator.title,
    "description": calculator.description,
    "applicationCategory": "CalculatorApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <SEO 
        title={calculator.seoTitle || calculator.title}
        description={calculator.seoDescription || calculator.description}
        structuredData={schemaData}
      />
      <CalculatorLayout 
        meta={calculator} 
        explanation={calculator.explanation || defaultExplanation}
        faq={calculator.faq}
        relatedCalculators={relatedCalculators}
      >
        <Component />
      </CalculatorLayout>
    </>
  );
}
