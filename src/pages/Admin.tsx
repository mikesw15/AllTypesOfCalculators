import React, { useState, useEffect, useRef } from 'react';
import { collection, query, orderBy, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, handleFirestoreError, OperationType } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Edit2, Trash2, Save, X, LayoutDashboard, FileText, Image as ImageIcon, CheckCircle, Clock, Upload, AlertCircle, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  image: string;
  published: boolean;
  createdAt: any;
  updatedAt: any;
}

export default function Admin() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<Post> | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isCheckingSlug, setIsCheckingSlug] = useState(false);
  const [slugStatus, setSlugStatus] = useState<'idle' | 'checking' | 'available' | 'unavailable'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const slugCheckTimeout = useRef<NodeJS.Timeout | null>(null);

  const checkSlugAvailability = async (slug: string) => {
    if (!slug || slug === currentPost?.slug && currentPost.id) {
      setSlugStatus('idle');
      return;
    }

    setIsCheckingSlug(true);
    setSlugStatus('checking');

    try {
      const q = query(
        collection(db, 'posts'),
        where('slug', '==', slug)
      );
      const querySnapshot = await getDocs(q);
      const exists = querySnapshot.docs.some(d => d.id !== currentPost?.id);
      
      if (exists) {
        setSlugStatus('unavailable');
        setValidationErrors(prev => ({ ...prev, slug: 'This slug is already in use' }));
      } else {
        setSlugStatus('available');
        setValidationErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.slug;
          return newErrors;
        });
      }
    } catch (error) {
      console.error('Error checking slug:', error);
    } finally {
      setIsCheckingSlug(false);
    }
  };

  useEffect(() => {
    if (slugCheckTimeout.current) clearTimeout(slugCheckTimeout.current);
    
    if (currentPost?.slug) {
      slugCheckTimeout.current = setTimeout(() => {
        checkSlugAvailability(currentPost.slug!);
      }, 500);
    } else {
      setSlugStatus('idle');
    }

    return () => {
      if (slugCheckTimeout.current) clearTimeout(slugCheckTimeout.current);
    };
  }, [currentPost?.slug]);

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
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

  const handleEdit = (post: Post) => {
    setCurrentPost(post);
    setIsEditing(true);
    setValidationErrors({});
  };

  const handleAddNew = () => {
    setCurrentPost({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      category: 'General',
      image: '',
      published: false
    });
    setIsEditing(true);
    setValidationErrors({});
  };

  const validateForm = async () => {
    const errors: Record<string, string> = {};
    if (!currentPost?.title?.trim()) errors.title = 'Title is required';
    if (!currentPost?.slug?.trim()) errors.slug = 'Slug is required';
    if (!currentPost?.content?.trim()) errors.content = 'Content is required';
    if (!currentPost?.excerpt?.trim()) errors.excerpt = 'Excerpt is required';

    // Check for duplicate slug
    if (currentPost?.slug) {
      const q = query(
        collection(db, 'posts'),
        where('slug', '==', currentPost.slug)
      );
      const querySnapshot = await getDocs(q);
      const duplicate = querySnapshot.docs.find(d => d.id !== currentPost.id);
      if (duplicate) {
        errors.slug = 'This slug is already in use';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image must be under 5MB');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const storageRef = ref(storage, `blog/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setCurrentPost({ ...currentPost, image: downloadURL });
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPost || !user) return;

    const isValid = await validateForm();
    if (!isValid) return;

    // Destructure to separate the ID and the editable data
    const { 
      id, 
      createdAt, 
      authorId, 
      authorName, 
      updatedAt, 
      ...editableData 
    } = currentPost as any;
    
    // Construct the payload with only allowed and necessary fields
    const payload = {
      title: editableData.title || '',
      slug: editableData.slug || '',
      content: editableData.content || '',
      excerpt: editableData.excerpt || '',
      category: editableData.category || 'General',
      image: editableData.image || '',
      published: !!editableData.published,
      updatedAt: serverTimestamp()
    };

    try {
      setLoading(true);
      if (id) {
        // Update
        const postRef = doc(db, 'posts', id);
        await updateDoc(postRef, payload);
      } else {
        // Create
        await addDoc(collection(db, 'posts'), {
          ...payload,
          authorId: user.uid,
          authorName: user.displayName || 'Admin',
          createdAt: serverTimestamp(),
        });
      }
      setIsEditing(false);
      setCurrentPost(null);
      fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
      handleFirestoreError(error, id ? OperationType.UPDATE : OperationType.CREATE, id ? `posts/${id}` : 'posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await deleteDoc(doc(db, 'posts', id));
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      handleFirestoreError(error, OperationType.DELETE, `posts/${id}`);
    }
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 flex items-center gap-2">
            <LayoutDashboard className="w-8 h-8 text-blue-600" />
            Admin Panel
          </h1>
          <p className="text-gray-500 font-medium">Manage your blog content</p>
        </div>
        {!isEditing && (
          <button
            onClick={handleAddNew}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-200"
          >
            <Plus className="w-5 h-5" />
            Add New Post
          </button>
        )}
      </div>

      {isEditing ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 border-4 border-gray-100 shadow-xl"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-gray-900">
              {currentPost?.id ? 'Edit Post' : 'New Post'}
            </h2>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-black text-gray-700 uppercase tracking-wider mb-2">Title</label>
                  <input
                    type="text"
                    required
                    value={currentPost?.title || ''}
                    onChange={(e) => {
                      const title = e.target.value;
                      setCurrentPost({ ...currentPost, title, slug: generateSlug(title) });
                      if (validationErrors.title) {
                        const newErrors = { ...validationErrors };
                        delete newErrors.title;
                        setValidationErrors(newErrors);
                      }
                    }}
                    className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-3 font-medium focus:border-blue-500 focus:bg-white outline-none transition-all ${validationErrors.title ? 'border-red-500' : 'border-gray-100'}`}
                    placeholder="Enter post title"
                  />
                  {validationErrors.title && <p className="text-red-500 text-xs font-bold mt-1">{validationErrors.title}</p>}
                </div>
                <div>
                  <label className="block text-sm font-black text-gray-700 uppercase tracking-wider mb-2">Slug</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={currentPost?.slug || ''}
                      onChange={(e) => {
                        setCurrentPost({ ...currentPost, slug: e.target.value });
                        if (validationErrors.slug) {
                          const newErrors = { ...validationErrors };
                          delete newErrors.slug;
                          setValidationErrors(newErrors);
                        }
                      }}
                      className={`w-full bg-gray-50 border-2 rounded-xl pl-4 pr-10 py-3 font-medium focus:border-blue-500 focus:bg-white outline-none transition-all ${validationErrors.slug ? 'border-red-500' : 'border-gray-100'}`}
                      placeholder="post-slug"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {isCheckingSlug ? (
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      ) : slugStatus === 'available' ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : slugStatus === 'unavailable' ? (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      ) : null}
                    </div>
                  </div>
                  {validationErrors.slug && <p className="text-red-500 text-xs font-bold mt-1">{validationErrors.slug}</p>}
                </div>
                <div>
                  <label className="block text-sm font-black text-gray-700 uppercase tracking-wider mb-2">Category</label>
                  <select
                    value={currentPost?.category || 'General'}
                    onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value })}
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 font-medium focus:border-blue-500 focus:bg-white outline-none transition-all"
                  >
                    <option value="General">General</option>
                    <option value="Guides">Guides</option>
                    <option value="Finance">Finance</option>
                    <option value="Calculators">Calculators</option>
                    <option value="Taxes">Taxes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-black text-gray-700 uppercase tracking-wider mb-2">Featured Image</label>
                  <div className="space-y-4">
                    {currentPost?.image && (
                      <div className="relative w-full h-40 rounded-xl overflow-hidden group">
                        <img src={currentPost.image} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setCurrentPost({ ...currentPost, image: '' })}
                          className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="flex-1 bg-blue-50 border-2 border-dashed border-blue-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-blue-100 transition-all text-blue-600 disabled:opacity-50"
                      >
                        {isUploading ? (
                          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Upload className="w-6 h-6" />
                            <span className="text-xs font-black uppercase tracking-wider">Upload Image</span>
                          </>
                        )}
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <div className="flex-[2]">
                        <input
                          type="url"
                          value={currentPost?.image || ''}
                          onChange={(e) => setCurrentPost({ ...currentPost, image: e.target.value })}
                          className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 font-medium focus:border-blue-500 focus:bg-white outline-none transition-all h-full"
                          placeholder="Or paste URL..."
                        />
                      </div>
                    </div>
                    {uploadError && (
                      <p className="text-red-500 text-xs font-bold flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {uploadError}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-black text-gray-700 uppercase tracking-wider mb-2">Excerpt</label>
                  <textarea
                    rows={3}
                    value={currentPost?.excerpt || ''}
                    onChange={(e) => {
                      setCurrentPost({ ...currentPost, excerpt: e.target.value });
                      if (validationErrors.excerpt) {
                        const newErrors = { ...validationErrors };
                        delete newErrors.excerpt;
                        setValidationErrors(newErrors);
                      }
                    }}
                    className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-3 font-medium focus:border-blue-500 focus:bg-white outline-none transition-all resize-none ${validationErrors.excerpt ? 'border-red-500' : 'border-gray-100'}`}
                    placeholder="Short summary of the post (suggested 150-200 chars)"
                  />
                  {validationErrors.excerpt && <p className="text-red-500 text-xs font-bold mt-1">{validationErrors.excerpt}</p>}
                </div>
                <div>
                  <label className="block text-sm font-black text-gray-700 uppercase tracking-wider mb-2">Status</label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setCurrentPost({ ...currentPost, published: true })}
                      className={`flex-1 py-3 px-4 rounded-xl font-bold border-2 transition-all flex items-center justify-center gap-2 ${currentPost?.published ? 'bg-green-50 border-green-500 text-green-700' : 'bg-gray-50 border-gray-100 text-gray-500'}`}
                    >
                      <CheckCircle className="w-5 h-5" />
                      Published
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentPost({ ...currentPost, published: false })}
                      className={`flex-1 py-3 px-4 rounded-xl font-bold border-2 transition-all flex items-center justify-center gap-2 ${!currentPost?.published ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-gray-50 border-gray-100 text-gray-500'}`}
                    >
                      <Clock className="w-5 h-5" />
                      Draft
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-black text-gray-700 uppercase tracking-wider mb-2">Content</label>
              <div className={`bg-gray-50 border-2 rounded-xl overflow-hidden focus-within:border-blue-500 transition-all ${validationErrors.content ? 'border-red-500' : 'border-gray-100'}`}>
                <ReactQuill
                  theme="snow"
                  value={currentPost?.content || ''}
                  onChange={(content) => {
                    setCurrentPost({ ...currentPost, content });
                    if (validationErrors.content) {
                      const newErrors = { ...validationErrors };
                      delete newErrors.content;
                      setValidationErrors(newErrors);
                    }
                  }}
                  modules={quillModules}
                  placeholder="Tell your story..."
                  className="bg-white min-h-[300px]"
                />
              </div>
              {validationErrors.content && <p className="text-red-500 text-xs font-bold mt-1">{validationErrors.content}</p>}
            </div>

            <div className="flex gap-4 pt-4 border-t-2 border-gray-50">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200"
              >
                <Save className="w-5 h-5" />
                Save Post
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-2xl font-bold transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {loading ? (
            <div className="py-20 flex justify-center">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border-4 border-dashed border-gray-200">
              <p className="text-gray-500 font-bold text-xl mb-4">No posts yet!</p>
              <button
                onClick={handleAddNew}
                className="text-blue-600 font-black flex items-center gap-2 mx-auto hover:gap-4 transition-all"
              >
                Create your first post <Plus className="w-5 h-5" />
              </button>
            </div>
          ) : (
            posts.map((post) => (
              <motion.div
                key={post.id}
                layout
                className="bg-white rounded-2xl p-6 border-2 border-gray-100 flex items-center justify-between hover:border-blue-100 transition-all group"
              >
                <div className="flex items-center gap-6">
                  {post.image ? (
                    <img src={post.image} alt="" className="w-16 h-16 rounded-xl object-cover" />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                      <FileText className="w-8 h-8" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-black text-gray-900">{post.title}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">{post.category}</span>
                      <span className={`text-[10px] uppercase font-black tracking-widest px-2 py-0.5 rounded-full ${post.published ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="p-3 bg-gray-50 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-xl transition-all"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-3 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-xl transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* SEO & Quality Checklist */}
      <div className="mt-16 bg-white rounded-3xl p-8 border-4 border-gray-100">
        <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
          <CheckCircle className="w-8 h-8 text-green-600" />
          SEO & Quality Checklist
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: 'desc', label: 'Does every tool have unique, helpful text descriptions?' },
            { id: 'mobile', label: 'Is the tool mobile-friendly and fast-loading?' },
            { id: 'faq', label: 'Have you added FAQ schema to your pages?' },
            { id: 'links', label: 'Are you actively building links by offering your tools to others?' }
          ].map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border-2 border-gray-100 hover:border-blue-100 transition-all group">
              <div className="relative w-6 h-6 shrink-0">
                <input
                  type="checkbox"
                  id={item.id}
                  className="peer appearance-none w-6 h-6 border-2 border-gray-300 rounded-lg checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer"
                />
                <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
              </div>
              <label htmlFor={item.id} className="text-sm font-bold text-gray-700 cursor-pointer group-hover:text-gray-900">
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
