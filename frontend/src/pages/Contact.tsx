import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, MessageSquare, Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: add actual form submission later
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const socialLinks = [
    {
      name: 'Instagram',
      icon: <Instagram className="w-5 h-5" />,
      href: 'https://www.instagram.com/malithonline/',
      color: 'hover:bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500'
    },
    {
      name: 'WhatsApp',
      icon: <MessageSquare className="w-5 h-5" />,
      href: 'https://wa.me/94760022300',
      color: 'hover:bg-green-600'
    }
  ];

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      text: 'malith@gmail.com',
      href: 'mailto:malith@gmail.com'
    },
    {
      icon: <Phone className="w-5 h-5" />,
      text: '+94 760022300',
      href: 'tel:+94760022300'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      text: 'Sri Lanka',
      href: null
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="h-[40vh] bg-[url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-center"
          >
            Get in Touch
          </motion.h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
              <p className="text-gray-400 mb-8">
                Ready to capture your special moments? Get in touch with us and let's create something beautiful together.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white">
                    {info.icon}
                  </div>
                  {info.href ? (
                    <a 
                      href={info.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {info.text}
                    </a>
                  ) : (
                    <span className="text-gray-300">{info.text}</span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className={`w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white transition-all duration-300 ${social.color} hover:scale-110`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="w-full bg-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  required
                  className="w-full bg-white/10 rounded-lg px-4 py-3 h-32 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300 resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-200 transition-all duration-300 flex items-center justify-center space-x-2 group"
              >
                <span>{isSubmitted ? 'Message Sent!' : 'Send Message'}</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {isSubmitted && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-center"
                >
                  Thank you for your message. We'll get back to you soon!
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;