
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children?: React.ReactNode;
  className?: string;
  hoverEffect?: 'scale' | 'lift' | 'glow' | 'none';
  delay?: number;
  title?: string;
  description?: string;
  image?: string;
  tags?: string[];
  link?: string;
  index?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className,
  hoverEffect = 'lift',
  delay = 0,
  title,
  description,
  image,
  tags,
  link,
  index
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getHoverAnimation = () => {
    switch (hoverEffect) {
      case 'scale':
        return { scale: 1.03 };
      case 'lift':
        return { y: -10 };
      case 'glow':
        return { boxShadow: '0 0 15px rgba(var(--primary-rgb), 0.5)' };
      case 'none':
        return {};
      default:
        return { y: -10 };
    }
  };

  // If we have project data, render project card, otherwise just render the children
  if (title && description) {
    return (
      <motion.div
        className={cn(
          'bg-card rounded-lg overflow-hidden border border-border transition-all h-full flex flex-col',
          isHovered && hoverEffect === 'glow' && 'glow-effect',
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay || (index ? index * 0.2 : 0) }}
        whileHover={getHoverAnimation()}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {image && (
          <div className="h-48 overflow-hidden">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
            />
          </div>
        )}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4 flex-grow">{description}</p>
          
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, i) => (
                <span 
                  key={i} 
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {link && (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-1 text-sm font-medium"
            >
              View Project 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn(
        'bg-card rounded-lg p-6 border border-border transition-all',
        isHovered && hoverEffect === 'glow' && 'glow-effect',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={getHoverAnimation()}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
