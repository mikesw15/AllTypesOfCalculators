import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCalculatorById, calculators } from '../calculators';
import CalculatorLayout from '../components/CalculatorLayout';

export default function CalculatorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const calculator = id ? getCalculatorById(id) : undefined;

  useEffect(() => {
    if (!calculator) {
      navigate('/');
    } else {
      document.title = calculator.seoTitle || `${calculator.title} | AllTypesOfCalculators`;
      
      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', calculator.seoDescription || calculator.description);

      // Add Schema Markup
      let scriptSchema = document.querySelector('#schema-markup');
      if (!scriptSchema) {
        scriptSchema = document.createElement('script');
        scriptSchema.setAttribute('id', 'schema-markup');
        scriptSchema.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptSchema);
      }
      
      const schemaData = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": calculator.title,
        "description": calculator.description,
        "applicationCategory": "CalculatorApplication",
        "operatingSystem": "Any"
      };
      
      scriptSchema.textContent = JSON.stringify(schemaData);
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

  return (
    <CalculatorLayout 
      meta={calculator} 
      explanation={calculator.explanation || defaultExplanation}
      faq={calculator.faq}
      relatedCalculators={relatedCalculators}
    >
      <Component />
    </CalculatorLayout>
  );
}
