import React from 'react';
import { Shield, CheckCircle, Search, Scale, RefreshCw, FileText } from 'lucide-react';
import SEO from '../components/SEO';

export default function TestingMethodology() {
  return (
    <>
      <SEO 
        title="How Our Calculators Are Tested | Accuracy & Reliability"
        description="Learn about our rigorous testing process. We ensure every calculator on AllTypesOfCalculators is accurate, reliable, and verified by experts."
        keywords={['calculator testing', 'accuracy', 'reliability', 'verification process', 'E-E-A-T']}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">How We Ensure Accuracy</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Precision matters. At AllTypesOfCalculators, we follow a rigorous 5-step verification process for every tool we publish to ensure you can trust the results.
            </p>
          </div>

          <div className="space-y-12">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center">
                <Search className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Research & Source Verification</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  Before a single line of code is written, our team researches the underlying mathematical formulas. We prioritize primary sources, such as government tax agencies (IRS, HMRC), medical health organizations (CDC, WHO), and academic journals. We don't just "copy" other calculators; we build from the foundational logic.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-2xl flex items-center justify-center">
                <Scale className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Expert Review</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our algorithms are reviewed by subject matter experts. Financial tools are checked by Certified Financial Planners (CFPs), while health tools are reviewed by medical professionals. This step ensures that the nuance of real-world application isn't lost in the math.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-green-100 dark:bg-green-900 rounded-2xl flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Edge Case Testing</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our engineering team runs "Stress Tests" on every calculator. We check what happens with extremely high or low inputs, invalid data, and different unit systems. We ensure the logic holds up even in the most unusual scenarios.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-2xl flex items-center justify-center">
                <RefreshCw className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Continuous Updates</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  The world changes. Tax laws are updated, medical guidelines evolve, and interest rates shift. We perform quarterly audits of our most popular tools to ensure they remain current and accurate according to the latest data.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
                <FileText className="w-8 h-8 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Transparency</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  We believe you should see "under the hood." Most of our calculators include a "How it Works" section that explains the formulas and logic used, so you can verify the results yourself or learn about the calculation process.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 p-8 bg-blue-50 dark:bg-blue-900/20 rounded-3xl border border-blue-100 dark:border-blue-800">
            <div className="flex items-center gap-4 mb-6">
              <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Quality Guarantee</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you ever find a calculator that you believe is producing incorrect results, please <a href="/contact" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">contact us immediately</a>. We take accuracy seriously and will investigate and fix any verified issues within 48 hours.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
