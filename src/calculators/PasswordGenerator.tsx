import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, ShieldCheck, ShieldAlert, Shield, Save, Check } from 'lucide-react';
import { auth, db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate, useLocation } from 'react-router-dom';
import { useHistory } from '../contexts/HistoryContext';
import { handleFirestoreError, OperationType } from '../utils/firestoreErrors';

export default function PasswordGenerator() {
  const { saveToHistory } = useHistory();
  const navigate = useNavigate();
  const location = useLocation();
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveLabel, setSaveLabel] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [strength, setStrength] = useState({ label: '', color: '', width: '0%', entropy: 0 });

  const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  };

  const ambiguous = '0O1lI';

  const getSecureRandom = (max: number) => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
  };

  const calculateStrength = (pwd: string, poolSize: number) => {
    if (!pwd) {
      setStrength({ label: '', color: 'bg-gray-200', width: '0%', entropy: 0 });
      return;
    }

    const entropy = pwd.length * Math.log2(poolSize);
    
    if (entropy < 50) {
      setStrength({ label: 'Weak', color: 'bg-red-500', width: '25%', entropy });
    } else if (entropy < 80) {
      setStrength({ label: 'Medium', color: 'bg-yellow-500', width: '50%', entropy });
    } else if (entropy < 120) {
      setStrength({ label: 'Strong', color: 'bg-green-500', width: '75%', entropy });
    } else {
      setStrength({ label: 'Very Strong', color: 'bg-blue-500', width: '100%', entropy });
    }
  };

  const generate = () => {
    if (!uppercase && !lowercase && !numbers && !symbols) {
      setPassword('');
      calculateStrength('', 0);
      return;
    }

    let pool = '';
    let requiredChars: string[] = [];

    const addChars = (chars: string) => {
      let finalChars = chars;
      if (excludeAmbiguous) {
        finalChars = chars.split('').filter(c => !ambiguous.includes(c)).join('');
      }
      if (finalChars.length > 0) {
        pool += finalChars;
        requiredChars.push(finalChars[getSecureRandom(finalChars.length)]);
      }
    };

    if (uppercase) addChars(charSets.uppercase);
    if (lowercase) addChars(charSets.lowercase);
    if (numbers) addChars(charSets.numbers);
    if (symbols) {
      pool += charSets.symbols;
      requiredChars.push(charSets.symbols[getSecureRandom(charSets.symbols.length)]);
    }

    if (pool.length === 0) return;

    let result = requiredChars.join('');
    for (let i = requiredChars.length; i < length; i++) {
      result += pool[getSecureRandom(pool.length)];
    }

    // Shuffle
    result = result.split('').sort(() => getSecureRandom(2) - 0.5).join('');
    
    setPassword(result);
    calculateStrength(result, pool.length);

    setHistory(prev => {
      const newHistory = [result, ...prev.filter(p => p !== result)].slice(0, 5);
      return newHistory;
    });

    // Debounce history saving to 1 second
    const timeoutId = setTimeout(() => {
      saveToHistory('password-generator', 'Password Generator', 
        { length, uppercase, lowercase, numbers, symbols, excludeAmbiguous }, 
        { strength: strength.label }
      );
    }, 1000);

    return () => clearTimeout(timeoutId);
  };

  useEffect(() => {
    const cleanup = generate();
    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, [length, uppercase, lowercase, numbers, symbols, excludeAmbiguous]);

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSavePassword = async () => {
    if (!password) return;
    
    let currentUser = auth.currentUser;
    if (!currentUser) {
      navigate('/login', { state: { from: location } });
      return;
    }

    if (currentUser) {
      setIsSaving(true);
      const path = `users/${currentUser.uid}/saved_passwords`;
      try {
        await addDoc(collection(db, path), {
          password: password,
          label: saveLabel.trim(),
          createdAt: serverTimestamp()
        });
        setSaveSuccess(true);
        setSaveLabel('');
        setTimeout(() => setSaveSuccess(false), 3000);
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, path);
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
        
        {/* Password Display */}
        <div className="relative mb-6">
          <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 md:p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4 min-h-[60px]">
              <div className="font-mono text-xl md:text-2xl text-gray-900 break-all font-bold tracking-wider">
                {password || <span className="text-gray-400 font-normal text-base">Select options to generate</span>}
              </div>
              <div className="flex gap-2 shrink-0">
                <button 
                  onClick={generate}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Generate New"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => copyToClipboard(password)}
                  disabled={!password}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    copied 
                      ? 'bg-green-500 text-white' 
                      : 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  <Copy className="w-4 h-4" />
                  <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
              <input 
                type="text" 
                placeholder="What is this password for? (e.g. Gmail)"
                value={saveLabel}
                onChange={(e) => setSaveLabel(e.target.value)}
                className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                maxLength={50}
              />
              <button 
                onClick={handleSavePassword}
                disabled={!password || isSaving || saveSuccess}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all shrink-0 ${
                  saveSuccess 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
                title="Save to Account"
              >
                {saveSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                <span>{saveSuccess ? 'Saved!' : isSaving ? 'Saving...' : 'Save'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Strength Meter */}
        <div className="mb-8">
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-2">
            <div 
              className={`h-full transition-all duration-500 ${strength.color}`}
              style={{ width: strength.width }}
            />
          </div>
          <div className="flex justify-between items-center text-sm">
            <div className={`font-bold flex items-center gap-1 ${strength.color.replace('bg-', 'text-')}`}>
              {strength.label === 'Weak' && <ShieldAlert className="w-4 h-4" />}
              {strength.label === 'Medium' && <Shield className="w-4 h-4" />}
              {(strength.label === 'Strong' || strength.label === 'Very Strong') && <ShieldCheck className="w-4 h-4" />}
              {strength.label} Password
            </div>
            {strength.entropy > 0 && (
              <div className="text-gray-500 italic">
                Entropy: {Math.round(strength.entropy)} bits
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="font-bold text-gray-900">Password Length</label>
              <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg font-bold">
                {length}
              </div>
            </div>
            <input 
              type="range" 
              min="6" 
              max="64" 
              value={length} 
              onChange={(e) => setLength(Number(e.target.value))} 
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-colors ${uppercase ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
              <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 mr-3" />
              <span className="text-xl mr-2">🔠</span>
              <span className="font-medium text-gray-900">Uppercase (A-Z)</span>
            </label>
            <label className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-colors ${lowercase ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
              <input type="checkbox" checked={lowercase} onChange={(e) => setLowercase(e.target.checked)} className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 mr-3" />
              <span className="text-xl mr-2">🔡</span>
              <span className="font-medium text-gray-900">Lowercase (a-z)</span>
            </label>
            <label className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-colors ${numbers ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
              <input type="checkbox" checked={numbers} onChange={(e) => setNumbers(e.target.checked)} className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 mr-3" />
              <span className="text-xl mr-2">🔢</span>
              <span className="font-medium text-gray-900">Numbers (0-9)</span>
            </label>
            <label className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-colors ${symbols ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
              <input type="checkbox" checked={symbols} onChange={(e) => setSymbols(e.target.checked)} className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 mr-3" />
              <span className="text-xl mr-2">⚡</span>
              <span className="font-medium text-gray-900">Symbols (!@#$)</span>
            </label>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" checked={excludeAmbiguous} onChange={(e) => setExcludeAmbiguous(e.target.checked)} className="w-5 h-5 text-yellow-600 rounded focus:ring-yellow-500 mr-3" />
              <span className="text-sm font-medium text-yellow-800">Exclude ambiguous characters (0, O, 1, l, I)</span>
            </label>
          </div>

          <button 
            onClick={generate}
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg mt-4"
          >
            Generate Password
          </button>
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900 uppercase tracking-wider text-sm">Recent Passwords</h3>
            <button onClick={() => setHistory([])} className="text-sm text-gray-500 hover:text-red-600 transition-colors">
              Clear History
            </button>
          </div>
          <div className="space-y-2">
            {history.map((pwd, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg group">
                <span className="font-mono text-sm text-gray-600 truncate mr-4">{pwd}</span>
                <button 
                  onClick={() => copyToClipboard(pwd)}
                  className="text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity hover:underline shrink-0"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
