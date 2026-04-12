import React from 'react';

export type Category = "Finance & Money" | "Health & Fitness" | "Math & Science" | "Everyday Life" | "Fun & Niche" | "Fun / Viral" | "Home Improvement & DIY";

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
}
