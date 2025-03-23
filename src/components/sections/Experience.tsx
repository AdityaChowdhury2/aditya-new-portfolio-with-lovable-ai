
import React from 'react';
import TimelineItem from '@/components/ui/TimelineItem';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/utils/scrollUtils';

interface Experience {
  id: number;
  title: string;
  company: string;
  date: string;
  description: string;
}

const experiences: Experience[] = [
  {
    id: 1,
    title: "Short Term Technical Assistance",
    company: "Excel Technologies Ltd.",
    date: "Mar 2024 - Nov 2024",
    description: "Created an Android Local-First application using Ionic Angular. Integrated with backend APIs and contributed to both frontend and backend development using Angular and NestJS for a POS application."
  },
  {
    id: 2,
    title: "Web Developer Intern",
    company: "Intelikart Services Pvt. Ltd., Gurgaon",
    date: "Jan 2024 - Apr 2024",
    description: "Created responsive user interfaces using Ionic, ensuring adaptability for both Android and iOS. Developed admin panels and plant panels for a laundry management system with user-friendly forms for admin functionalities."
  },
  {
    id: 3,
    title: "Master of Technology",
    company: "Brainware University, Kolkata",
    date: "Sep 2021 - Aug 2023",
    description: "Computer Science And Engineering - CGPA 9.37"
  },
  {
    id: 4,
    title: "Bachelor of Technology",
    company: "Brainware University, Kolkata",
    date: "Jul 2017 - Aug 2021",
    description: "Computer Science And Engineering - CGPA 8.01"
  }
];

const Experience: React.FC = () => {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2, rootMargin: "0px" });

  return (
    <section 
      id="experience" 
      className="min-h-screen flex flex-col justify-center relative py-20"
      ref={sectionRef}
    >
      <div className="section-container">
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          ref={ref as React.RefObject<HTMLDivElement>}
        >
          <h3 className="text-base font-medium text-primary mb-2">MY JOURNEY</h3>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience & Education</h2>
          <p className="text-muted-foreground">
            My professional journey and educational background have equipped me with the knowledge and skills
            to tackle complex challenges and deliver exceptional results.
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          {experiences.map((experience, index) => (
            <TimelineItem
              key={experience.id}
              title={experience.title}
              company={experience.company}
              date={experience.date}
              description={experience.description}
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
        
        <div className="max-w-3xl mx-auto mt-16">
          <h3 className="text-2xl font-bold mb-6">Certifications</h3>
          <ul className="space-y-4">
            <li className="glass-card p-4 transition-all hover:shadow-md">
              <div className="flex flex-col">
                <span className="text-primary text-sm">2023</span>
                <h4 className="text-lg font-medium">Complete Web Development Course</h4>
                <span className="text-muted-foreground">Programming Hero</span>
              </div>
            </li>
            <li className="glass-card p-4 transition-all hover:shadow-md">
              <div className="flex flex-col">
                <span className="text-primary text-sm">2020</span>
                <h4 className="text-lg font-medium">Node.js with Express</h4>
                <span className="text-muted-foreground">Self-Learning</span>
              </div>
            </li>
            <li className="glass-card p-4 transition-all hover:shadow-md">
              <div className="flex flex-col">
                <span className="text-primary text-sm">2018</span>
                <h4 className="text-lg font-medium">Problem-solving through programming in C</h4>
                <span className="text-muted-foreground">NPTEL Certification IIT KGP</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Experience;
