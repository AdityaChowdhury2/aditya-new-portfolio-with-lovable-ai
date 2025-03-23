import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/utils/scrollUtils';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';

const Contact: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2, rootMargin: '0px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Thank you for your message! I will get back to you soon.', {
        position: 'bottom-right',
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="contact" className="py-24 bg-white">
      <div className="section-container">
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          // @ts-expect-error - framer-motion ref type
          ref={ref}
        >
          <h3 className="text-base font-medium text-primary mb-2">GET IN TOUCH</h3>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Me</h2>
          <p className="text-muted-foreground">
            Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you!
            Fill out the form below or reach out to me directly through the provided contact information.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="glass-card p-8"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <form onSubmit={handleSubmit}>
              <motion.div className="mb-6" variants={itemVariants}>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all bg-white/50"
                  placeholder="Your name"
                  required
                />
              </motion.div>
              
              <motion.div className="mb-6" variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all bg-white/50"
                  placeholder="Your email address"
                  required
                />
              </motion.div>
              
              <motion.div className="mb-6" variants={itemVariants}>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all bg-white/50"
                  placeholder="Subject of your message"
                  required
                />
              </motion.div>
              
              <motion.div className="mb-6" variants={itemVariants}>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all bg-white/50"
                  placeholder="Your message"
                  required
                ></textarea>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <button 
                  type="submit" 
                  className="button-primary w-full flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </motion.div>
            </form>
          </motion.div>
          
          {/* Contact Information */}
          <div>
            <motion.div 
              className="glass-card p-8 mb-8"
              initial={{ opacity: 0, x: 30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:adityac5102@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                      adityac5102@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href="tel:+919875304134" className="text-muted-foreground hover:text-primary transition-colors">
                      +91 9875 304 134
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">
                      Barasat, West Bengal, India
                    </p>
                  </div>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="glass-card p-8"
              initial={{ opacity: 0, x: 30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-xl font-bold mb-6">Let's Connect</h3>
              <p className="text-muted-foreground mb-6">
                Whether you're looking for a developer for your project, have a question, or just want to say hello, 
                I'm always open to new opportunities and connections.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://github.com/AdityaChowdhury2" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </a>
                <a 
                  href="https://linkedin.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a 
                  href="mailto:adityac5102@gmail.com"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
