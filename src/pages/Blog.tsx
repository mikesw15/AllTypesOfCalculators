import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import SEO from '../components/SEO';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image: string;
  authorName: string;
  createdAt: any;
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'posts'),
        where('published', '==', true),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Post[];
      setPosts(postsData);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <SEO 
        title="Blog & Resources | All-in-One Calculators"
        description="Helpful guides, financial tips, and how-tos for your daily calculations."
      />
      
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-gray-900 mb-4 flex items-center justify-center gap-3">
          <BookOpen className="w-10 h-10 text-blue-600" />
          The Log
        </h1>
        <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
          Insights, guides, and tips to help you make sense of the numbers.
        </p>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border-2 border-gray-100">
          <p className="text-gray-500 font-bold text-xl">No posts published yet. Stay tuned!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-blue-100 transition-all group flex flex-col h-full"
            >
              <Link to={`/blog/${post.slug}`} className="block relative overflow-hidden h-48 bg-gray-100">
                {post.image ? (
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <BookOpen className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="bg-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-blue-600 shadow-sm">
                    {post.category}
                  </span>
                </div>
              </Link>
              
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.createdAt?.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {post.authorName}
                  </span>
                </div>
                
                <h2 className="text-2xl font-black text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                
                <p className="text-gray-500 font-medium mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto">
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-blue-600 font-black hover:gap-4 transition-all"
                  >
                    Read Story
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
}
