
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';
import { initScrollAnimations, useSmoothScroll } from '@/utils/scrollUtils';
import { motion, AnimatePresence } from 'framer-motion';

const Index: React.FC = () => {
  useSmoothScroll();

  useEffect(() => {
    // Initialize scroll animations
    initScrollAnimations();
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative"
      >
        <Navbar />
        
        <main>
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Skills />
          <Contact />
        </main>
        
        <footer className="py-8 bg-secondary text-secondary-foreground">
          <div className="section-container">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm">© {new Date().getFullYear()} Aditya Chowdhury. All rights reserved.</p>
              </div>
              <div className="flex items-center space-x-4">
                <a href="#home" className="text-sm hover:text-primary-foreground/80 transition-colors">Back to Top</a>
                <span className="text-secondary-foreground/30">•</span>
                <a href="https://github.com/AdityaChowdhury2" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary-foreground/80 transition-colors">GitHub</a>
                <span className="text-secondary-foreground/30">•</span>
                <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary-foreground/80 transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
