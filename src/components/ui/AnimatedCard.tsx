
import React, { useState } from 'react';
import { useIntersectionObserver } from '@/utils/scrollUtils';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface AnimatedCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  index: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  title,
  description,
  image,
  tags,
  link,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ref, isVisible] = useIntersectionObserver();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <motion.div
      // @ts-expect-error - framer-motion ref type
      ref={ref}
      className="group h-full"
      variants={cardVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      custom={index}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full flex flex-col rounded-2xl overflow-hidden bg-white shadow-md transition-all duration-500 hover:shadow-xl border border-border">
        <div className="relative w-full h-64 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        <div className="flex-1 p-6 flex flex-col">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-xl tracking-tight">{title}</h3>
            <span className="p-2 rounded-full bg-muted/50 text-muted-foreground/70 transform group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <ArrowUpRight size={16} />
            </span>
          </div>
          
          <p className="text-muted-foreground text-sm mb-4 flex-1">{description}</p>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag, i) => (
              <span 
                key={i} 
                className="px-3 py-1 text-xs font-medium rounded-full bg-muted/50 text-muted-foreground/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <a href={link} className="absolute inset-0" target="_blank" rel="noopener noreferrer">
          <span className="sr-only">View project: {title}</span>
        </a>
      </div>
    </motion.div>
  );
};

export default AnimatedCard;
