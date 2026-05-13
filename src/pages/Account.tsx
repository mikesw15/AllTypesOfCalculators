import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, query, getDocs, limit } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { User, Mail, Calendar as CalendarIcon, LogOut, Star, Settings, Shield, ChevronRight, Calculator, Key, Copy, History, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import { useAuth } from '../contexts/AuthContext';

interface SavedPassword {
  id: string;
  password: string;
  label?: string;
  createdAt: any;
}

interface HistoryItem {
  id: string;
  calculatorId: string;
  calculatorTitle: string;
  profileName?: string;
  results: any;
  timestamp: any;
}

export default function Account() {
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [savedPasswords, setSavedPasswords] = useState<SavedPassword[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        // Fetch favorites count
        const favQ = query(collection(db, `users/${user.uid}/favorites`));
        const favSnapshot = await getDocs(favQ);
        setFavoritesCount(favSnapshot.size);

        // Fetch saved passwords
        const pwdQ = query(collection(db, `users/${user.uid}/saved_passwords`));
        const pwdSnapshot = await getDocs(pwdQ);
        const pwds: SavedPassword[] = [];
        pwdSnapshot.forEach(doc => {
          pwds.push({ id: doc.id, ...doc.data() } as SavedPassword);
        });
        
        pwds.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
        setSavedPasswords(pwds.slice(0, 5));

        // Fetch history
        const historyQ = query(collection(db, `users/${user.uid}/history`));
        const historySnapshot = await getDocs(historyQ);
        const historyItems: HistoryItem[] = [];
        historySnapshot.forEach(doc => {
          historyItems.push({ id: doc.id, ...doc.data() } as HistoryItem);
        });

        historyItems.sort((a, b) => (b.timestamp?.toMillis?.() || 0) - (a.timestamp?.toMillis?.() || 0));
        setHistory(historyItems.slice(0, 10));
      } catch (error) {
        console.error("Error fetching account data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO title="My Account | AllTypesOfCalculators" description="Manage your account, view saved favorites, and access your generated passwords." keywords={['my account', 'saved calculators', 'account settings', 'history', 'saved passwords']} />
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 text-center">
            <div className="relative inline-block mb-4">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName || 'User'} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mx-auto"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center border-4 border-white shadow-md mx-auto">
                  <User className="w-10 h-10 text-blue-600" />
                </div>
              )}
            </div>
            <h2 className="text-xl font-bold text-gray-900">{user.displayName || 'User'}</h2>
            <p className="text-gray-500 text-sm mb-6">{user.email}</p>
            
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-medium transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Account Info</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-5 h-5 text-gray-400" />
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Email Status</p>
                  <p>{user.emailVerified ? 'Verified' : 'Unverified'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <CalendarIcon className="w-5 h-5 text-gray-400" />
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Joined</p>
                  <p>{user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Unknown'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Shield className="w-5 h-5 text-gray-400" />
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Provider</p>
                  <p className="capitalize">{user.providerData[0]?.providerId.split('.')[0] || 'Email'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <Star className="w-6 h-6 text-yellow-500" />
                </div>
                <h3 className="font-bold text-gray-900">Saved Favorites</h3>
              </div>
              <div className="text-3xl font-extrabold text-blue-600">
                {loading ? '-' : favoritesCount}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Settings className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="font-bold text-gray-900">Preferences</h3>
              </div>
              <div className="text-sm text-gray-500 mt-2">
                Manage your settings
              </div>
            </div>
          </div>

          {/* Calculation History */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <History className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Recent Calculations</h3>
              </div>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="text-center text-gray-500 py-4">Loading history...</div>
              ) : history.length > 0 ? (
                <div className="space-y-4">
                  {history.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div>
                        <h4 className="font-bold text-gray-900 flex items-center gap-2">
                          {item.calculatorTitle}
                          {item.profileName && (
                            <span className="bg-blue-100 text-blue-800 text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full">
                              {item.profileName}
                            </span>
                          )}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <Clock className="w-3 h-3" />
                          {item.timestamp?.toDate ? item.timestamp.toDate().toLocaleString() : 'Just now'}
                        </div>
                      </div>
                      <Link 
                        to={`/${item.calculatorId}-calculator`}
                        className="text-sm font-bold text-blue-600 hover:text-blue-700"
                      >
                        Reuse
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">No calculation history yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* Saved Passwords */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Key className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Saved Passwords</h3>
              </div>
              <Link to="/password-generator-calculator" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Generate New
              </Link>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="text-center text-gray-500 py-4">Loading passwords...</div>
              ) : savedPasswords.length > 0 ? (
                <div className="space-y-3">
                  {savedPasswords.map((pwd) => (
                    <div key={pwd.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100 group">
                      <div className="flex flex-col mr-4 overflow-hidden">
                        {pwd.label && (
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 truncate">
                            {pwd.label}
                          </span>
                        )}
                        <span className="font-mono text-gray-800 font-medium tracking-wider truncate">
                          {pwd.password}
                        </span>
                      </div>
                      <button 
                        onClick={() => copyToClipboard(pwd.password, pwd.id)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors shrink-0 ${
                          copiedId === pwd.id 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 shadow-sm'
                        }`}
                      >
                        <Copy className="w-4 h-4" />
                        {copiedId === pwd.id ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500 mb-4">You haven't saved any passwords yet.</p>
                  <Link 
                    to="/password-generator-calculator" 
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Go to Password Generator
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-lg">Quick Actions</h3>
            </div>
            <div className="divide-y divide-gray-100">
              <Link to="/favorites" className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                    <Star className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">View Favorites</h4>
                    <p className="text-sm text-gray-500">Access your saved calculators</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </Link>
              
              <Link to="/categories" className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-colors">
                    <Calculator className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Browse All Calculators</h4>
                    <p className="text-sm text-gray-500">Discover new tools to use</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
