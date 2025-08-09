'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

// Fade in animation component
export const FadeIn = ({ 
  children, 
  delay = 0, 
  duration = 0.6, 
  direction = 'up',
  className = '' 
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Scale in animation
export const ScaleIn = ({ 
  children, 
  delay = 0, 
  duration = 0.5,
  className = '' 
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Stagger children animation
export const StaggerContainer = ({ 
  children, 
  staggerDelay = 0.1,
  className = '' 
}: {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Floating animation
export const FloatingElement = ({ 
  children, 
  duration = 3,
  intensity = 10,
  className = '' 
}: {
  children: React.ReactNode;
  duration?: number;
  intensity?: number;
  className?: string;
}) => {
  return (
    <motion.div
      animate={{
        y: [-intensity, intensity, -intensity],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Pulse animation
export const PulseElement = ({ 
  children, 
  duration = 2,
  scale = 1.05,
  className = '' 
}: {
  children: React.ReactNode;
  duration?: number;
  scale?: number;
  className?: string;
}) => {
  return (
    <motion.div
      animate={{
        scale: [1, scale, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Slide in from direction
export const SlideIn = ({ 
  children, 
  direction = 'left',
  delay = 0,
  duration = 0.6,
  className = '' 
}: {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  duration?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const getInitialPosition = () => {
    switch (direction) {
      case 'left': return { x: -100, y: 0 };
      case 'right': return { x: 100, y: 0 };
      case 'up': return { x: 0, y: -100 };
      case 'down': return { x: 0, y: 100 };
      default: return { x: -100, y: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...getInitialPosition(),
      }}
      animate={isInView ? {
        opacity: 1,
        x: 0,
        y: 0,
      } : {}}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Rotate animation
export const RotateElement = ({ 
  children, 
  duration = 20,
  direction = 'clockwise',
  className = '' 
}: {
  children: React.ReactNode;
  duration?: number;
  direction?: 'clockwise' | 'counterclockwise';
  className?: string;
}) => {
  return (
    <motion.div
      animate={{
        rotate: direction === 'clockwise' ? 360 : -360,
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Counter animation
export const AnimatedCounter = ({ 
  from = 0, 
  to, 
  duration = 2,
  delay = 0,
  className = '' 
}: {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <motion.span
        initial={{ scale: 0.8 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
      >
        {isInView && (
          <motion.span
            initial={from}
            animate={to}
            transition={{ duration, delay: delay + 0.5, ease: 'easeOut' }}
          >
            {from}
          </motion.span>
        )}
      </motion.span>
    </motion.span>
  );
};

// Page transition wrapper
export const PageTransition = ({ 
  children,
  className = '' 
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Gradient text animation
export const AnimatedGradientText = ({ 
  children,
  className = '' 
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      className={`bg-gradient-to-r from-eco-green-500 via-deep-blue-500 to-warm-yellow-500 bg-clip-text text-transparent bg-300% ${className}`}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        backgroundSize: '300% 300%',
      }}
    >
      {children}
    </motion.div>
  );
};

// Hover animations
export const HoverScale = ({ 
  children, 
  scale = 1.05,
  duration = 0.2,
  className = '' 
}: {
  children: React.ReactNode;
  scale?: number;
  duration?: number;
  className?: string;
}) => {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: scale * 0.95 }}
      transition={{ duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Loading spinner
export const LoadingSpinner = ({ 
  size = 40,
  color = '#22c55e',
  className = '' 
}: {
  size?: number;
  color?: string;
  className?: string;
}) => {
  return (
    <motion.div
      className={`inline-block ${className}`}
      style={{
        width: size,
        height: size,
        border: `3px solid transparent`,
        borderTop: `3px solid ${color}`,
        borderRadius: '50%',
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
};

// Progress bar animation
export const AnimatedProgressBar = ({ 
  progress,
  duration = 1,
  delay = 0,
  className = '',
  color = 'bg-eco-green-500'
}: {
  progress: number;
  duration?: number;
  delay?: number;
  className?: string;
  color?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <motion.div
        className={`h-2 rounded-full ${color}`}
        initial={{ width: '0%' }}
        animate={isInView ? { width: `${progress}%` } : {}}
        transition={{ duration, delay, ease: 'easeOut' }}
      />
    </div>
  );
};

export default {
  FadeIn,
  ScaleIn,
  StaggerContainer,
  FloatingElement,
  PulseElement,
  SlideIn,
  RotateElement,
  AnimatedCounter,
  PageTransition,
  AnimatedGradientText,
  HoverScale,
  LoadingSpinner,
  AnimatedProgressBar,
};
