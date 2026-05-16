import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Home as HomeIcon, Activity, Calculator, Zap, PoundSterling, Heart, FlaskConical, Coffee, ArrowRight, Image as ImageIcon, Flame, Droplets, HeartPulse, Car, TrendingUp, Briefcase, Bitcoin, PieChart, Scale, Calendar, BarChart, Dices, Fuel, GraduationCap, Key, ChefHat, Moon, Leaf, BookOpen, Syringe, Dumbbell, PaintRoller, Grid, HardHat, ThermometerSun, Hammer, Clock, Baby } from 'lucide-react';
import { calculators } from '../calculators';
import SEO from '../components/SEO';
import CalculatorCard from '../components/CalculatorCard';
import { useRecentCalculators } from '../hooks/useRecentCalculators';

const categories = [
  { name: 'Finance', icon: PoundSterling, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { name: 'Health', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
  { name: 'Maths', icon: Calculator, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { name: 'Conversions', icon: Scale, color: 'text-amber-600', bg: 'bg-amber-50' },
  { name: 'Business', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
  { name: 'Construction', icon: Hammer, color: 'text-orange-600', bg: 'bg-orange-50' },
  { name: 'AI & SEO', icon: ImageIcon, color: 'text-fuchsia-600', bg: 'bg-fuchsia-50' },
  { name: 'Everyday life', icon: Coffee, color: 'text-cyan-600', bg: 'bg-cyan-50' },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { recentIds } = useRecentCalculators();

  const filteredCalculators = searchQuery 
    ? calculators.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const recentCalculators = recentIds
    .map(id => calculators.find(c => c.id === id))
    .filter(Boolean);

  const schemaData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "All Types of Calculators",
      "url": "https://alltypesofcalculators.com"
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is AllTypesOfCalculators?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AllTypesOfCalculators is a free online platform offering over 50 specialized calculators for finance, health, math, daily life, and home improvement."
          }
        },
        {
          "@type": "Question",
          "name": "Are the calculators free to use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, all our calculators are 100% free and do not require registration or personal data to provide accurate estimates."
          }
        },
        {
          "@type": "Question",
          "name": "How accurate are the results?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our calculators use standard industry formulas and real-time data where applicable (like currency exchange rates) to provide highly accurate estimations for your specific needs."
          }
        },
        {
          "@type": "Question",
          "name": "Is my data stored or shared?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. We prioritize user privacy and do not store any information you input into our calculators. All calculations are performed on-the-fly for your immediate use."
          }
        }
      ]
    }
  ];

  const faqs = [
    {
      question: "What is AllTypesOfCalculators?",
      answer: "AllTypesOfCalculators is a free online platform offering over 50 specialized calculators for finance, health, math, daily life, and home improvement. Our mission is to provide accurate, easy-to-use tools that help you make informed decisions."
    },
    {
      question: "Are the calculators free to use?",
      answer: "Yes, all our calculators are 100% free and do not require registration or personal data to provide accurate estimates."
    },
    {
      question: "How accurate are the results?",
      answer: "Our calculators use standard industry formulas and real-time data where applicable (like currency exchange rates) to provide highly accurate estimations. However, results should be used for informational purposes only."
    },
    {
      question: "Is my data stored or shared?",
      answer: "No. We prioritize user privacy and do not store any information you input into our calculators. All calculations are performed for your immediate use without data retention."
    }
  ];

  return (
    <div>
      <SEO 
        title="All Types of Calculators | Fast, Accurate & Free Online Tools"
        description="Free online calculators for finance, health, maths, mortgages, investments, BMI, loans and more. Fast, accurate and easy to use."
        keywords={['all types of calculators', 'free calculators', 'online calculator', 'finance calculator', 'math calculator', 'health calculator', 'tools', 'conversion']}
        canonical="https://alltypesofcalculators.com"
        structuredData={schemaData}
      />
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Free Online Calculators for <br className="hidden md:block" />
            <span className="text-blue-600">Finance, Health, Maths & More</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Fast, accurate, and easy-to-use tools for every aspect of your life. Get instant results without any registration.
          </p>
          
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-6 w-6" />
              <input 
                type="text" 
                placeholder="Search for a calculator (e.g., Mortgage, BMI)..." 
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 text-lg shadow-sm transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-10 text-left">
                {filteredCalculators.length > 0 ? (
                  <ul className="max-h-96 overflow-y-auto">
                    {filteredCalculators.map(calc => (
                      <li key={calc.id}>
                        <Link 
                          to={`/${calc.id}-calculator`}
                          className="block px-6 py-4 hover:bg-gray-50 border-b border-gray-50 last:border-0"
                        >
                          <div className="font-semibold text-gray-900">{calc.title}</div>
                          <div className="text-sm text-gray-500 truncate">{calc.description}</div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-6 py-8 text-center text-gray-500">
                    No calculators found matching "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => {
                const random = calculators[Math.floor(Math.random() * calculators.length)];
                navigate(`/${random.id}-calculator`);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 text-gray-900 font-medium hover:bg-gray-200 transition-colors"
            >
              <Zap className="w-5 h-5 text-yellow-500" />
              Random Calculator
            </button>
          </div>
        </div>
      </section>

      {/* Recently Used Section */}
      {recentCalculators.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-gray-400" />
              <h2 className="text-xl font-bold text-gray-900">Recently Used</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              {recentCalculators.map(calc => calc && (
                <Link
                  key={`recent-${calc.id}`}
                  to={`/${calc.id}-calculator`}
                  className="flex items-center gap-3 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 px-4 py-2.5 rounded-xl transition-colors"
                >
                  <span className="font-medium text-gray-900">{calc.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Explore by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Find exactly what you're looking for by browsing our organized collections of tools.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map(cat => {
              const Icon = cat.icon;
              const catCalculators = calculators.filter(c => c.category === cat.name);
              return (
                <div key={cat.name} className="flex flex-col p-8 rounded-3xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                  <div className={`w-14 h-14 rounded-2xl ${cat.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-8 h-8 ${cat.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{cat.name}</h3>
                  <p className="text-gray-500 text-sm mb-6 flex-grow">{catCalculators.length} specialized calculators for your {cat.name.toLowerCase()} needs.</p>
                  
                  <div className="space-y-3 mb-8">
                    {catCalculators.slice(0, 3).map(calc => (
                      <Link 
                        key={calc.id} 
                        to={`/${calc.id}-calculator`}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Zap className="w-3 h-3 text-yellow-500" />
                        {calc.title}
                      </Link>
                    ))}
                  </div>

                  <Link 
                    to={`/categories/${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`mt-auto inline-flex items-center gap-2 font-bold text-sm ${cat.color} hover:underline`}
                  >
                    View all {cat.name} tools <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-blue-600 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-30" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-black mb-6">Featured Calculator: <br/>Mortgage Estimator</h2>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                Planning your dream home? Our mortgage calculator provides a comprehensive breakdown of your monthly payments, including taxes, insurance, and amortization schedules.
              </p>
              <Link 
                to="/mortgage-calculator"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-2xl font-black text-lg hover:bg-gray-50 transition-all shadow-lg"
              >
                Try the Mortgage Calculator <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              {[
                { id: 'compound-interest', title: 'Compound Interest', icon: TrendingUp },
                { id: 'bmi', title: 'BMI Calculator', icon: Activity },
                { id: 'tax', title: 'Tax Estimator', icon: Briefcase },
                { id: 'currency-converter', title: 'Currency Converter', icon: PoundSterling }
              ].map(item => (
                <Link
                  key={item.id}
                  to={`/${item.id}-calculator`}
                  className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
                >
                  <item.icon className="w-8 h-8 mb-4 text-blue-200" />
                  <h4 className="font-bold text-lg">{item.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Trending Right Now</h2>
              <p className="text-gray-600 mt-2 text-lg">Our most used tools updated daily based on user trends.</p>
            </div>
            <Link to="/categories" className="hidden sm:flex items-center text-blue-600 font-bold hover:text-blue-700 bg-white px-6 py-3 rounded-xl shadow-sm border border-gray-200 transition-all">
              See all 50+ tools <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {calculators.slice(0, 6).map(calc => (
              <CalculatorCard key={calc.id} calc={calc} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Section */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Latest Additions</h2>
            <p className="text-gray-600 text-lg">Freshly added calculators to our growing library.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {calculators.slice(-4).reverse().map(calc => (
              <Link 
                key={`latest-${calc.id}`}
                to={`/${calc.id}-calculator`}
                className="p-6 rounded-2xl border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all group"
              >
                <div className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">New</div>
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600">{calc.title}</h3>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">{calc.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Inside the numbers</h2>
              <p className="text-gray-600 text-lg font-medium max-w-2xl">Expert guides and deep dives into finance, health, and mathematics. Learn the logic behind the results.</p>
            </div>
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-2xl font-black hover:bg-blue-600 transition-all shadow-xl shadow-gray-900/10"
            >
              Visit Blog
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Link to="/blog/understanding-mortgage-rates" className="group">
              <div className="aspect-[16/9] rounded-[2.5rem] overflow-hidden bg-gray-100 mb-6 border border-gray-100 shadow-2xl shadow-gray-200/50">
                <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Mortgage" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="space-y-4 px-2">
                <span className="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">Finance</span>
                <h3 className="text-3xl font-black text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">The 2026 Homebuyer's Guide to Mortgage Rates & Inflation</h3>
                <p className="text-gray-500 font-medium line-clamp-2">How today's economic climate affects your borrowing power and what you can do to secure the best deal possible.</p>
              </div>
            </Link>

            <div className="space-y-8">
              {[
                {
                  title: 'Macronutrients vs. Calories: What Actually Matters?',
                  slug: 'macros-vs-calories',
                  category: 'Health',
                  date: 'May 12, 2026',
                  image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                  title: 'Why Compound Interest is the "Eighth Wonder of the World"',
                  slug: 'compound-interest-guide',
                  category: 'Finance',
                  date: 'May 10, 2026',
                  image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                  title: 'DIY Construction: How to Order Materials Like a Pro',
                  slug: 'construction-waste-reduction',
                  category: 'Construction',
                  date: 'May 08, 2026',
                  image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                }
              ].map(post => (
                <Link key={post.slug} to={`/blog/${post.slug}`} className="flex gap-6 group items-center">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-3xl overflow-hidden bg-gray-100 border border-gray-100">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{post.category} • {post.date}</span>
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">{post.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 border-l-4 border-blue-600 pl-4">The Definitive Guide to Using Online Calculators for Every Life Decision</h2>
          <div className="prose prose-lg prose-blue text-gray-600 leading-relaxed max-w-none">
            <p>In the digital age, the ability to process complex data instantly is no longer a luxury—it is a necessity. **All Types of Calculators** was founded on a simple principle: providing the world with free, accessible, and mathematically rigorous tools to solve everyday problems. From calculating the interest on a £500,000 mortgage to determining the optimal time to go to sleep, our platform serves as a "digital multi-tool" for the modern individual.</p>
            
            <h3>The Evolution of Calculation: From Abacus to AI</h3>
            <p>Humans have always sought ways to simplify mathematics. Our journey began with the abacus, transitioned to the mechanical slide rule, and eventually led to the handheld electronic calculators of the 1970s. Today, we have moved beyond physical hardware. Modern online calculators leverage the power of cloud computing and sophisticated algorithms to provide results that would have taken a team of accountants hours to compute just decades ago.</p>

            <h3>Why Accuracy Matters in Financial Planning</h3>
            <p>Finance is the most popular category on our site, and for good reason. A mistake of just 0.5% in an interest rate calculation can cost a homeowner tens of thousands of pounds over 30 years. Our **Mortgage Calculator** doesn't just give you a monthly number; it breaks down the amortization schedule, showing you exactly how much of your payment goes to the bank versus your own equity. Similarly, our **Compound Interest Calculator** illustrates the "Eighth Wonder of the World"—the power of exponential growth—helping young investors visualize their path to retirement.</p>
            
            <h3>Health Informatics: Data-Driven Wellness</h3>
            <p>Health is another area where precision is paramount. While our tools like the **BMI Calculator** and **BMR Estimator** are not substitutes for professional medical advice, they provide vital baseline data. Understanding your **Total Daily Energy Expenditure (TDEE)** is the first step in any successful weight management journey. By entering your age, weight, and activity level, you gain a scientific understanding of your body's fuel requirements, moving your fitness journey from guesswork to data-driven execution.</p>

            <h3>Mastering the Construction Site: Construction and DIY Tools</h3>
            <p>Home improvement projects are notorious for budget overruns, often caused by ordering too much or too little material. Our **Construction** category, featuring the **Paint Calculator**, **Concrete Calculator**, and **Flooring Tool**, is designed to eliminate this waste. Whether you're a professional contractor or a weekend DIY enthusiast, these tools help you calculate exactly how many gallons of paint, bags of concrete, or boxes of tiles you need, saving you both money and unnecessary trips to the hardware store.</p>

            <h3>The New Frontier: AI and SEO Utilities</h3>
            <p>As technology evolves, so do our tools. Our **AI & SEO** section features cutting-edge utilities like our **AI Image Generator**. Powered by the latest Gemini models, this tool allows creators to turn text descriptions into high-resolution visual assets. Furthermore, our SEO-centric tools help digital marketers and bloggers optimize their content for search engines, ensuring their message reaches the right audience.</p>

            <h3>Education and Mathematics (Maths)</h3>
            <p>For students, teachers, and professionals, our **Maths** section offers everything from basic **Fraction Calculators** to advanced **Z-Score** and **Statistics** tools. We believe that by showing the "worked examples" and providing clear explanations of the formulas used, we aren't just giving people answers—we are helping them understand the underlying logic of the universe.</p>

            <h3>Practical Everyday Life Tools</h3>
            <p>Not every calculation is a life-altering financial decision. Sometimes, you just need to know how to split a dinner bill or how many human years your dog has lived. Our **Everyday Life** section covers these bases with tools like the **Tip Calculator**, **Pet Age Scaler**, and **Recipe Scaler**. These "micro-tools" reduce the friction of daily life, letting you focus on what matters while we handle the arithmetic.</p>

            <h3>Our Commitment to Privacy and Security</h3>
            <p>In an era where "free" often means "your data is the product," All Types of Calculators takes a different path. We do not store your financial entries, we do not require memberships to access our best tools, and we do not track your health data. All calculations happen within your browser session, and once you close the tab, your data is gone. We provide the accuracy of a professional suite with the privacy of a local desktop application.</p>

            <h3>How to Get the Most Out of Our Tools</h3>
            <p>To ensure the most accurate results, always pay attention to the "Inputs" and "Units." Our **Unit Converter** and **Conversions** tools are perfect for switching between metric and imperial systems, which is a common source of error in scientific and construction projects. We also recommend checking the "Related Calculators" section on each page, as many of our tools work best in tandem (e.g., using the **Salary Calculator** before the **Mortgage Calculator**).</p>
            
            <div className="mt-16 bg-blue-600 rounded-[2rem] p-10 text-white shadow-2xl shadow-blue-200 relative overflow-hidden group">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
              <div className="relative z-10">
                <h4 className="text-3xl font-black mb-4">Start Your Calculation Journey Today</h4>
                <p className="text-blue-100 mb-8 text-lg max-w-2xl">Join thousands of users who trust our platform for their daily planning. No sign-ups, no fees, just pure mathematical clarity.</p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/categories" className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-lg">
                    Browse 50+ Tools <ArrowRight className="w-5 h-5" />
                  </Link>
                  <a href="#search-top" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="px-8 py-4 bg-blue-700 text-white rounded-2xl font-bold hover:bg-blue-800 transition-colors border border-blue-400">
                    Search Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
