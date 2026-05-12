import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Calendar, User, ArrowLeft, Clock, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import SEO from '../components/SEO';

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  image: string;
  authorName: string;
  createdAt: any;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    if (!slug) return;
    setLoading(true);
    try {
      const q = query(collection(db, 'posts'), where('slug', '==', slug), where('published', '==', true));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        setPost({ id: doc.id, ...doc.data() } as Post);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-black text-gray-900 mb-4">Post Not Found</h1>
        <p className="text-gray-500 font-medium mb-8">The article you're looking for doesn't exist or has been removed.</p>
        <Link to="/blog" className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold inline-flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <SEO 
        title={`${post.title} | Blog`}
        description={post.content.replace(/<[^>]*>/g, '').substring(0, 160)}
      />

      <Link 
        to="/blog" 
        className="inline-flex items-center gap-2 text-gray-500 font-bold hover:text-blue-600 transition-colors mb-12 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to all posts
      </Link>

      <article>
        <header className="mb-12">
          <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-wider mb-6 inline-block">
            {post.category}
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-500 font-bold border-b-2 border-gray-50 pb-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <User className="w-5 h-5" />
              </div>
              <span>{post.authorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{post.createdAt?.toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </header>

        {post.image && (
          <div className="rounded-3xl overflow-hidden mb-12 shadow-2xl shadow-blue-100">
            <img src={post.image} alt={post.title} className="w-full h-auto" />
          </div>
        )}

        <div 
          className="prose prose-xl prose-blue max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:font-medium prose-p:text-gray-600 prose-img:rounded-3xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className="mt-16 pt-12 border-t-2 border-gray-50 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-4">
             <button className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-2xl font-bold transition-all">
               <Share2 className="w-5 h-5" />
               Share Post
             </button>
          </div>
          <Link 
            to="/blog" 
            className="text-blue-600 font-black flex items-center gap-2 hover:gap-4 transition-all"
          >
            More Articles
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
        </footer>
      </article>
    </div>
  );
}
