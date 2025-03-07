import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Projects = () => {
  const projects = [
    {
      title: 'Wedding Photography',
      description: 'Capturing beautiful moments of couples on their special day. From intimate ceremonies to grand celebrations, every moment is preserved with care and artistry.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552',
      year: '2024',
      details: ['Full Day Coverage', '400+ Photos', 'Premium Editing'],
      category: 'Wedding'
    },
    {
      title: 'Concert Photography',
      description: 'High-energy shots from live music events. Capturing the raw emotion and energy of performers and audiences in their most authentic moments.',
      image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4',
      year: '2024',
      details: ['Stage Photography', 'Crowd Shots', 'Backstage Access'],
      category: 'Events'
    },
    {
      title: 'Nature Landscapes',
      description: 'Scenic views from around Sri Lanka. Exploring the natural beauty of our island through the lens, from misty mountains to pristine beaches.',
      image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9',
      year: '2023',
      details: ['Golden Hour Shots', 'Aerial Views', 'Location Scouting'],
      category: 'Nature'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="h-[40vh] bg-[url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-center">Projects</h1>
        </div>
      </div>

      {/* Projects List */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="space-y-24">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className={`space-y-6 ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                <h2 className="text-3xl font-bold">{project.title}</h2>
                <p className="text-gray-400 leading-relaxed">{project.description}</p>
                <ul className="space-y-2">
                  {project.details.map((detail, didx) => (
                    <li key={didx} className="text-gray-500">• {detail}</li>
                  ))}
                </ul>
                <div className="flex items-center space-x-4">
                  <Link 
                    to={`/gallery`}
                    state={{ category: project.category }}
                    className="inline-flex items-center px-6 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors group"
                  >
                    View Project
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <span className="text-gray-500">{project.year}</span>
                </div>
              </div>
              <div className={`aspect-[4/3] overflow-hidden rounded-lg ${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                <img
                  src={`${project.image}?auto=format&fit=crop&w=1200&q=80`}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;