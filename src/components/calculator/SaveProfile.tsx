import React, { useState } from 'react';
import { Bookmark, Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from '../../contexts/HistoryContext';

interface SaveProfileProps {
  calculatorId: string;
  calculatorTitle: string;
  inputs: any;
  results: any;
}

export default function SaveProfile({ calculatorId, calculatorTitle, inputs, results }: SaveProfileProps) {
  const { user } = useAuth();
  const { saveProfile } = useHistory();
  const [profileName, setProfileName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!user) return null;

  const handleSave = async () => {
    if (!profileName.trim()) return;
    setIsSaving(true);
    await saveProfile(calculatorId, calculatorTitle, profileName.trim(), inputs, results);
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setProfileName('');
    }, 3000);
  };

  return (
    <div className="bg-white border text-sm border-gray-200 p-4 rounded-xl shadow-sm mt-4">
      <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
        <Bookmark className="w-4 h-4 text-blue-500" />
        Save as Profile
      </h3>
      <div className="flex gap-2">
        <input 
          type="text" 
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
          placeholder="e.g. My 2024 Taxes"
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-medium text-sm"
        />
        <button
          onClick={handleSave}
          disabled={!profileName.trim() || isSaving || saved}
          className={`px-4 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 ${saved ? 'bg-green-100 text-green-700' : 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'}`}
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              Saved!
            </>
          ) : (
            'Save'
          )}
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2">Saved profiles will appear in your Account history.</p>
    </div>
  );
}
