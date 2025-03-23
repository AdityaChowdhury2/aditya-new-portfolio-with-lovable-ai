import React from 'react';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/utils/scrollUtils';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "TechTrove",
    description: "A future tech listing website with user authentication, product management, and an admin dashboard featuring analytics visualizations.",
    image: "https://placehold.co/600x400/e2e8f0/64748b?text=TechTrove",
    tags: ["React", "Material UI", "Firebase", "MongoDB", "Express.js"],
    link: "https://github.com/AdityaChowdhury2",
  },
  {
    id: 2,
    title: "Majesty Royal",
    description: "Hotel booking website with robust user verification using JWT, providing a secure and trustworthy environment for users.",
    image: "https://placehold.co/600x400/e2e8f0/64748b?text=Majesty+Royal",
    tags: ["React", "Tailwind CSS", "Firebase", "MongoDB", "Express.js"],
    link: "https://github.com/AdityaChowdhury2",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "Modern portfolio website showcasing my skills and projects with smooth animations and interactive elements.",
    image: "https://placehold.co/600x400/e2e8f0/64748b?text=Portfolio",
    tags: ["React", "Framer Motion", "Tailwind CSS"],
    link: "https://aditya-chowdhury.netlify.app/",
  }
];

const Projects: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, rootMargin: '0px' });

  return (
    <section id="projects" className="py-24 bg-muted/30">
      <div className="section-container">
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          ref={ref}
        >
          <h3 className="text-base font-medium text-primary mb-2">MY WORK</h3>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Featured Projects</h2>
          <p className="text-muted-foreground">
            Here are some of my recent projects that showcase my skills and expertise in web development. 
            Each project represents my passion for creating elegant, user-friendly digital experiences.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <AnimatedCard 
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              link={project.link}
              index={index}
            />
          ))}
        </div>
        
        <div className="text-center mt-16">
          <a 
            href="https://github.com/AdityaChowdhury2" 
            className="button-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
