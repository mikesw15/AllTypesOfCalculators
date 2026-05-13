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
  keywords?: string[];
  explanation?: React.ReactNode;
  longContent?: React.ReactNode; // 800-2000+ words
  formulaMarkup?: React.ReactNode;
  workedExamples?: { title: string; content: React.ReactNode }[];
  faq?: { question: string; answer: string }[];
  relatedIds?: string[];
  sources?: { title: string; url: string }[];
}
