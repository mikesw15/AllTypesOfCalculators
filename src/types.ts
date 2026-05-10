import React from 'react';

export type Category = "Finance" | "Health" | "Math" | "Everyday Life" | "Fun" | "Home Improvement";

export interface CalculatorMeta {
  id: string;
  title: string;
  description: string;
  category: Category;
  icon: string; // Lucide icon name
  component: React.ComponentType<any>;
  seoTitle: string;
  seoDescription: string;
  explanation?: React.ReactNode;
  faq?: { question: string; answer: string }[];
  relatedIds?: string[];
  sources?: { title: string; url: string }[];
}
