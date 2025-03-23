
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Define tech stack icons
const techIcons = [
  { name: 'HTML', icon: '🌐' },
  { name: 'CSS', icon: '🎨' },
  { name: 'JavaScript', icon: '📜' },
  { name: 'React', icon: '⚛️' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'Firebase', icon: '🔥' },
  { name: 'Git', icon: '📊' },
  { name: 'Tailwind', icon: '💨' },
  { name: 'Angular', icon: '🔺' },
  { name: 'Express', icon: '🚂' },
];

interface TechIconProps {
  icon: string;
  name: string;
  style: React.CSSProperties;
  animationType: 'floating' | 'pulsing' | 'flying' | 'streaking' | 'orbiting';
}

const TechIcon: React.FC<TechIconProps> = ({ icon, name, style, animationType }) => {
  const variants = {
    floating: { y: [0, -20, 0], rotate: [0, 180, 360], transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' } },
    pulsing: { scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7], transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' } },
    flying: { 
      initial: { opacity: 0, x: -100 },
      animate: { opacity: 1, x: 0, transition: { duration: 0.8 } }
    },
    streaking: { 
      x: ['calc(-100vw - 100px)', 'calc(100vw + 100px)'], 
      y: ['calc(-20vh)', 'calc(120vh)'],
      opacity: [0, 0.7, 0],
      scale: [0.5, 1.5],
      transition: { 
        duration: 6, 
        repeat: Infinity, 
        ease: 'linear',
        times: [0, 0.1, 0.9, 1],
        repeatDelay: Math.random() * 5 
      }
    },
    orbiting: {
      rotate: [0, 360],
      transition: { duration: 20, repeat: Infinity, ease: 'linear' }
    }
  };

  if (animationType === 'streaking') {
    return (
      <motion.div
        className="tech-icon streaking-icon"
        style={style}
        variants={variants}
        animate={animationType}
        title={name}
      >
        <span className="text-4xl">{icon}</span>
      </motion.div>
    );
  }

  if (animationType === 'orbiting') {
    return (
      <motion.div
        className="tech-icon absolute"
        style={{
          ...style,
          transformOrigin: 'center',
        }}
        variants={variants}
        animate={animationType}
        title={name}
      >
        <span className="text-3xl">{icon}</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`tech-icon ${animationType}-icon`}
      style={style}
      variants={variants[animationType === 'flying' ? 'flying' : animationType]}
      initial={animationType === 'flying' ? "initial" : undefined}
      animate={animationType === 'flying' ? "animate" : animationType}
      title={name}
    >
      <span className="text-3xl">{icon}</span>
    </motion.div>
  );
};

interface TechIconsBackgroundProps {
  animationType?: 'floating' | 'pulsing' | 'flying' | 'streaking' | 'orbiting';
}

const TechIconsBackground: React.FC<TechIconsBackgroundProps> = ({ 
  animationType = 'floating'
}) => {
  const [icons, setIcons] = useState<Array<{ top: number; left: number; delay: number; icon: string; name: string; }>>([]);

  useEffect(() => {
    // Generate random positions for icons
    const generatedIcons = techIcons.map((tech) => {
      if (animationType === 'orbiting') {
        const angle = Math.random() * Math.PI * 2;
        const radius = 30 + Math.random() * 20; // 30-50% of viewport width
        
        return {
          top: 50 + Math.sin(angle) * radius, // 50% + offset
          left: 50 + Math.cos(angle) * radius, // 50% + offset
          delay: Math.random() * 10,
          icon: tech.icon,
          name: tech.name,
        };
      }
      
      return {
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        icon: tech.icon,
        name: tech.name,
      };
    });
    
    setIcons(generatedIcons);
  }, [animationType]);

  if (animationType === 'orbiting') {
    return (
      <div className="tech-background">
        <div className="orbit-container">
          <motion.div
            className="orbit"
            animate={{ rotateY: [0, 360], rotateX: [0, 180] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            {icons.map((icon, index) => (
              <TechIcon
                key={index}
                icon={icon.icon}
                name={icon.name}
                style={{
                  top: `${icon.top}%`,
                  left: `${icon.left}%`,
                  transform: `rotateY(${index * (360 / icons.length)}deg) translateZ(15vw)`,
                }}
                animationType={animationType}
              />
            ))}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="tech-background">
      {icons.map((icon, index) => (
        <TechIcon
          key={index}
          icon={icon.icon}
          name={icon.name}
          style={{
            top: `${icon.top}%`,
            left: `${icon.left}%`,
            animationDelay: `${icon.delay}s`
          }}
          animationType={animationType}
        />
      ))}
    </div>
  );
};

export default TechIconsBackground;
