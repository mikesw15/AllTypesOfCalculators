import React from 'react';
import { ArrowRight, Scale, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

const comparisons = [
  {
    title: "APR vs. Interest Rate",
    description: "Understand the true cost of borrowing. While both represent a percentage of the loan amount, they tell very different stories.",
    link: "/apr-calculator",
    highlights: ["Total cost of credit", "Annual percentage rate", "Nominal interest"]
  },
  {
    title: "BMI vs. Body Fat Percentage",
    description: "BMI is a quick screening tool, while Body Fat Percentage measures actual tissue composition. Which one should you track?",
    link: "/bmi-calculator",
    highlights: ["Muscle mass", "Health indicators", "Accuracy levels"]
  },
  {
    title: "Gross Pay vs. Net Pay",
    description: "The difference between what you earn and what actually hits your bank account. Learn about taxes, deductions, and withholdings.",
    link: "/salary-calculator",
    highlights: ["Income tax", "Insurance", "Take-home pay"]
  },
  {
    title: "Simple vs. Compound Interest",
    description: "See how money grows exponentially over time. Simple interest is flat; compound interest is power.",
    link: "/compound-interest-calculator",
    highlights: ["Exponential growth", "Investment strategy", "Time value of money"]
  }
];

export default function ComparisonsPage() {
  return (
    <>
      <SEO 
        title="Calculator Comparisons & Explainers – AllTypesOfCalculators"
        description="Compare different financial, health, and math metrics. Learn the difference between APR vs Interest, BMI vs Body Fat, and more."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs />

        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 flex items-center gap-4">
            <Scale className="w-12 h-12 text-blue-600" />
            Comparison Content
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            Google and users alike love deep-dive comparisons. We break down the technical differences between common metrics to help you make better decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {comparisons.map((comp, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl p-8 border-2 border-gray-50 hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-600/5 transition-all group"
            >
              <h2 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {comp.title}
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed font-medium">
                {comp.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {comp.highlights.map((h, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-widest rounded-lg">
                    {h}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-auto">
                <Link 
                  to={comp.link}
                  className="flex items-center gap-2 text-blue-600 font-bold hover:translate-x-1 transition-transform"
                >
                  View Calculator & Guide
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <div className="p-2 bg-blue-50 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all text-blue-600">
                  <Info className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-24 p-12 bg-gray-900 rounded-[3rem] text-white overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-6">Want or Need a specific comparison?</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl font-medium">
              Our team of experts is constantly adding new calculators and educational content. If there's a formula or metric you want us to explain, get in touch!
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-2xl font-black hover:bg-blue-600 hover:text-white transition-all"
            >
              Request a Calculator
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2" />
        </section>
      </div>
    </>
  );
}
