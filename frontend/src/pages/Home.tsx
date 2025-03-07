import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart, Users, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const services = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Photography",
      description: "Professional photography for all your special moments"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Wedding Shoots",
      description: "Capturing your perfect day with style"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Events",
      description: "Corporate and social event coverage"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Timeless",
      description: "Creating memories that last forever"
    }
  ];

  const pricing = [
    {
      title: "Basic",
      price: "250",
      features: ["2 Hour Session", "50 Digital Photos", "Online Gallery", "Basic Retouching"]
    },
    {
      title: "Standard",
      price: "500",
      features: ["4 Hour Session", "100 Digital Photos", "Online Gallery", "Advanced Retouching", "Print Release"]
    },
    {
      title: "Premium",
      price: "750",
      features: ["Full Day Session", "200 Digital Photos", "Online Gallery", "Premium Retouching", "Print Release", "Photo Album"]
    }
  ];

  const recentWork = [
    {
      image: "https://images.unsplash.com/photo-1519741497674-611481863552",
      category: "Wedding"
    },
    {
      image: "https://images.unsplash.com/photo-1469119993183-5f7b83dc16fa",
      category: "Events"
    },
    {
      image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04",
      category: "Portrait"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-[url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"
      >
        <div className="bg-black/50 w-full h-full absolute inset-0" />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Capturing Moments<br />Creating Memories
          </h1>
          <p className="text-gray-200 max-w-2xl mb-8">
            Hi, I'm Malith, a photographer from Sri Lanka specializing in capturing life's beautiful moments
          </p>
          <Link to="/gallery" className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition-colors inline-flex items-center group">
            View Gallery
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>

      {/* Services Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-6 border border-gray-800 rounded-lg hover:border-gray-600 transition-colors"
              >
                <div className="mb-4 flex justify-center">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Work */}
      <section className="py-20 px-4 bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Recent Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentWork.map((work, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative group overflow-hidden rounded-lg aspect-square"
              >
                <img
                  src={`${work.image}?auto=format&fit=crop&w=800&q=80`}
                  alt={work.category}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-xl font-semibold">{work.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/gallery" className="inline-flex items-center text-gray-400 hover:text-white transition-colors group">
              View All Work
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Pricing Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="border border-gray-800 rounded-lg p-8 text-center hover:border-gray-600 transition-colors"
              >
                <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
                <div className="text-4xl font-bold mb-6">${plan.price}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="text-gray-400">{feature}</li>
                  ))}
                </ul>
                <Link 
                  to="/contact" 
                  className="block w-full bg-white text-black py-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                  Choose Plan
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4 bg-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Capture Your Moments?</h2>
          <p className="text-gray-400 mb-8">Let's create something beautiful together</p>
          <Link 
            to="/contact" 
            className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition-colors inline-flex items-center group"
          >
            Get in Touch
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;