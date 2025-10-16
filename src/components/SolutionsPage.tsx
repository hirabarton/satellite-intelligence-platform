"use client";

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navigation from './Navigation';
import Footer from './Footer';

/**
 * Solutions Page Component
 * 
 * Features:
 * - Hero section with engaging visuals
 * - Core solutions breakdown (AI/ML, Quantum, Custom Dev, Data Analytics)
 * - Case studies section
 * - Client testimonials
 * - Contact form integration
 * - Professional aerospace aesthetic matching the platform
 */
export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
          
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30"
              initial={{ 
                x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1200, 
                y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800 
              }}
              animate={{ 
                x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1200, 
                y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800 
              }}
              transition={{ 
                duration: 10 + Math.random() * 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6 tracking-tight"
            style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Tailored Solutions for 
            <span className="text-blue-400 block">Complex Challenges</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto"
            style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore a range of services designed to solve intricate problems using cutting-edge technologies.
          </motion.p>
          
          <motion.button 
            className="px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onClick={() => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Our Solutions
          </motion.button>
        </div>
      </section>

      {/* Section 1: What We Do */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
        {/* Background Symbol */}
        <div 
          className="absolute inset-0 opacity-[0.15] pointer-events-none"
          style={{
            backgroundImage: "url('/symbol.png')",
            backgroundSize: '800px 800px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            filter: 'brightness(0.4) contrast(1.2)'
          }}
        />
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-8 tracking-tight"
            style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Innovative Solutions, <span className="text-blue-400">Customized for Unique Needs</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-4xl mx-auto mb-16"
            style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Crafting custom solutions that leverage AI, Machine Learning, and Quantum Technologies to tackle unique challenges. 
            Whether it&apos;s predictive analytics, real-time insights, or scalable applications, the expertise and innovation 
            necessary to drive success are integrated into every solution.
          </motion.p>

          {/* Technology Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['AI', 'ML', 'Quantum', 'Analytics'].map((tech, index) => (
              <motion.div 
                key={tech}
                className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-400 transition-colors"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-bold text-blue-400 mb-2">{tech}</div>
                <div className="text-sm text-gray-400">Technology</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Solutions Breakdown */}
      <section id="solutions" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
              Core <span className="text-blue-400">Solutions</span>
            </h2>
            <p className="text-xl text-gray-300" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
              Explore services that power intelligent, data-driven outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Solution 1: AI & Machine Learning */}
            <motion.div 
              className="group relative backdrop-blur-2xl bg-gradient-to-br from-white/[0.15] via-white/[0.08] to-white/[0.02] p-8 rounded-3xl border border-white/30 hover:border-blue-400/60 hover:from-white/20 hover:via-white/12 hover:to-white/[0.04] transition-all duration-500 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:shadow-[0_16px_48px_0_rgba(59,130,246,0.2)] backdrop-saturate-150"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-4 tracking-tight" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>AI & Machine Learning</h3>
              <p className="text-gray-200 mb-6" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                Harness the power of AI and ML to uncover insights, automate processes, and predict outcomes.
              </p>
              <ul className="text-gray-300 mb-6 space-y-2" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                <li>• Predictive analytics</li>
                <li>• Automated decision-making</li>
                <li>• Data modeling & optimization</li>
              </ul>
              <button className="px-8 py-3 bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-400/50 text-blue-300 hover:from-blue-500/30 hover:to-blue-600/30 hover:border-blue-300 hover:text-white backdrop-blur-lg transition-all duration-300 rounded-xl font-medium transform hover:scale-105 hover:shadow-lg" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                Learn More About AI Solutions
              </button>
            </motion.div>

            {/* Solution 2: Quantum Computing */}
            <motion.div 
              className="group relative backdrop-blur-2xl bg-gradient-to-br from-white/[0.15] via-white/[0.08] to-white/[0.02] p-8 rounded-3xl border border-white/30 hover:border-blue-400/60 hover:from-white/20 hover:via-white/12 hover:to-white/[0.04] transition-all duration-500 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:shadow-[0_16px_48px_0_rgba(59,130,246,0.2)] backdrop-saturate-150"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-4 tracking-tight" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>Quantum Computing</h3>
              <p className="text-gray-200 mb-6" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                Leverage quantum computing for problem-solving and advanced simulations.
              </p>
              <ul className="text-gray-300 mb-6 space-y-2" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                <li>• Quantum algorithms</li>
                <li>• Optimized problem-solving</li>
                <li>• Complex simulations</li>
              </ul>
              <button className="px-8 py-3 bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-400/50 text-blue-300 hover:from-blue-500/30 hover:to-blue-600/30 hover:border-blue-300 hover:text-white backdrop-blur-lg transition-all duration-300 rounded-xl font-medium transform hover:scale-105 hover:shadow-lg" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                Learn More About Quantum Solutions
              </button>
            </motion.div>

            {/* Solution 3: Custom Software Development */}
            <motion.div 
              className="group relative backdrop-blur-2xl bg-gradient-to-br from-white/[0.15] via-white/[0.08] to-white/[0.02] p-8 rounded-3xl border border-white/30 hover:border-blue-400/60 hover:from-white/20 hover:via-white/12 hover:to-white/[0.04] transition-all duration-500 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:shadow-[0_16px_48px_0_rgba(59,130,246,0.2)] backdrop-saturate-150"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-4 tracking-tight" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>Custom Software Development</h3>
              <p className="text-gray-200 mb-6" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                Create tailored applications aligned with specific business needs, from design to deployment.
              </p>
              <ul className="text-gray-300 mb-6 space-y-2" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                <li>• End-to-end software development</li>
                <li>• Scalable, user-friendly interfaces</li>
                <li>• Seamless integration with existing systems</li>
              </ul>
              <button className="px-8 py-3 bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-400/50 text-blue-300 hover:from-blue-500/30 hover:to-blue-600/30 hover:border-blue-300 hover:text-white backdrop-blur-lg transition-all duration-300 rounded-xl font-medium transform hover:scale-105 hover:shadow-lg" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                Explore Development Services
              </button>
            </motion.div>

            {/* Solution 4: Data Analytics & Management */}
            <motion.div 
              className="group relative backdrop-blur-2xl bg-gradient-to-br from-white/[0.15] via-white/[0.08] to-white/[0.02] p-8 rounded-3xl border border-white/30 hover:border-blue-400/60 hover:from-white/20 hover:via-white/12 hover:to-white/[0.04] transition-all duration-500 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:shadow-[0_16px_48px_0_rgba(59,130,246,0.2)] backdrop-saturate-150"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-4 tracking-tight" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>Data Analytics & Management</h3>
              <p className="text-gray-200 mb-6" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                Turn data into actionable insights with advanced analytics and management solutions.
              </p>
              <ul className="text-gray-300 mb-6 space-y-2" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                <li>• Real-time dashboards</li>
                <li>• Custom data visualizations</li>
                <li>• Business intelligence tools</li>
              </ul>
              <button className="px-8 py-3 bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-400/50 text-blue-300 hover:from-blue-500/30 hover:to-blue-600/30 hover:border-blue-300 hover:text-white backdrop-blur-lg transition-all duration-300 rounded-xl font-medium transform hover:scale-105 hover:shadow-lg" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                Discover Data Insights
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Case Studies */}
      <section className="py-24 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
              Real-World <span className="text-blue-400">Impact</span>
            </h2>
            <p className="text-xl text-gray-300" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
              Solutions have helped businesses across industries solve their most challenging problems. 
              Here are just a few examples.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Case Study 1 */}
            <motion.div 
              className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-400 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-blue-400 mb-4">AI-Powered Predictive Analytics</h3>
              <p className="text-gray-300 mb-4">
                Implemented machine learning algorithms that improved forecasting accuracy by 40% for a Fortune 500 company.
              </p>
              <button className="text-blue-400 hover:text-blue-300 transition-colors">
                View Case Study →
              </button>
            </motion.div>

            {/* Case Study 2 */}
            <motion.div 
              className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-400 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-blue-400 mb-4">Quantum Optimization Solution</h3>
              <p className="text-gray-300 mb-4">
                Developed quantum computing algorithms that reduced processing time by 60% for complex logistics planning.
              </p>
              <button className="text-blue-400 hover:text-blue-300 transition-colors">
                View Case Study →
              </button>
            </motion.div>

            {/* Case Study 3 */}
            <motion.div 
              className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-400 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-blue-400 mb-4">Custom Enterprise Platform</h3>
              <p className="text-gray-300 mb-4">
                Built a scalable platform that helped a startup scale from 100 to 10,000 users while maintaining performance.
              </p>
              <button className="text-blue-400 hover:text-blue-300 transition-colors">
                View Case Study →
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: Testimonials - Commented out until we have customers */}
      {/*
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-montserrat)]">
              What Clients <span className="text-blue-400">Say</span>
            </h2>
            <p className="text-xl text-gray-300 font-[family-name:var(--font-inter)]">
              Businesses trust the solutions to deliver transformative results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-lg border border-gray-700"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-gray-300 mb-6 italic">
                "The AI solutions transformed our data analysis capabilities. We're now making decisions 
                faster and with greater confidence than ever before."
              </div>
              <div className="text-blue-400 font-semibold">Sarah Chen</div>
              <div className="text-gray-500">CTO, TechCorp Industries</div>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-lg border border-gray-700"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-gray-300 mb-6 italic">
                "The quantum computing implementation exceeded our expectations. Complex problems that 
                took hours now solve in minutes."
              </div>
              <div className="text-blue-400 font-semibold">Dr. Michael Rodriguez</div>
              <div className="text-gray-500">Research Director, Quantum Dynamics</div>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-lg border border-gray-700"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-gray-300 mb-6 italic">
                "Outstanding custom development work. The platform scales beautifully and our users 
                love the intuitive interface."
              </div>
              <div className="text-blue-400 font-semibold">Emily Johnson</div>
              <div className="text-gray-500">CEO, Innovation Labs</div>
            </motion.div>
          </div>
        </div>
      </section>
      */}

      {/* Section 5: Get Started */}
      <section className="py-24 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-8 tracking-tight"
            style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to <span className="text-blue-400">Transform?</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 mb-12"
            style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Explore how tailored solutions can solve business challenges. Contact today to get started!
          </motion.p>
          
          <motion.div 
            className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <button className="px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Schedule a Consultation
            </button>
            <button className="px-12 py-4 border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black rounded-lg text-lg font-semibold transition-all duration-300">
              View Our Portfolio
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}