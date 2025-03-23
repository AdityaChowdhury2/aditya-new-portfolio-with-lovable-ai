
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: 'scale' | 'lift' | 'glow' | 'none';
  delay?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className,
  hoverEffect = 'lift',
  delay = 0,
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
