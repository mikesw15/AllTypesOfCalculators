import React, { useState } from 'react';
import { X, Copy, Mail, Twitter, Facebook, Linkedin, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  resultText?: string;
}

export default function ShareModal({ isOpen, onClose, title, url, resultText }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const defaultShareText = `Check out this ${title}`;
  const shareText = resultText ? `${resultText}\n\nCheck it out here: ` : defaultShareText;
  const encodedText = encodeURIComponent(resultText ? resultText : defaultShareText);

  const handleCopy = async () => {
    try {
      const copyContent = resultText ? `${resultText}\n\n${url}` : url;
      await navigator.clipboard.writeText(copyContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodedText}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent((resultText ? resultText + '\n\n' : '') + 'I thought you might find this useful: ' + url)}`
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/50 backdrop-blur-sm px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Share Calculator</h2>

          <div className="flex justify-center gap-4 mb-8">
            <a 
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-blue-50 text-blue-500 rounded-full hover:bg-blue-100 transition-colors"
              title="Share on Twitter"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a 
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              title="Share on Facebook"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a 
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
              title="Share on LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href={shareLinks.email}
              className="p-3 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
              title="Share via Email"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Page Link
            </label>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                readOnly 
                value={url}
                className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-600 dark:text-gray-400 outline-none"
              />
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
