
import React from 'react';
import { useIntersectionObserver } from '@/utils/scrollUtils';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface TimelineItemProps {
  title: string;
  company: string;
  date: string;
  description: string;
  index: number;
  isLast: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  company,
  date,
  description,
  index,
  isLast,
}) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2, rootMargin: '0px' });
  const isEven = index % 2 === 0;

  const variants = {
    hidden: { opacity: 0, x: isEven ? -20 : 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="relative mb-12 last:mb-0">
      <div className="flex items-center gap-4">
        {/* Timeline connector */}
        <div className="flex flex-col items-center">
          <div 
            className={cn(
              "relative h-8 w-8 rounded-full border-4 border-background bg-primary z-10 flex items-center justify-center",
              isVisible ? "animate-scale-in" : "opacity-0",
            )}
          >
            <span className="text-white text-xs font-bold">{index + 1}</span>
          </div>
          {!isLast && (
            <div className={cn(
              "w-0.5 bg-border h-full flex-1 transition-transform duration-1000 ease-out-expo",
              isVisible ? "origin-top scale-y-100" : "origin-top scale-y-0",
            )} />
          )}
        </div>

        {/* Content */}
        <motion.div
          // @ts-expect-error - framer-motion ref type
          ref={ref}
          className="flex-1 glass-card p-6"
          variants={variants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-primary">{date}</span>
            <h3 className="text-xl font-bold">{title}</h3>
            <span className="text-base font-medium text-muted-foreground">{company}</span>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TimelineItem;
