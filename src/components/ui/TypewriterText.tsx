
import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 100,
  delay = 0,
  className = '',
  onComplete,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    
    // Initial delay before starting to type
    if (!started) {
      timeout = setTimeout(() => {
        setStarted(true);
      }, delay);
      return () => clearTimeout(timeout);
    }
    
    // Type characters one by one
    if (started && currentIndex < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    } else if (started && currentIndex === text.length && onComplete) {
      onComplete();
    }
  }, [started, currentIndex, text, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayText}
      <span className="inline-block w-[0.1em] h-[1.1em] bg-primary ml-0.5 relative -top-0.5 align-middle animate-type-cursor" />
    </span>
  );
};

export default TypewriterText;
