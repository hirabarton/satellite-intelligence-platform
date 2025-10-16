'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Navigation = () => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);

  return (
    <>
      <header className="relative z-20 flex justify-between items-center px-12 py-6">
        <Link href="/" className="flex items-center space-x-2">
          <Image 
            src="/logo-blue.png" 
            alt="Noir Stack Logo" 
            width={48}
            height={48}
            className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300 mix-blend-screen"
          />
          <div className="text-2xl font-bold text-white font-[family-name:var(--font-montserrat)]">
            NOIR<span className="text-blue-400">STACK</span>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8 font-[family-name:var(--font-inter)]">
          <div 
            className="relative"
            onMouseEnter={() => setActiveTooltip('lab')}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <Link href="/lab" className="relative text-white/80 hover:text-blue-400 transition-all duration-300 group">
              Lab
              <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]"></span>
            </Link>
            {activeTooltip === 'lab' && (
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm border border-blue-400/30 rounded-lg p-4 w-80 z-50">
                <p className="text-sm text-white/90 leading-relaxed">
                  Discover prototypes and experimental projects focused on pushing the boundaries of innovation and future advancements.
                </p>
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 border-l border-t border-blue-400/30 rotate-45"></div>
              </div>
            )}
          </div>
          
          <div 
            className="relative"
            onMouseEnter={() => setActiveTooltip('solutions')}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <Link href="/solutions" className="relative text-white/80 hover:text-blue-400 transition-all duration-300 group">
              Solutions
              <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]"></span>
            </Link>
            {activeTooltip === 'solutions' && (
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm border border-blue-400/30 rounded-lg p-4 w-80 z-50">
                <p className="text-sm text-white/90 leading-relaxed">
                  Explore a range of tailored services designed to solve complex challenges through innovative technology and customized solutions.
                </p>
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 border-l border-t border-blue-400/30 rotate-45"></div>
              </div>
            )}
          </div>
          
          <div 
            className="relative"
            onMouseEnter={() => setActiveTooltip('hub')}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <Link href="/hub" className="relative text-white/80 hover:text-blue-400 transition-all duration-300 group">
              Hub
              <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]"></span>
            </Link>
            {activeTooltip === 'hub' && (
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm border border-blue-400/30 rounded-lg p-4 w-80 z-50">
                <p className="text-sm text-white/90 leading-relaxed">
                  Explore a centralized space for resources, documentation, and community tools, designed for collaboration and continuous engagement.
                </p>
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 border-l border-t border-blue-400/30 rotate-45"></div>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setShowContactModal(true)}
            className="relative text-white/80 hover:text-blue-400 transition-all duration-300 group"
          >
            Contact
            <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]"></span>
          </button>
          
          <button 
            onClick={() => setShowSubscribeModal(true)}
            className="relative text-white/80 hover:text-blue-400 transition-all duration-300 group"
          >
            Subscribe
            <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]"></span>
          </button>
        </nav>
      </header>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-black/90 border border-blue-400/30 rounded-xl p-8 max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white font-[family-name:var(--font-montserrat)]">Schedule a Consultation</h3>
              <button 
                onClick={() => setShowContactModal(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <p className="text-white/70 mb-6 leading-relaxed">
              Interested in personalized insights or a demo? Share your email, and we'll reach out to you.
            </p>
            
            <form className="space-y-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Name (optional)"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  className="w-full px-4 py-3 bg-black/50 border border-blue-400/30 rounded-lg text-white placeholder-white/50 focus:border-blue-400 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Email *"
                  required
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  className="w-full px-4 py-3 bg-black/50 border border-blue-400/30 rounded-lg text-white placeholder-white/50 focus:border-blue-400 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <textarea 
                  placeholder="Message"
                  rows={4}
                  className="w-full px-4 py-3 bg-black/50 border border-blue-400/30 rounded-lg text-white placeholder-white/50 focus:border-blue-400 focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Send Consultation Request
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Subscribe Modal */}
      {showSubscribeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-black/90 border border-blue-400/30 rounded-xl p-8 max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white font-[family-name:var(--font-montserrat)]">Stay Informed</h3>
              <button 
                onClick={() => setShowSubscribeModal(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <p className="text-white/70 mb-6 leading-relaxed">
              Sign up to receive the latest content, product innovations, and exclusive updates on upcoming developments.
            </p>
            
            <form className="space-y-4">
              <div>
                <input 
                  type="email" 
                  placeholder="Your email address"
                  required
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  className="w-full px-4 py-3 bg-black/50 border border-blue-400/30 rounded-lg text-white placeholder-white/50 focus:border-blue-400 focus:outline-none transition-colors"
                />
              </div>
              <button 
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Subscribe to Newsletter
              </button>
            </form>
            
            <p className="text-white/50 text-sm mt-4 text-center">
              You'll receive a welcome email after subscribing.
            </p>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Navigation;