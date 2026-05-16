import React, { useState, useEffect } from 'react';
import { CalculatorMeta } from '../types';
import { Share2, Star, Info, HelpCircle, Link as LinkIcon, Download, Scale, Printer } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AIHelper from './AIHelper';
import ReviewSection from './ReviewSection';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { exportToPDF } from '../utils/exportPdf';
import { handleFirestoreError, OperationType } from '../utils/firestoreErrors';

import ShareModal from './ShareModal';
import Breadcrumbs from './Breadcrumbs';
import ComparisonSection from './ComparisonSection';
import { getComparisonForCalculator } from '../calculators/comparisons';

interface CalculatorLayoutProps {
  meta: CalculatorMeta;
  children: React.ReactNode;
  explanation?: React.ReactNode;
  faq?: { question: string; answer: string }[];
  relatedCalculators?: CalculatorMeta[];
  comparison?: {
    title: string;
    points: { title: string; content: string }[];
  };
}

export default function CalculatorLayout({ meta, children, explanation, faq, relatedCalculators, comparison }: CalculatorLayoutProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const dynamicComparison = getComparisonForCalculator(meta.id);

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
      navigate('/login', { state: { from: location } });
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
        const path = `users/${user.uid}/favorites`;
        try {
          const docRef = await addDoc(collection(db, path), {
            userId: user.uid,
            calculatorId: meta.id,
            addedAt: serverTimestamp()
          });
          setIsFavorite(true);
          setFavoriteId(docRef.id);
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, path);
        }
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if focus is inside an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key === 'e') {
        e.preventDefault();
        if (!isExporting) handleExportPDF();
      }
      
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        toggleFavorite();
      }

      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'S') {
        // usually share or save as, we can use it for share
        e.preventDefault();
        setIsShareModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExporting, isFavorite, favoriteId, user]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative">
      <Breadcrumbs />
      <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 dark:text-white">{meta.title}</h1>
          <p className="text-lg text-gray-600 max-w-3xl dark:text-gray-400">{meta.description}</p>
        </div>
        <div className="flex gap-3 shrink-0 mb-2 md:mb-0">
           <button 
             onClick={() => window.print()}
             className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition"
             title="Print Page (⌘P)"
           >
             <Printer className="w-4 h-4" />
             <span className="hidden sm:inline">Print</span>
           </button>
           <button 
             onClick={handleExportPDF}
             disabled={isExporting}
             className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition"
             title="Export PDF (⌘E)"
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
              className={`transition-colors flex items-center gap-1.5 ${isFavorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500 dark:text-gray-500 dark:hover:text-yellow-400'}`} 
              title={isFavorite ? "Remove from Favorites (⌘S)" : "Save to Favorites (⌘S)"}
            >
              <Star className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} />
            </button>
            <button 
              onClick={() => setIsShareModalOpen(true)}
              className="text-gray-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5" 
              title="Share (⌘⇧S)"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div id="calculator-content" className="p-6 md:p-8 dark:bg-gray-800">
          {children}
        </div>
      </div>

      {(explanation || meta.formulaMarkup || (meta.sources && meta.sources.length > 0)) && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <Info className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Formula & Methodology</h2>
            </div>
            
            <div className="prose prose-blue dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
              {meta.quickDefinition && (
                <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border-l-4 border-blue-600 mb-8 italic text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  {meta.quickDefinition}
                </div>
              )}

              {meta.formulaMarkup && (
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-700 mb-6 font-mono text-sm overflow-x-auto text-center md:text-left">
                  {meta.formulaMarkup}
                </div>
              )}

              {meta.formulaVariables && meta.formulaVariables.length > 0 && (
                <div className="mb-8 overflow-hidden rounded-xl border border-gray-100 dark:border-gray-700">
                  <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-700 m-0">
                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Symbol</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Definition</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                      {meta.formulaVariables.map((v, i) => (
                        <tr key={i}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600 dark:text-blue-400">{v.symbol}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{v.meaning}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {explanation}
            </div>

            {meta.tableData && (
              <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      {meta.tableData.headers.map((header, i) => (
                        <th 
                          key={i} 
                          className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                    {meta.tableData.rows.map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        {row.map((cell, j) => (
                          <td key={j} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {meta.sources && meta.sources.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <LinkIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  References & Sources
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 m-0 p-0 list-none text-sm">
                  {meta.sources.map((source, index) => (
                    <li key={index}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium truncate"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0"></div>
                        {source.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {meta.workedExamples && meta.workedExamples.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
            <LinkIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Practical Examples
          </h2>
          <div className="space-y-6">
            {meta.workedExamples.map((example, i) => (
              <div key={i} className="bg-blue-50/50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-3">{example.title}</h3>
                <div className="prose prose-sm prose-blue dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
                  {example.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {meta.longContent && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8 p-6 md:p-8">
          <div className="flex items-center gap-2 mb-8 pb-4 border-b border-gray-100 dark:border-gray-700">
            <div className="w-2 h-8 bg-blue-600 rounded-full" />
            <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Comprehensive Guide</h2>
          </div>
          <article className="prose prose-blue dark:prose-invert max-w-none text-gray-1000 dark:text-gray-300 prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:leading-relaxed prose-p:text-lg">
            {meta.longContent}
          </article>
        </div>
      )}

      {dynamicComparison ? (
        <ComparisonSection comparison={dynamicComparison} currentCalculatorId={meta.id} />
      ) : comparison && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-8">
              <Scale className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">{comparison.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {comparison.points.map((point, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800">
                  <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-2 h-8 bg-blue-600 rounded-full" />
                    {point.title}
                  </h3>
                  <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                    {point.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {((faq && faq.length > 0) || (meta.faq && meta.faq.length > 0)) && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            {(faq || meta.faq || []).map((item, index) => (
              <div key={index} className="border-b border-gray-100 dark:border-gray-700 pb-6 last:border-0 last:pb-0">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.question}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.answer}</p>
              </div>
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
                to={`/${calc.id}-calculator`}
                className="p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md hover:border-blue-200 transition-all"
              >
                <h3 className="font-bold text-gray-900 mb-1">{calc.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{calc.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <ReviewSection calculatorId={meta.id} />
      
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
