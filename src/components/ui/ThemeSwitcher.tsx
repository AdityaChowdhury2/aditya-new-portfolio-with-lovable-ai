
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, Moon, Sun } from 'lucide-react';

const colorThemes = [
  { name: 'purple', primary: '250 95% 60%', secondary: '290 70% 50%', accent: '220 90% 60%' },
  { name: 'blue', primary: '220 100% 50%', secondary: '190 90% 50%', accent: '250 80% 60%' },
  { name: 'green', primary: '150 80% 40%', secondary: '170 70% 45%', accent: '130 60% 50%' },
  { name: 'orange', primary: '30 100% 50%', secondary: '20 90% 60%', accent: '40 100% 45%' },
  { name: 'pink', primary: '330 90% 55%', secondary: '350 80% 60%', accent: '315 80% 50%' },
];

const ThemeSwitcher: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState(0);

  useEffect(() => {
    // Check system preference for dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
    
    // Apply the default theme
    applyTheme(colorThemes[0]);
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark', !isDark);
  };

  const applyTheme = (theme: typeof colorThemes[0]) => {
    const root = document.documentElement;
    
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--secondary', theme.secondary);
    root.style.setProperty('--accent', theme.accent);
  };

  const handleThemeChange = (index: number) => {
    setActiveTheme(index);
    applyTheme(colorThemes[index]);
  };

  return (
    <motion.div 
      className="theme-switcher"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground"
      >
        <Palette size={18} />
      </button>
      
      {isOpen && (
        <motion.div 
          className="flex gap-2"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 'auto', opacity: 1 }}
        >
          {colorThemes.map((theme, index) => (
            <button 
              key={theme.name}
              className={`color-option ${activeTheme === index ? 'active' : ''}`}
              style={{ backgroundColor: `hsl(${theme.primary})` }}
              onClick={() => handleThemeChange(index)}
              aria-label={`Switch to ${theme.name} theme`}
            />
          ))}
          <button 
            onClick={toggleDarkMode} 
            className="w-6 h-6 rounded-full flex items-center justify-center bg-background text-foreground"
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ThemeSwitcher;
