import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Gallery = () => {
  const location = useLocation();
  const categories = ['All', 'Wedding', 'Events', 'Portrait', 'Nature'];
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Set initial category from navigation state
  useEffect(() => {
    const state = location.state as { category?: string };
    if (state?.category && categories.includes(state.category)) {
      setActiveCategory(state.category);
    }
  }, [location]);

  const photos = {
    Wedding: [
      'https://images.unsplash.com/photo-1519741497674-611481863552',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc',
      'https://images.unsplash.com/photo-1464023790935-0f9d2e48ad5b',
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a',
      'https://images.unsplash.com/photo-1591604466107-ec97de577aff'
    ],
    Events: [
      'https://images.unsplash.com/photo-1469119993183-5f7b83dc16fa',
      'https://images.unsplash.com/photo-1485178575877-1a13bf489dfe',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4',
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
      'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec'
    ],
    Portrait: [
      'https://images.unsplash.com/photo-1518998053901-5348d3961a04',
      'https://images.unsplash.com/photo-1509070016581-915335454d19',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d'
    ],
    Nature: [
      'https://images.unsplash.com/photo-1502790671504-542ad42d5189',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e',
      'https://images.unsplash.com/photo-1490730141103-6cac27016106'
    ]
  };

  const getAllPhotos = () => {
    return Object.values(photos).flat();
  };

  const displayPhotos = activeCategory === 'All' ? getAllPhotos() : photos[activeCategory] || [];

  const handlePhotoClick = (photo: string) => {
    setSelectedPhoto(photo);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="h-[40vh] bg-[url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-center">Gallery</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeCategory === category
                  ? 'bg-white text-black'
                  : 'bg-transparent text-white border border-white/20 hover:border-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPhotos.map((photo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="aspect-square overflow-hidden rounded-lg relative group"
            >
              <img
                src={`${photo}?auto=format&fit=crop&w=800&q=80`}
                alt={`Gallery photo ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button 
                  onClick={() => handlePhotoClick(photo)}
                  className="px-6 py-2 bg-white text-black rounded-full transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                >
                  View Photo
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-7xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              >
                <X size={24} />
              </button>
              <img
                src={`${selectedPhoto}?auto=format&fit=contain&w=1200&h=800&q=90`}
                alt="Selected photo"
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;