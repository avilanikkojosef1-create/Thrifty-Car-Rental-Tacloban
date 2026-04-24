import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

// Helper to convert Google Drive viewing links into raw image source links
const formatImageUrl = (url: string) => {
  if (url && url.includes('drive.google.com/file/d/')) {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
    }
  }
  return url;
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      let { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
      
      // Fallback if created_at column doesn't exist
      if (error && error.message?.includes('created_at')) {
        console.warn("created_at column might be missing, fetching without order");
        const fallback = await supabase.from('blogs').select('*');
        data = fallback.data;
        error = fallback.error;
      }
      
      if (error) {
        console.error("Error fetching blogs:", error);
      }
      if (!error && data) {
        setBlogs(data);
      }
      setIsLoading(false);
    };
    
    fetchBlogs();
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedBlog) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedBlog]);

  return (
    <div className="font-inter bg-surface-light text-charcoal min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pb-24 pt-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col mb-12 text-center md:text-left">
            <h1 className="font-poppins text-3xl md:text-5xl font-bold text-charcoal mb-4">Travel Guides & Tips</h1>
            <p className="text-charcoal/80 font-inter leading-relaxed text-base max-w-2xl">
              Discover the best routes, hidden gems, and travel advice for your next Leyte adventure.
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col animate-pulse">
                  <div className="w-full h-48 bg-gray-200"></div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="h-3 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/5 flex-1"></div>
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <div 
                  key={blog.id} 
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-all group cursor-pointer"
                  onClick={() => setSelectedBlog(blog)}
                >
                  {blog.image_url && (
                    <div className="w-full h-48 bg-gray-100 overflow-hidden relative">
                      <img 
                        src={formatImageUrl(blog.image_url)} 
                        alt={blog.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-primary-gold font-bold text-xs uppercase tracking-wider mb-2 block">{blog.category}</span>
                    <h3 className="font-poppins font-bold text-xl text-charcoal mb-3 line-clamp-2">{blog.title}</h3>
                    <p className="text-charcoal/70 text-sm font-inter flex-1 line-clamp-3 mb-4">{blog.content}</p>
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      {blog.created_at && <p className="text-xs text-charcoal/50 font-inter">{new Date(blog.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex pb-12 justify-center w-full">
              <div className="bg-[#FFFFFF] border border-gray-100 rounded-xl p-12 text-center w-full max-w-3xl flex flex-col items-center shadow-sm">
                <p className="font-inter text-charcoal/60">Our latest travel guides and stories will be available here soon.</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-charcoal/60 backdrop-blur-sm z-[100]">
          <div 
            className="absolute inset-0 z-0" 
            onClick={() => setSelectedBlog(null)}
          ></div>
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 flex flex-col shadow-2xl">
            <button 
              onClick={() => setSelectedBlog(null)} 
              className="absolute top-4 right-4 bg-white/80 p-2 rounded-full text-charcoal/60 hover:text-charcoal shadow-sm transition-colors z-20 backdrop-blur"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            
            {selectedBlog.image_url && (
              <div className="w-full h-64 md:h-96 shrink-0 relative">
                <img 
                  src={formatImageUrl(selectedBlog.image_url)} 
                  alt={selectedBlog.title} 
                  className="w-full h-full object-cover rounded-t-2xl" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6 md:p-10 pointer-events-none">
                  <span className="bg-primary-gold px-3 pt-1 pb-1.5 rounded text-white text-xs font-bold uppercase tracking-wider shadow-sm table">
                    {selectedBlog.category}
                  </span>
                </div>
              </div>
            )}
            
            <div className="p-6 md:p-10 flex-1 flex flex-col">
              {!selectedBlog.image_url && (
                <span className="bg-primary-gold/10 text-primary-gold px-3 pt-1 pb-1.5 rounded text-xs font-bold uppercase tracking-wider table mb-4 self-start">
                  {selectedBlog.category}
                </span>
              )}
              
              <h2 className="font-poppins text-2xl md:text-4xl font-bold text-charcoal mb-4">
                {selectedBlog.title}
              </h2>
              
              {selectedBlog.created_at && (
                <p className="text-sm text-charcoal/50 font-inter mb-8 pb-8 border-b border-gray-100">
                  Published on {new Date(selectedBlog.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              )}
              
              <div className="font-inter text-charcoal/80 leading-relaxed max-w-none whitespace-pre-wrap">
                {selectedBlog.content}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
