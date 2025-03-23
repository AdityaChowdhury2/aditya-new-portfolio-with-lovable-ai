import React from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/utils/scrollUtils';

interface Skill {
  name: string;
  level: number; // 0-100
}

const technicalSkills: Skill[] = [
  { name: "HTML", level: 95 },
  { name: "CSS", level: 90 },
  { name: "JavaScript", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "React", level: 90 },
  { name: "Angular", level: 80 },
  { name: "Tailwind CSS", level: 90 },
  { name: "Node.js", level: 75 },
  { name: "Express.js", level: 75 },
  { name: "MongoDB", level: 70 },
  { name: "Firebase", level: 80 },
  { name: "Git/GitHub", level: 85 },
];

const familiarSkills = [
  "Mongoose", "Material UI", "React Framer Animation", "ApexChart", 
  "Redux", "SQL", "React Native", "Python", "TanstackQuery", "Ionic"
];

const softSkills = [
  "Self-motivated", "Team collaboration", "Adaptability", "Problem-solving",
  "Communication", "Time management", "Critical thinking", "Attention to detail"
];

const SkillBar: React.FC<{ name: string; level: number; index: number; isVisible: boolean }> = ({ 
  name, 
  level, 
  index, 
  isVisible 
}) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
          style={{ 
            // For browsers that don't support motion.div
            width: isVisible ? `${level}%` : 0,
            transition: isVisible ? `width 1s ease-out ${index * 0.1}s` : 'none'
          }}
        />
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, rootMargin: '0px' });

  return (
    <section id="skills" className="py-24 bg-muted/30">
      <div className="section-container">
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          // @ts-expect-error - framer-motion ref type
          ref={ref}
        >
          <h3 className="text-base font-medium text-primary mb-2">MY EXPERTISE</h3>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Skills & Competencies</h2>
          <p className="text-muted-foreground">
            I've developed a diverse skill set throughout my career. Here's a comprehensive overview
            of my technical abilities and soft skills that I bring to every project.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <div className="glass-card p-8">
            <h3 className="text-xl font-bold mb-6">Technical Skills</h3>
            <div>
              {technicalSkills.map((skill, index) => (
                <SkillBar 
                  key={skill.name} 
                  name={skill.name} 
                  level={skill.level} 
                  index={index}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>
          
          {/* Other Skills */}
          <div className="space-y-8">
            {/* Technologies I'm Familiar With */}
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold mb-6">Familiar Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {familiarSkills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    className="px-3 py-1.5 bg-white border border-border rounded-full text-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.2 + (index * 0.05), 
                      ease: [0.22, 1, 0.36, 1] 
                    }}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Soft Skills */}
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold mb-6">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    className="px-3 py-1.5 bg-white border border-border rounded-full text-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.2 + (index * 0.05), 
                      ease: [0.22, 1, 0.36, 1] 
                    }}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Tools */}
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold mb-6">Tools & Platforms</h3>
              <ul className="grid grid-cols-2 gap-3 text-sm">
                <li className="flex items-center">
                  <span className="mr-2 w-2 h-2 bg-primary rounded-full"></span>
                  VS Code
                </li>
                <li className="flex items-center">
                  <span className="mr-2 w-2 h-2 bg-primary rounded-full"></span>
                  Git & GitHub
                </li>
                <li className="flex items-center">
                  <span className="mr-2 w-2 h-2 bg-primary rounded-full"></span>
                  Android Studio
                </li>
                <li className="flex items-center">
                  <span className="mr-2 w-2 h-2 bg-primary rounded-full"></span>
                  Vercel
                </li>
                <li className="flex items-center">
                  <span className="mr-2 w-2 h-2 bg-primary rounded-full"></span>
                  Netlify
                </li>
                <li className="flex items-center">
                  <span className="mr-2 w-2 h-2 bg-primary rounded-full"></span>
                  Render
                </li>
                <li className="flex items-center">
                  <span className="mr-2 w-2 h-2 bg-primary rounded-full"></span>
                  Firebase
                </li>
                <li className="flex items-center">
                  <span className="mr-2 w-2 h-2 bg-primary rounded-full"></span>
                  ERPNext
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
