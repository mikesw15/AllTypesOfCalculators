import React from 'react';
import { ArrowRight, Scale, Info, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { comparisons } from '../calculators/comparisons';
import { calculators } from '../calculators';

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

        <div className="space-y-12">
          {comparisons.map((comp) => (
            <div 
              key={comp.id}
              className="bg-white rounded-[2.5rem] overflow-hidden border-2 border-gray-50 shadow-xl shadow-gray-200/20"
            >
              <div className="p-8 md:p-12 border-b border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 mb-2">{comp.title}</h2>
                    <p className="text-gray-600 font-medium text-lg">{comp.description}</p>
                  </div>
                  <div className="flex gap-2">
                    {comp.calculatorIds.map(id => {
                      const calc = calculators.find(c => c.id === id);
                      return calc ? (
                        <Link 
                          key={id}
                          to={`/${id}-calculator`}
                          className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2"
                        >
                          Use {calc.title}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      ) : null;
                    })}
                  </div>
                </div>

                <div className="overflow-x-auto rounded-3xl border border-gray-100">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50/50">
                        <th className="px-6 py-6 text-sm font-black text-gray-400 uppercase tracking-widest">Metric</th>
                        {comp.calculatorIds.map(id => (
                          <th key={id} className="px-6 py-6 text-sm font-black text-blue-600 uppercase tracking-widest">
                            {calculators.find(c => c.id === id)?.title}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {comp.highlights.differences.map((diff, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                          <td className="px-6 py-6 font-bold text-gray-900 bg-gray-50/30">{diff.label}</td>
                          {comp.calculatorIds.map(id => (
                            <td key={id} className="px-6 py-6 text-gray-600 font-medium leading-relaxed">
                              {diff.values[id]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
