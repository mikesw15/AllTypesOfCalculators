import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Calculator, User, LogOut } from 'lucide-react';
import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import CurrencySelector from './CurrencySelector';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(auth.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <Calculator className="h-8 w-8 text-blue-600" />
                <span className="font-bold text-xl tracking-tight hidden sm:block">AllTypesOfCalculators</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium">Home</Link>
              <Link to="/categories" className="text-gray-600 hover:text-gray-900 font-medium">Categories</Link>
              <Link to="/favorites" className="text-gray-600 hover:text-gray-900 font-medium">Favorites</Link>
              
              <CurrencySelector />

              {user ? (
                <div className="flex items-center gap-4">
                  <Link to="/account" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
                    ) : (
                      <User className="w-5 h-5 text-gray-600" />
                    )}
                    <span className="text-sm font-medium text-gray-700">{user.displayName?.split(' ')[0]}</span>
                  </Link>
                  <button onClick={handleLogout} className="text-gray-500 hover:text-gray-700">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleLogin}
                  className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-4 space-y-1">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Home</Link>
            <Link to="/categories" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Categories</Link>
            <Link to="/favorites" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Favorites</Link>
            {user ? (
              <>
                <Link to="/account" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">My Account</Link>
                <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-50">Sign Out</button>
              </>
            ) : (
              <button onClick={handleLogin} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Sign In</button>
            )}
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <Calculator className="h-6 w-6 text-blue-600" />
                <span className="font-bold text-lg">AllTypesOfCalculators</span>
              </Link>
              <p className="text-gray-500 text-sm max-w-md">
                Fast, accurate, and easy-to-use tools for finance, health, math, and everyday life.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link to="/categories#finance" className="hover:text-blue-600">Finance & Money</Link></li>
                <li><Link to="/categories#health" className="hover:text-blue-600">Health & Fitness</Link></li>
                <li><Link to="/categories#math" className="hover:text-blue-600">Math & Science</Link></li>
                <li><Link to="/categories#everyday" className="hover:text-blue-600">Everyday Life</Link></li>
                <li><Link to="/categories#home" className="hover:text-blue-600">Home Improvement</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link to="/about" className="hover:text-blue-600">About Us</Link></li>
                <li><Link to="/privacy" className="hover:text-blue-600">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-blue-600">Terms of Service</Link></li>
                <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} AllTypesOfCalculators.com. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
