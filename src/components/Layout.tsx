import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Calculator, User, LogOut, Sun, Moon as MoonIcon, Ruler } from 'lucide-react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import CurrencySelector from './CurrencySelector';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useUnit } from '../contexts/UnitContext';
import SearchModal from './SearchModal';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user } = useAuth();
  const { theme, setTheme, isDark } = useTheme();
  const { unit, toggleUnit } = useUnit();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-gray-50' : 'bg-gray-50 text-gray-900'} font-sans flex flex-col`}>
      <header className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <Calculator className="h-8 w-8 text-blue-600" />
                <span className="font-bold text-xl tracking-tight hidden sm:block">AllTypesOfCalculators</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} font-medium`}>Home</Link>
              <Link to="/categories" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} font-medium`}>Categories</Link>
              <Link to="/favorites" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} font-medium`}>Favorites</Link>
              
              <button 
                onClick={() => setIsSearchOpen(true)}
                className={`flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-gray-200 bg-gray-800 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200'} px-3 py-1.5 rounded-lg transition-colors`}
                aria-label="Search calculators"
              >
                <Search className="w-4 h-4" />
                <span className="text-sm font-medium hidden lg:block">Search...</span>
                <kbd className={`hidden lg:inline-flex items-center gap-1 text-[10px] ${isDark ? 'bg-gray-700 text-gray-400 border-gray-600' : 'bg-white text-gray-500 border-gray-200'} border rounded px-1.5 py-0.5 ml-2 font-sans font-medium`}>
                  <span className="text-[12px]">⌘</span> K
                </kbd>
              </button>

              <div className="flex items-center gap-4">
                <button 
                  onClick={toggleUnit}
                  className={`p-2 rounded-full text-xs font-bold leading-none ${isDark ? 'text-gray-400 hover:text-gray-200 bg-gray-800 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200'} transition-colors uppercase`}
                  aria-label="Toggle Unit System"
                  title="Toggle Metric / Imperial"
                >
                  {unit === 'metric' ? 'MET' : 'IMP'}
                </button>
                <button 
                  onClick={() => setTheme(isDark ? 'light' : 'dark')}
                  className={`p-2 rounded-full ${isDark ? 'text-gray-400 hover:text-gray-200 bg-gray-800 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200'} transition-colors`}
                  aria-label="Toggle theme"
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                </button>
                <CurrencySelector />
              </div>

              {user ? (
                <div className="flex items-center gap-4">
                  <Link to="/account" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
                    ) : (
                      <User className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                    )}
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{user.displayName?.split(' ')[0]}</span>
                  </Link>
                  <button onClick={handleLogout} className={`${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login"
                  className={`${isDark ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800'} px-4 py-2 rounded-lg font-medium transition-colors`}
                >
                  Sign In
                </Link>
              )}
            </div>

            <div className="md:hidden flex items-center gap-3">
              <button 
                onClick={toggleUnit}
                className={`p-1.5 rounded-md text-xs font-bold leading-none ${isDark ? 'text-gray-400 hover:text-gray-200 bg-gray-800 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200'} transition-colors uppercase`}
                aria-label="Toggle Unit System"
              >
                {unit === 'metric' ? 'MET' : 'IMP'}
              </button>
              <button 
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className={`p-1.5 rounded-md ${isDark ? 'text-gray-400 hover:text-gray-200 bg-gray-800 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200'} transition-colors`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
              </button>
              <div className="scale-90 origin-right">
                <CurrencySelector />
              </div>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className={`md:hidden ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b px-4 pt-2 pb-4 space-y-1`}>
            <Link to="/" className={`block px-3 py-2 rounded-md text-base font-medium ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'}`}>Home</Link>
            <Link to="/categories" className={`block px-3 py-2 rounded-md text-base font-medium ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'}`}>Categories</Link>
            <Link to="/favorites" className={`block px-3 py-2 rounded-md text-base font-medium ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'}`}>Favorites</Link>
            {user ? (
              <>
                <Link to="/account" className={`block px-3 py-2 rounded-md text-base font-medium ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'}`}>My Account</Link>
                <button onClick={handleLogout} className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}>Sign Out</button>
              </>
            ) : (
              <Link to="/login" className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'}`}>Sign In</Link>
            )}
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-t mt-auto`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <Calculator className="h-6 w-6 text-blue-600" />
                <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>AllTypesOfCalculators</span>
              </Link>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm max-w-md`}>
                Fast, accurate, and easy-to-use tools for finance, health, math, and everyday life.
              </p>
            </div>
            <div>
              <h3 className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'} mb-4`}>Categories</h3>
              <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <li><Link to="/categories#finance" className="hover:text-blue-600">Finance & Money</Link></li>
                <li><Link to="/categories#health" className="hover:text-blue-600">Health & Fitness</Link></li>
                <li><Link to="/categories#math" className="hover:text-blue-600">Math & Science</Link></li>
                <li><Link to="/categories#everyday" className="hover:text-blue-600">Everyday Life</Link></li>
                <li><Link to="/categories#home" className="hover:text-blue-600">Home Improvement</Link></li>
                <li><Link to="/categories#fun" className="hover:text-blue-600">Fun & Niche</Link></li>
              </ul>
            </div>
            <div>
              <h3 className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'} mb-4`}>Legal</h3>
              <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <li><Link to="/about" className="hover:text-blue-600">About Us</Link></li>
                <li><Link to="/privacy" className="hover:text-blue-600">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-blue-600">Terms of Service</Link></li>
                <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className={`${isDark ? 'border-gray-800 text-gray-500' : 'border-gray-200 text-gray-400'} border-t mt-8 pt-8 text-center text-sm`}>
            &copy; {new Date().getFullYear()} AllTypesOfCalculators.com. All rights reserved.
          </div>
        </div>
      </footer>

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </div>
  );
}
