import React, { useState, useEffect } from 'react';
import { CalculatorMeta } from '../types';
import { Share2, Star, Info, HelpCircle, Link as LinkIcon, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import AIHelper from './AIHelper';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { exportToPDF } from '../utils/exportPdf';

import ShareModal from './ShareModal';

interface CalculatorLayoutProps {
  meta: CalculatorMeta;
  children: React.ReactNode;
  explanation?: React.ReactNode;
  faq?: { question: string; answer: string }[];
  relatedCalculators?: CalculatorMeta[];
}

export default function CalculatorLayout({ meta, children, explanation, faq, relatedCalculators }: CalculatorLayoutProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const checkFavorite = async () => {
      if (!user) return;
      
      try {
        const q = query(
          collection(db, `users/${user.uid}/favorites`),
          where('calculatorId', '==', meta.id)
        );
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          setIsFavorite(true);
          setFavoriteId(querySnapshot.docs[0].id);
        } else {
          setIsFavorite(false);
          setFavoriteId(null);
        }
      } catch (error) {
        console.error("Error checking favorite:", error);
      }
    };

    checkFavorite();
  }, [user, meta.id]);

  const toggleFavorite = async () => {
    if (!user) {
      alert("Please sign in to save favorites.");
      return;
    }

    try {
      if (isFavorite && favoriteId) {
        // Remove favorite
        // Note: we'd need doc(db, ...) but we can just use deleteDoc with the ref
        // For simplicity, let's just query and delete
        const q = query(
          collection(db, `users/${user.uid}/favorites`),
          where('calculatorId', '==', meta.id)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (docSnapshot) => {
          await deleteDoc(docSnapshot.ref);
        });
        setIsFavorite(false);
        setFavoriteId(null);
      } else {
        // Add favorite
        const docRef = await addDoc(collection(db, `users/${user.uid}/favorites`), {
          userId: user.uid,
          calculatorId: meta.id,
          addedAt: serverTimestamp()
        });
        setIsFavorite(true);
        setFavoriteId(docRef.id);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    await exportToPDF('calculator-content', `${meta.title}-results`);
    setIsExporting(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative">
      <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 dark:text-white">{meta.title}</h1>
          <p className="text-lg text-gray-600 max-w-3xl dark:text-gray-400">{meta.description}</p>
        </div>
        <div className="flex gap-3 shrink-0 mb-2 md:mb-0">
           <button 
             onClick={handleExportPDF}
             disabled={isExporting}
             className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition"
           >
             <Download className="w-4 h-4" />
             {isExporting ? 'Exporting...' : 'Export PDF'}
           </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-12">
        <div className="border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100">
              {meta.category}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleFavorite}
              className={`transition-colors ${isFavorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500 dark:text-gray-500 dark:hover:text-yellow-400'}`} 
              title={isFavorite ? "Remove from Favorites" : "Save to Favorites"}
            >
              <Star className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} />
            </button>
            <button 
              onClick={() => setIsShareModalOpen(true)}
              className="text-gray-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-400 transition-colors" 
              title="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div id="calculator-content" className="p-6 md:p-8 dark:bg-gray-800">
          {children}
        </div>
      </div>

      {explanation && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Info className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">How it works</h2>
          </div>
          <div className="prose prose-blue max-w-none text-gray-600">
            {explanation}
          </div>
        </div>
      )}

      {faq && faq.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            {faq.map((item, index) => (
              <div key={index} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {meta.sources && meta.sources.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-6">
            <LinkIcon className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">References & Sources</h2>
          </div>
          <div className="space-y-3">
            {meta.sources.map((source, index) => (
              <a
                key={index}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0"></div>
                {source.title}
              </a>
            ))}
          </div>
        </div>
      )}

      {relatedCalculators && relatedCalculators.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <LinkIcon className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Related Calculators</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedCalculators.map(calc => (
              <Link 
                key={calc.id} 
                to={`/calculators/${calc.id}`}
                className="p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md hover:border-blue-200 transition-all"
              >
                <h3 className="font-bold text-gray-900 mb-1">{calc.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{calc.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
      
      <AIHelper calculatorTitle={meta.title} calculatorDescription={meta.description} />
      
      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
        title={meta.title}
        url={window.location.href}
      />
    </div>
  );
}
