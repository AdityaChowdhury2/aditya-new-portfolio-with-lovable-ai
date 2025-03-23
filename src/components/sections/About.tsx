import React from 'react';
import { useIntersectionObserver } from '@/utils/scrollUtils';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const About: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2, rootMargin: '0px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="about" className="py-24 bg-white">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image column */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            // @ts-expect-error - framer-motion ref type
            ref={ref}
          >
            <div className="w-full h-[480px] rounded-2xl overflow-hidden bg-muted/50 relative">
              <div className="relative w-full h-full bg-gradient-to-tr from-muted to-muted/20 flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Profile Image</span>
              </div>
              
              <div className="absolute inset-0 border-4 border-white rounded-2xl transform rotate-3 translate-x-4 -translate-y-4 transition-transform duration-500 hover:rotate-0 hover:translate-x-0 hover:translate-y-0"></div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 p-6 bg-white shadow-lg rounded-2xl">
              <div className="text-center">
                <p className="text-lg font-bold">Barasat, West Bengal</p>
                <p className="text-sm text-muted-foreground">adityac5102@gmail.com</p>
              </div>
            </div>
          </motion.div>
          
          {/* Content column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-base font-medium text-primary mb-2">ABOUT ME</h3>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Full Stack Developer with passion for creating beautiful interfaces</h2>
            </motion.div>
            
            <motion.p variants={itemVariants} className="text-muted-foreground mb-6">
              I'm a Full Stack Developer based in West Bengal, India, with expertise in building modern web applications using React, Angular, and other cutting-edge technologies. I focus on creating elegant, user-friendly interfaces backed by robust, scalable backend systems.
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-muted-foreground mb-6">
              With a strong foundation in both frontend and backend development, I bring a holistic approach to every project. My goal is to deliver high-quality solutions that not only meet technical requirements but also provide exceptional user experiences.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-8">
              <a 
                href="https://github.com/AdityaChowdhury2" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-white hover:bg-muted/20 transition-colors"
              >
                <Github size={18} />
                <span>Github</span>
              </a>
              
              <a 
                href="https://linkedin.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-white hover:bg-muted/20 transition-colors"
              >
                <Linkedin size={18} />
                <span>LinkedIn</span>
              </a>
              
              <a 
                href="mailto:adityac5102@gmail.com" 
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-white hover:bg-muted/20 transition-colors"
              >
                <Mail size={18} />
                <span>Email</span>
              </a>
              
              <a 
                href="https://aditya-chowdhury.netlify.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-white hover:bg-muted/20 transition-colors"
              >
                <ExternalLink size={18} />
                <span>Website</span>
              </a>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <a 
                href="#projects" 
                className="button-primary"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View My Projects
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
