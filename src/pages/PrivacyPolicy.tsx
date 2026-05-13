import React from 'react';
import SEO from '../components/SEO';

export default function PrivacyPolicy() {
  const lastUpdated = 'May 13, 2026';

  return (
    <>
      <SEO 
        title="Privacy Policy | AllTypesOfCalculators"
        description="Learn how we protect your data and ensure your privacy while using our online calculators."
        noindex={true}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-12">Last Updated: {lastUpdated}</p>

        <div className="prose prose-blue dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
            <p>
              Welcome to AllTypesOfCalculators ("we," "our," or "us"). We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and protect your information when you use our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Information We Collect</h2>
            <p>We collect information to provide better services to all our users. The types of information we collect include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Account Information:</strong> If you create an account, we collect your name, email address, and profile picture (via Google Login).</li>
              <li><strong>Usage Data:</strong> We collect non-identifying information about how you interact with our calculators, such as types of calculations performed (anonymized) and pages visited.</li>
              <li><strong>Calculation History:</strong> If you are signed in, we save your recent calculations to your account for your convenience. This data is private and only accessible to you.</li>
              <li><strong>Cookies:</strong> We use cookies to remember your preferences (like currency and unit systems) and to analyze our traffic.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. How We Use Your Information</h2>
            <p>The information we collect is used to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and improve our calculator services.</li>
              <li>Personalize your experience (e.g., remembering your preferred units).</li>
              <li>Maintain your calculation history and favorite tools.</li>
              <li>Communicate with you regarding support or updates (if you've contacted us).</li>
              <li>Ensure the security and integrity of our platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your data. All communication between your browser and our servers is encrypted using SSL (Secure Sockets Layer). Your sensitive data is stored securely using Google Firebase's infrastructure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Third-Party Services</h2>
            <p>
              We use third-party services like Google Analytics to understand website traffic. These services may collect information sent by your browser as part of a web page request, such as cookies or your IP address. We also use Google Login for secure authentication.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal information at any time. You can view and manage your data through your Account page or by contacting us directly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@alltypesofcalculators.com" className="text-blue-600 hover:underline">privacy@alltypesofcalculators.com</a>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
