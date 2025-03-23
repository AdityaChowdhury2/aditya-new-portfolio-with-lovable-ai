
import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';

// List of tech icons
const techIcons = [
  'html5', 'css3', 'javascript', 'typescript', 'react', 'angular',
  'nodejs', 'mongodb', 'firebase', 'git', 'github', 'tailwind',
  'express', 'ionic', 'vercel'
];

interface TechIconsBackgroundProps {
  animationType?: 'floating' | 'pulse' | 'orbit' | 'wave';
  density?: 'low' | 'medium' | 'high';
  speed?: 'slow' | 'medium' | 'fast';
}

const TechIconsBackground: React.FC<TechIconsBackgroundProps> = ({
  animationType = 'floating',
  density = 'medium',
  speed = 'medium',
}) => {
  const [icons, setIcons] = useState<{ icon: string; x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    // Determine how many icons to show based on density
    const iconCount = 
      density === 'low' ? 10 :
      density === 'medium' ? 20 :
      30;
    
    // Generate random positions for icons
    const newIcons = Array.from({ length: iconCount }, (_, i) => {
      return {
        icon: techIcons[i % techIcons.length],
        x: Math.random() * 100, // % position
        y: Math.random() * 100, // % position
        size: 24 + Math.random() * 24, // Size between 24px and 48px
        delay: Math.random() * 5, // Random delay for animation start
      };
    });
    
    setIcons(newIcons);
  }, [density]);

  // Determine animation speed
  const getDuration = () => {
    return speed === 'slow' ? 8 :
           speed === 'medium' ? 5 :
           3; // fast
  };

  // Get animation variants based on animation type
  const getAnimationVariants = (): Variants => {
    const duration = getDuration();
    
    switch (animationType) {
      case 'floating':
        return {
          animate: {
            y: ['-10px', '10px', '-10px'],
            rotate: ['-3deg', '3deg', '-3deg'],
            transition: {
              duration: duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          }
        };
      case 'pulse':
        return {
          animate: {
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
            transition: {
              duration: duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          }
        };
      case 'orbit':
        return {
          animate: {
            rotate: [0, 360],
            transition: {
              duration: duration * 2,
              repeat: Infinity,
              ease: 'linear',
            }
          }
        };
      case 'wave':
        return {
          animate: {
            x: ['-5px', '5px', '-5px'],
            y: ['-5px', '5px', '-5px'],
            transition: {
              duration: duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          }
        };
      default:
        return {
          animate: {
            y: ['-10px', '10px', '-10px'],
            transition: {
              duration: duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          }
        };
    }
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden opacity-5 pointer-events-none">
      {icons.map((icon, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            width: `${icon.size}px`,
            height: `${icon.size}px`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: icon.delay }}
          {...getAnimationVariants()}
        >
          <div 
            className="w-full h-full flex items-center justify-center text-primary"
            style={{ fontSize: `${icon.size}px` }}
          >
            <i className={`devicon-${icon.icon}-plain`}></i>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TechIconsBackground;
