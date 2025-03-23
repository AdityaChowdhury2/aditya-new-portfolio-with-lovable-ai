
import React, { useState, useEffect } from 'react';
import TypewriterText from '@/components/ui/TypewriterText';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Small delay before showing content for initial animation
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleScrollDown = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-background to-muted/30">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-2/3 h-2/3 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 rounded-full bg-secondary/5 blur-3xl" />
      </div>
      
      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium tracking-wide">
              Full Stack Developer
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight"
            initial={{ opacity: 0 }}
            animate={showContent ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <TypewriterText 
              text="Hi, I'm Aditya Chowdhury" 
              speed={80} 
              delay={1000}
              className="inline-block"
            />
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={showContent ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            I create elegant digital experiences with cutting-edge technologies, bringing innovative ideas to life through clean code and thoughtful design.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <a 
              href="#projects" 
              className="button-primary w-full sm:w-auto"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              className="button-secondary w-full sm:w-auto"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact Me
            </a>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce-subtle">
        <button 
          className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md border border-border/20 text-foreground/70 hover:text-foreground transition-colors"
          onClick={handleScrollDown}
          aria-label="Scroll down"
        >
          <ArrowDown size={20} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
