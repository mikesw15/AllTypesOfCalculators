import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';

export default function Contact() {
  const { isDark } = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <>
      <SEO 
        title="Contact Us | Support & Feedback | AllTypesOfCalculators"
        description="Have a question about our calculators or a suggestion for a new tool? Get in touch with the AllTypesOfCalculators team. We value your feedback."
        keywords={['contact us', 'calculator support', 'feedback', 'suggest a calculator', 'customer service']}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Have a question, feedback, or a suggestion for a new calculator? We'd love to hear from you. Our team typically responds within 24-48 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Email Us</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">For general inquiries and support:</p>
                  <a href="mailto:support@alltypesofcalculators.com" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                    support@alltypesofcalculators.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Feedback</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We're constantly improving our tools. If you've found a bug or have an idea, let us know!
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 mt-8">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Office Hours</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Monday – Friday: 9:00 AM – 6:00 PM (EST)<br />
                  Saturday – Sunday: Closed (but we check emails!)
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Thank you for reaching out. A member of our team will get back to you shortly.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                  <select 
                    id="subject"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  >
                    <option>General Inquiry</option>
                    <option>Bug Report</option>
                    <option>Calculator Suggestion</option>
                    <option>Business Partnership</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 dark:shadow-none transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
