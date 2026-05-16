import React from 'react';

export type Category = 
  | "Finance" 
  | "Health" 
  | "Maths" 
  | "Conversions" 
  | "Business" 
  | "Construction" 
  | "AI & SEO" 
  | "Everyday life";

export interface SEOVariation {
  id: string; // The URL slug (e.g., 'savings-growth-calculator')
  title: string;
  seoTitle: string;
  seoDescription: string;
  keywords?: string[];
}

export interface ComparisonMeta {
  id: string;
  title: string;
  description: string;
  calculatorIds: string[];
  highlights: {
    title: string;
    differences: {
      label: string;
      values: Record<string, string>;
    }[];
  };
}

export interface CalculatorMeta {
  id: string;
  title: string;
  description: string;
  category: Category;
  icon: string; // Lucide icon name
  component: React.ComponentType<any>;
  seoTitle: string;
  seoDescription: string;
  keywords?: string[];
  explanation?: React.ReactNode;
  longContent?: React.ReactNode; // 800-2000+ words
  formulaMarkup?: React.ReactNode;
  workedExamples?: { title: string; content: React.ReactNode }[];
  faq?: { question: string; answer: string }[];
  relatedIds?: string[];
  sources?: { title: string; url: string }[];
  variations?: SEOVariation[];
  quickDefinition?: string;
  formulaVariables?: { symbol: string; meaning: string }[];
  tableData?: {
    headers: string[];
    rows: string[][];
  };
}
