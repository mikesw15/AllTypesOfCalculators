import React from 'react';
import SEO from '../components/SEO';

export default function Terms() {
  const lastUpdated = 'May 13, 2026';

  return (
    <>
      <SEO 
        title="Terms of Service | AllTypesOfCalculators"
        description="Read our terms of service to understand the rules and guidelines for using our online calculators."
        noindex={true}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Terms of Service</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-12">Last Updated: {lastUpdated}</p>

        <div className="prose prose-blue dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using AllTypesOfCalculators.com, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, please do not use our website or tools.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Disclaimer of Warranty</h2>
            <p className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl border border-yellow-100 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200">
              <strong>IMPORTANT:</strong> Our calculators are provided for informational and educational purposes only. They do not constitute financial, medical, legal, or professional advice. Always consult with a qualified professional before making significant decisions.
            </p>
            <p>
              All results provided by our tools are estimates. While we strive for absolute accuracy, we do not guarantee that the results will be 100% correct or applicable to your specific situation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Use License</h2>
            <p>We grant you a personal, non-exclusive, non-transferable license to use our tools for personal or internal business use. You may not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Scrape or extract data from our website for commercial purposes without permission.</li>
              <li>Attempt to reverse engineer any of the calculation algorithms.</li>
              <li>Use our site in any way that could damage, disable, or overburden our servers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Accuracy of Information</h2>
            <p>
              We make every effort to ensure the accuracy of our calculators and the information on our site. However, information may change over time (e.g., tax laws, interest rates). We are not responsible for any errors or omissions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Limitation of Liability</h2>
            <p>
              In no event shall AllTypesOfCalculators or its developers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. External Links</h2>
            <p>
              Our site may contain links to external sites. We are not responsible for the content or privacy practices of these third-party websites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the site signifies your acceptance of the updated terms.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
