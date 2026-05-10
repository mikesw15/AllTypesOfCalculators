import React from 'react';
import { Shield, Calculator, Heart, Code } from 'lucide-react';
import SEO from '../components/SEO';

export default function About() {
  return (
    <>
      <SEO 
        title="About Us | Meet the Team | AllTypesOfCalculators"
        description="Learn more about the experts behind AllTypesOfCalculators. Our team of certified financial planners, health professionals, and engineers ensures our tools are accurate and reliable."
        keywords={['about us', 'calculator team', 'authors', 'creators', 'financial planners', 'medical consultants', 'calculator developers']}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">About Us</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            We build fast, accurate, and easy-to-use calculators to help you make better decisions in finance, health, and everyday life. Every tool is carefully developed and reviewed by industry professionals.
          </p>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Meet the Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm text-center">
              <div className="w-24 h-24 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
                <Calculator className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Sarah Jenkins, CFP®</h3>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-4">Certified Financial Planner</p>
              <p className="text-gray-600 dark:text-gray-400">
                With over 12 years of experience in wealth management, Sarah ensures our financial calculators—from retirement trackers to mortgage estimators—are mathematically sound and reflect current best practices.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm text-center">
              <div className="w-24 h-24 mx-auto bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Dr. Marcus Chen, M.D.</h3>
              <p className="text-sm text-green-600 dark:text-green-400 font-medium mb-4">Medical Consultant</p>
              <p className="text-gray-600 dark:text-gray-400">
                Dr. Chen reviews our health, fitness, and medical calculators. He cross-references our algorithms with official guidelines from organizations like the CDC and WHO to ensure your health estimates are safe and accurate.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm text-center">
              <div className="w-24 h-24 mx-auto bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-6">
                <Code className="w-10 h-10 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Alex Rivera</h3>
              <p className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-4">Lead Software Engineer</p>
              <p className="text-gray-600 dark:text-gray-400">
                The technical mind behind our platform. Alex specializes in building robust, mathematically precise algorithms and lightning-fast web applications, bringing our expert formulas to your browser seamlessly.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Commitment to Accuracy</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                We know that making decisions about your money, health, and home requires trust. That's why every calculator we publish undergoes rigorous testing. We cite official sources where applicable, display the formulas we use under the "How it works" tabs, and constantly update our logic based on new guidelines and tax laws.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
