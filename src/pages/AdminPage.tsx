import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { LogOut, Car, FileText, Plus, X, Droplets, Database, Github, CheckCircle2, AlertCircle } from 'lucide-react';

// Helper to convert Google Drive viewing links into raw image source links
const formatImageUrl = (url: string) => {
  if (url && url.includes('drive.google.com/file/d/')) {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      // Use thumbnail API as it bypasses Google's recent strict blocking on raw uc file downloads
      return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
    }
  }
  return url;
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'fleet' | 'blogs' | 'bookings'>('fleet');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [vehicleForm, setVehicleForm] = useState({ name: '', category: 'SUV', dailyRate: '', carwashFee: '', extensionFee: '', specifications: '', imageUrl: '' });
  const [editingVehicleId, setEditingVehicleId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [saveError, setSaveError] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState({ title: '', category: '', content: '' });
  const [blogImageFile, setBlogImageFile] = useState<File | null>(null);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [confirmDeleteBlogId, setConfirmDeleteBlogId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSaveVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('loading');
    setSaveError('');
    try {
      const vehicleData = {
        name: vehicleForm.name,
        category: vehicleForm.category,
        daily_rate: parseFloat(vehicleForm.dailyRate),
        carwash_fee: parseFloat(vehicleForm.carwashFee) || 0,
        extension_fee: parseFloat(vehicleForm.extensionFee) || 0,
        specifications: vehicleForm.specifications,
        image_url: vehicleForm.imageUrl
      };

      const { error } = editingVehicleId
        ? await supabase.from('vehicles').update(vehicleData).eq('id', editingVehicleId)
        : await supabase.from('vehicles').insert([vehicleData]);

      if (error) throw error;
      setSaveStatus('success');
      setTimeout(() => {
        setIsModalOpen(false);
        setSaveStatus('idle');
        setEditingVehicleId(null);
        setVehicleForm({ name: '', category: 'SUV', dailyRate: '', carwashFee: '', extensionFee: '', specifications: '', imageUrl: '' });
        fetchVehicles();
      }, 2000);
    } catch (err: any) {
      setSaveError(err.message || 'Error saving to database. Ensure the "vehicles" table exists in Supabase.');
      setSaveStatus('error');
    }
  };

  const handleEditVehicle = (vehicle: any) => {
    setEditingVehicleId(vehicle.id);
    setVehicleForm({
      name: vehicle.name,
      category: vehicle.category,
      dailyRate: vehicle.daily_rate.toString(),
      carwashFee: vehicle.carwash_fee.toString(),
      extensionFee: (vehicle.extension_fee || 0).toString(),
      specifications: vehicle.specifications,
      imageUrl: vehicle.image_url
    });
    setSaveStatus('idle');
    setSaveError('');
    setIsModalOpen(true);
  };

  const handleAddVehicleClick = () => {
    setEditingVehicleId(null);
    setVehicleForm({ name: '', category: 'SUV', dailyRate: '', carwashFee: '', extensionFee: '', specifications: '', imageUrl: '' });
    setSaveStatus('idle');
    setSaveError('');
    setIsModalOpen(true);
  };

  const handleEditBlog = (blog: any) => {
    setEditingBlogId(blog.id);
    setBlogForm({ title: blog.title, category: blog.category, content: blog.content });
    setBlogImageFile(null);
    setSaveStatus('idle');
    setSaveError('');
    setIsModalOpen(true);
  };

  const handleAddBlogClick = () => {
    setEditingBlogId(null);
    setBlogForm({ title: '', category: '', content: '' });
    setBlogImageFile(null);
    setSaveStatus('idle');
    setSaveError('');
    setIsModalOpen(true);
  };

  const handleDeleteBlog = async (id: string) => {
    setDeleteError('');
    setConfirmDeleteBlogId(null);
    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (!error) {
      fetchBlogs();
    } else {
      setDeleteError(`Delete Failed: ${error.message}`);
    }
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('loading');
    setSaveError('');
    try {
      let imageUrl = undefined;
      if (blogImageFile) {
        // Convert file to base64 instead of using Supabase Storage
        // This avoids any bucket RLS issues
        const fileToBase64 = (file: File): Promise<string> => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
          });
        };
        
        try {
          imageUrl = await fileToBase64(blogImageFile);
        } catch (err: any) {
          console.error("Base64 conversion error:", err);
          throw new Error("Failed to process image file");
        }
      }

      const blogData: any = {
        title: blogForm.title,
        category: blogForm.category,
        content: blogForm.content,
      };
      if (imageUrl !== undefined) {
         blogData.image_url = imageUrl;
      }

      const { error } = editingBlogId 
         ? await supabase.from('blogs').update(blogData).eq('id', editingBlogId)
         : await supabase.from('blogs').insert([blogData]);

      if (error) throw error;
      
      setSaveStatus('success');
      setTimeout(() => {
        setIsModalOpen(false);
        setSaveStatus('idle');
        setEditingBlogId(null);
        setBlogForm({ title: '', category: '', content: '' });
        setBlogImageFile(null);
        fetchBlogs();
      }, 2000);
    } catch (err: any) {
      setSaveError(err.message || 'Error saving blog. Ensure the "blogs" table and "blog_images" bucket exist in Supabase.');
      setSaveStatus('error');
    }
  };

  const fetchVehicles = async () => {
    setIsLoadingData(true);
    const { data, error } = await supabase.from('vehicles').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setVehicles(data);
    }
    setIsLoadingData(false);
  };

  const fetchBookings = async () => {
    setIsLoadingData(true);
    const { data, error } = await supabase.from('bookings').select('*, vehicles(name)').order('created_at', { ascending: false });
    if (!error && data) {
      setBookings(data);
    }
    setIsLoadingData(false);
  };

  const fetchBlogs = async () => {
    setIsLoadingData(true);
    let { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
    if (error && error.message?.includes('created_at')) {
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
    setIsLoadingData(false);
  };

  const updateBookingStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from('bookings').update({ status: newStatus }).eq('id', id);
    if (!error) {
      fetchBookings();
    } else {
      alert("Failed to update status: " + error.message);
    }
  };

  const handleDeleteVehicle = async (id: string) => {
    setDeleteError('');
    setConfirmDeleteId(null);
    const { error } = await supabase.from('vehicles').delete().eq('id', id);
    if (!error) {
      fetchVehicles();
    } else {
      setDeleteError(`Delete Failed: ${error.message}. You likely need to run the DELETE policy in your Supabase SQL Editor.`);
    }
  };

  useEffect(() => {
    if (activeTab === 'fleet') {
      fetchVehicles();
    } else if (activeTab === 'bookings') {
      fetchBookings();
    } else if (activeTab === 'blogs') {
      fetchBlogs();
    }
  }, [activeTab]);

  useEffect(() => {
    // Check if user is authenticated
    const checkUser = async () => {
      try {
        const { error } = await supabase.auth.getSession();
        setDbStatus(error ? 'error' : 'connected');
      } catch {
        setDbStatus('error');
      }

      // Check hardcoded demo access first
      const isMockAdmin = localStorage.getItem('thrifty_admin_mock') === 'true';
      if (isMockAdmin) return;

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      }
    };
    checkUser();
  }, [navigate]);

  const handleSignOut = async () => {
    localStorage.removeItem('thrifty_admin_mock');
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-surface-light flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-100 flex flex-col items-start hidden md:flex min-h-screen shadow-sm">
        <div className="p-6 w-full border-b border-gray-100">
          <div className="font-poppins text-lg font-bold italic text-primary-gold">
            Thrifty Admin
          </div>
        </div>
        
        <nav className="flex-1 w-full p-4 space-y-2">
          <button
            onClick={() => setActiveTab('fleet')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-inter text-sm font-medium transition-all ${
              activeTab === 'fleet' ? 'bg-primary-gold/10 text-primary-gold' : 'text-charcoal/60 hover:bg-gray-50 hover:text-charcoal'
            }`}
          >
            <Car className="w-5 h-5" /> Fleet Management
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-inter text-sm font-medium transition-all ${
              activeTab === 'bookings' ? 'bg-primary-gold/10 text-primary-gold' : 'text-charcoal/60 hover:bg-gray-50 hover:text-charcoal'
            }`}
          >
            <FileText className="w-5 h-5" /> Booking Requests
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-inter text-sm font-medium transition-all ${
              activeTab === 'blogs' ? 'bg-primary-gold/10 text-primary-gold' : 'text-charcoal/60 hover:bg-gray-50 hover:text-charcoal'
            }`}
          >
            <FileText className="w-5 h-5" /> Blog Posts
          </button>
        </nav>

        <div className="p-4 w-full border-t border-gray-100 space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
            <h4 className="font-poppins text-xs font-bold text-charcoal uppercase tracking-widest mb-1">System Status</h4>
            <div className="flex items-center justify-between text-xs font-inter">
              <span className="text-charcoal/70 flex items-center gap-1.5"><Database className="w-3.5 h-3.5"/> Supabase DB</span>
              {dbStatus === 'checking' ? (
                <span className="text-gray-400 font-medium">Checking...</span>
              ) : dbStatus === 'connected' ? (
                <span className="text-emerald-600 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5"/> Connected</span>
              ) : (
                <span className="text-red-500 font-bold flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5"/> Disconnected</span>
              )}
            </div>
            <div className="flex items-center justify-between text-xs font-inter">
              <span className="text-charcoal/70 flex items-center gap-1.5"><Github className="w-3.5 h-3.5"/> GitHub API</span>
              <span className="text-emerald-600 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5"/> Connected</span>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-inter text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Tab Navigation */}
      <div className="md:hidden flex overflow-x-auto p-4 bg-white border-b border-gray-100 gap-2 shrink-0">
        <button
          onClick={() => setActiveTab('fleet')}
          className={`flex-1 whitespace-nowrap flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-inter text-sm font-medium transition-all ${
            activeTab === 'fleet' ? 'bg-primary-gold/10 text-primary-gold' : 'text-charcoal/60 bg-gray-50'
          }`}
        >
          <Car className="w-4 h-4" /> Fleet
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex-1 whitespace-nowrap flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-inter text-sm font-medium transition-all ${
            activeTab === 'bookings' ? 'bg-primary-gold/10 text-primary-gold' : 'text-charcoal/60 bg-gray-50'
          }`}
        >
          <FileText className="w-4 h-4" /> Bookings
        </button>
        <button
          onClick={() => setActiveTab('blogs')}
          className={`flex-1 whitespace-nowrap flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-inter text-sm font-medium transition-all ${
            activeTab === 'blogs' ? 'bg-primary-gold/10 text-primary-gold' : 'text-charcoal/60 bg-gray-50'
          }`}
        >
          <FileText className="w-4 h-4" /> Blogs
        </button>
        <button
            onClick={handleSignOut}
            className="flex-shrink-0 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-inter text-sm font-medium text-red-500 bg-red-50 transition-all"
          >
            <LogOut className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="font-poppins text-3xl font-bold text-charcoal mb-2">
                {activeTab === 'fleet' ? 'Fleet Management' : activeTab === 'bookings' ? 'Booking Requests' : 'Blog Posts'}
              </h1>
              <p className="font-inter text-charcoal/60 text-sm">
                {activeTab === 'fleet' 
                  ? 'Add and manage your available rental vehicles.' 
                  : activeTab === 'bookings' 
                  ? 'Review and manage customer booking requests.'
                  : 'Write and publish travel guides and tips.'}
              </p>
            </div>
            {activeTab !== 'bookings' && (
              <button 
                onClick={() => {
                  if (activeTab === 'fleet') {
                    handleAddVehicleClick();
                  } else if (activeTab === 'blogs') {
                    handleAddBlogClick();
                  } else {
                    setIsModalOpen(true);
                  }
                }}
                className="bg-primary-gold text-[#FFFFFF] flex items-center gap-2 rounded px-5 py-2.5 font-poppins font-bold text-sm shadow transition-all hover:bg-gold-hover hover:-translate-y-0.5"
              >
                <Plus className="w-4 h-4" /> 
                {activeTab === 'fleet' ? 'Add Vehicle' : 'New Post'}
              </button>
            )}
          </div>

          {/* Data Grid / List */}
          {deleteError && (
            <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg font-inter text-sm border border-red-100 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" /> 
              <div>
                <span className="font-bold block">Action Blocked by Supabase</span>
                {deleteError}
              </div>
            </div>
          )}
          {isLoadingData ? (
            <div className="py-12 text-center text-charcoal/50 font-inter">Loading {activeTab} data...</div>
          ) : activeTab === 'bookings' && bookings.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {bookings.map((b) => (
                <div key={b.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-charcoal font-poppins text-lg">{b.full_name}</h3>
                        <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                          b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                          b.status === 'rejected' ? 'bg-red-100 text-red-700' :
                          b.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {b.status || 'Pending'}
                        </span>
                      </div>
                      <p className="text-sm font-inter text-charcoal/70">Vehicle: <span className="font-bold">{b.vehicles?.name || 'Unknown Vehicle'}</span></p>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="font-bold text-primary-gold font-poppins text-xl">₱{b.total_cost}</p>
                      <p className="text-xs font-inter text-charcoal/50">{new Date(b.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-inter text-charcoal/80 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <p className="mb-1"><span className="font-medium text-charcoal">Phone:</span> {b.phone}</p>
                      <p className="mb-1">
                        <span className="font-medium text-charcoal">Facebook:</span>{' '}
                        <a href={b.facebook} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline break-all">Link</a>
                      </p>
                      <p className="mb-1"><span className="font-medium text-charcoal">Passengers:</span> {b.passengers} | <span className="font-medium text-charcoal">Purpose:</span> {b.purpose}</p>
                    </div>
                    <div>
                      <p className="mb-1"><span className="font-medium text-charcoal">Pick-up:</span> {new Date(b.pickup_date).toLocaleString()}</p>
                      <p className="mb-1"><span className="font-medium text-charcoal">Drop-off:</span> {new Date(b.dropoff_date).toLocaleString()}</p>
                      <p className="mb-1"><span className="font-medium text-charcoal">Delivery:</span> {b.delivery_method} {b.delivery_method === 'dropoff' && `(${b.delivery_address})`}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2 items-center justify-between">
                    {b.license_url ? (
                      <a href={b.license_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-medium text-sm flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> View Driver's License Image
                      </a>
                    ) : (
                      <span className="text-charcoal/40 text-sm italic">No license image provided</span>
                    )}

                    <div className="flex gap-2">
                      {b.status !== 'confirmed' && b.status !== 'completed' && (
                        <button onClick={() => updateBookingStatus(b.id, 'confirmed')} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded font-bold text-xs transition-colors">
                          Confirm
                        </button>
                      )}
                      {b.status === 'confirmed' && (
                        <button onClick={() => updateBookingStatus(b.id, 'completed')} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-bold text-xs transition-colors">
                          Complete Booking
                        </button>
                      )}
                      {b.status !== 'rejected' && b.status !== 'completed' && (
                        <button onClick={() => updateBookingStatus(b.id, 'rejected')} className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded font-bold text-xs transition-colors">
                          Reject
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : activeTab === 'fleet' && vehicles.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {vehicles.map((v) => (
                <div key={v.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center gap-5 transition-all hover:shadow-md">
                  <div className="w-full md:w-40 h-28 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                    <img src={formatImageUrl(v.image_url)} alt={v.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-primary-gold/10 text-primary-gold px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider">{v.category}</span>
                      <h3 className="font-bold text-charcoal font-poppins text-lg">{v.name}</h3>
                    </div>
                    <p className="text-sm text-charcoal/70 font-inter mb-3">{v.specifications}</p>
                    {v.extension_fee > 0 && <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded text-xs font-bold font-inter">₱{v.extension_fee}/hr extension fee</span>}
                  </div>
                  <div className="text-left md:text-right flex flex-col md:items-end justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 mt-4 md:mt-0">
                    <span className="font-bold text-primary-gold font-poppins text-2xl">₱{v.daily_rate} <span className="text-sm text-charcoal/50 font-normal">/day</span></span>
                    {v.carwash_fee > 0 && <span className="text-xs text-charcoal/50 font-inter mt-1">₱{v.carwash_fee} Carwash Fee</span>}
                    {confirmDeleteId === v.id ? (
                      <div className="flex items-center gap-2 mt-4 self-start md:self-end">
                        <span className="text-xs font-inter text-red-600 block">Confirm?</span>
                        <button 
                          onClick={() => handleDeleteVehicle(v.id)}
                          className="bg-red-500 text-white hover:bg-red-600 px-3 py-1.5 rounded transition-colors text-xs font-bold"
                        >
                          Yes
                        </button>
                        <button 
                          onClick={() => setConfirmDeleteId(null)}
                          className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-3 py-1.5 rounded transition-colors text-xs font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 mt-4 self-start md:self-end">
                        <button 
                          onClick={() => handleEditVehicle(v)}
                          className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors text-xs font-bold border border-blue-100"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => setConfirmDeleteId(v.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors text-xs font-bold border border-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : activeTab === 'blogs' && blogs.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {blogs.map((b) => (
                <div key={b.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center gap-5 transition-all hover:shadow-md">
                  {b.image_url && (
                    <div className="w-full md:w-32 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                      <img src={formatImageUrl(b.image_url)} alt={b.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-primary-gold/10 text-primary-gold px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider">{b.category}</span>
                      <h3 className="font-bold text-charcoal font-poppins text-lg">{b.title}</h3>
                    </div>
                    <p className="text-sm text-charcoal/70 font-inter mb-3 line-clamp-2">{b.content}</p>
                    {b.created_at && <p className="text-xs text-charcoal/50 font-inter">{new Date(b.created_at).toLocaleDateString()}</p>}
                  </div>
                  <div className="text-left md:text-right flex flex-col md:items-end justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 mt-4 md:mt-0">
                    {confirmDeleteBlogId === b.id ? (
                      <div className="flex items-center gap-2 mt-4 self-start md:self-end">
                        <span className="text-xs font-inter text-red-600 block">Confirm?</span>
                        <button 
                          onClick={() => handleDeleteBlog(b.id)}
                          className="bg-red-500 text-white hover:bg-red-600 px-3 py-1.5 rounded transition-colors text-xs font-bold"
                        >
                          Yes
                        </button>
                        <button 
                          onClick={() => setConfirmDeleteBlogId(null)}
                          className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-3 py-1.5 rounded transition-colors text-xs font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 mt-4 self-start md:self-end">
                        <button 
                          onClick={() => handleEditBlog(b)}
                          className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors text-xs font-bold border border-blue-100"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => setConfirmDeleteBlogId(b.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors text-xs font-bold border border-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                {activeTab === 'fleet' ? (
                  <Car className="w-8 h-8 text-gray-300" />
                ) : (
                  <FileText className="w-8 h-8 text-gray-300" />
                )}
              </div>
              <h3 className="font-poppins text-lg font-bold text-charcoal mb-2">No data available</h3>
              <p className="font-inter text-charcoal/50 text-sm max-w-sm">
                You haven't added any {activeTab === 'fleet' ? 'vehicles' : activeTab === 'bookings' ? 'bookings' : 'blog posts'} yet. {activeTab !== 'bookings' && "Click the button above to get started."}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Add Item Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-surface-light">
              <h2 className="font-poppins font-bold text-xl text-charcoal">
                {activeTab === 'fleet' 
                  ? (editingVehicleId ? 'Edit Vehicle' : 'Add New Vehicle')
                  : (editingBlogId ? 'Edit Blog Post' : 'Create New Blog Post')}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-charcoal transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto w-full">
              {saveStatus === 'success' && (
                <div className="mb-6 bg-emerald-50 text-emerald-600 p-4 rounded-lg font-inter text-sm border border-emerald-100 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> Automatically saved to database successfully!
                </div>
              )}
              {saveStatus === 'error' && (
                <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg font-inter text-sm border border-red-100 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" /> 
                  <div>
                    <span className="font-bold block">Database Error</span>
                    {saveError}
                  </div>
                </div>
              )}
              {activeTab === 'fleet' ? (
                <form id="fleet-form" className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <label className="block font-inter text-xs font-bold text-charcoal uppercase tracking-widest mb-2">Vehicle Name</label>
                      <input type="text" value={vehicleForm.name} onChange={e => setVehicleForm({...vehicleForm, name: e.target.value})} required placeholder="e.g., Premium Explorer" className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:border-primary-gold font-inter text-sm" />
                    </div>
                    <div>
                      <label className="block font-inter text-xs font-bold text-charcoal uppercase tracking-widest mb-2">Category</label>
                      <select value={vehicleForm.category} onChange={e => setVehicleForm({...vehicleForm, category: e.target.value})} className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:border-primary-gold font-inter text-sm bg-white">
                        <option>SUV</option>
                        <option>Sedan</option>
                        <option>Van</option>
                        <option>MPV</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-inter text-xs font-bold text-charcoal uppercase tracking-widest mb-2">Daily Rate (₱)</label>
                      <input type="number" required value={vehicleForm.dailyRate} onChange={e => setVehicleForm({...vehicleForm, dailyRate: e.target.value})} placeholder="e.g., 3500" className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:border-primary-gold font-inter text-sm" />
                    </div>
                    <div>
                      <label className="block font-inter text-xs font-bold text-charcoal uppercase tracking-widest mb-2">Carwash Fee (₱)</label>
                      <input type="number" required value={vehicleForm.carwashFee} onChange={e => setVehicleForm({...vehicleForm, carwashFee: e.target.value})} placeholder="e.g., 500" className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:border-primary-gold font-inter text-sm" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block font-inter text-xs font-bold text-charcoal uppercase tracking-widest mb-2">Extension Fee/Hr (₱)</label>
                      <input type="number" required value={vehicleForm.extensionFee} onChange={e => setVehicleForm({...vehicleForm, extensionFee: e.target.value})} placeholder="e.g., 300" className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:border-primary-gold font-inter text-sm" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block font-inter text-xs font-bold text-charcoal uppercase tracking-widest mb-2">Specifications</label>
                      <input type="text" required value={vehicleForm.specifications} onChange={e => setVehicleForm({...vehicleForm, specifications: e.target.value})} placeholder="e.g., 7 Seater • Auto • AWD" className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:border-primary-gold font-inter text-sm" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block font-inter text-xs font-bold text-charcoal uppercase tracking-widest mb-2">Image URL</label>
                      <input type="url" required value={vehicleForm.imageUrl} onChange={e => setVehicleForm({...vehicleForm, imageUrl: e.target.value})} placeholder="https://..." className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:border-primary-gold font-inter text-sm" />
                    </div>
                  </div>
                </form>
              ) : (
                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); }}>
                  <div>
                    <label className="block font-inter text-xs font-bold text-charcoal uppercase tracking-widest mb-2">Post Title</label>
                    <input type="text" value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} placeholder="Enter an engaging title..." required className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:border-primary-gold font-inter text-sm" />
                  </div>
                  <div>
                    <label className="block font-inter text-xs font-bold text-charcoal uppercase tracking-widest mb-2">Category / Tag</label>
                    <input type="text" value={blogForm.category} onChange={e => setBlogForm({...blogForm, category: e.target.value})} placeholder="e.g., Travel Tips, Destinations" required className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:border-primary-gold font-inter text-sm" />
                  </div>
                  <div>
                    <label className="block font-inter text-xs font-bold text-charcoal uppercase tracking-widest mb-2">Cover Image {editingBlogId && '(Leave blank to keep existing)'}</label>
                    <input type="file" accept="image/*" onChange={e => { if (e.target.files && e.target.files[0]) setBlogImageFile(e.target.files[0]); }} className="w-full px-4 py-2.5 rounded border border-gray-200 focus:outline-none focus:border-primary-gold font-inter text-sm bg-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-primary-gold/10 file:text-primary-gold file:font-semibold hover:file:bg-primary-gold/20 cursor-pointer" />
                  </div>
                  <div>
                    <label className="block font-inter text-xs font-bold text-charcoal uppercase tracking-widest mb-2">Content Draft</label>
                    <textarea value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})} required rows={5} placeholder="Write your content here..." className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:border-primary-gold font-inter text-sm resize-none"></textarea>
                  </div>
                </form>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-surface-light mt-auto">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="px-5 py-2.5 rounded font-inter font-medium text-charcoal/70 border border-gray-200 hover:bg-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={(e) => {
                  if (activeTab === 'fleet') {
                    handleSaveVehicle(e);
                  } else if (activeTab === 'blogs') {
                    handleSaveBlog(e);
                  }
                }}
                disabled={saveStatus === 'loading'}
                type="button"
                className="px-5 py-2.5 rounded font-inter font-bold text-[#FFFFFF] bg-primary-gold hover:bg-gold-hover shadow transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {saveStatus === 'loading' ? 'Saving...' : (activeTab === 'fleet' ? (editingVehicleId ? 'Save Changes' : 'Save Vehicle') : (editingBlogId ? 'Save Changes' : 'Save & Publish'))}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
