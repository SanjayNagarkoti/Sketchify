import React, { useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import Features from '../components/home/HowItWorks';
import ToolsShowcase from '../components/home/ToolsShowcase';
import About from '../components/home/About';
import Contact from '../components/home/Contact';
import Footer from '../components/layout/Footer';
import FloatingCTA from '../components/ui/FloatingCTA';
import { useBackgroundAnimation } from '../hooks/useBackgroundAnimation';

const Home: React.FC = () => {
  const theme = useTheme();
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  
  // Initialize the background animation
  useBackgroundAnimation();

  return (
    <Box 
      component={motion.div}
      sx={{ 
        minHeight: '100vh',
        position: 'relative',
        pt: '80px',
        overflowX: 'hidden',
        // Main fixed background with gradient 
        '&::before': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: theme.palette.mode === 'dark'
            ? `
              radial-gradient(circle at 30% 20%, rgba(78, 205, 196, 0.4) 0%, transparent 35%),
              radial-gradient(circle at 70% 70%, rgba(255, 107, 107, 0.4) 0%, transparent 35%),
              linear-gradient(135deg, #0f172a, #1e293b)
            `
            : `
              radial-gradient(circle at 30% 20%, rgba(78, 205, 196, 0.3) 0%, transparent 35%),
              radial-gradient(circle at 70% 70%, rgba(255, 107, 107, 0.3) 0%, transparent 35%),
              linear-gradient(135deg, #f8fcfc, #fff5f5)
            `,
          backgroundSize: '100% 100%, 100% 100%, 100% 100%',
          backgroundAttachment: 'fixed',
          zIndex: -3,
        },
        // Drawing tools pattern layer
        '&::after': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: theme.palette.mode === 'dark' ? 0.07 : 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M40 50l-8-8-8 8v60l8 8 8-8V50z' stroke='%234ECDC4' stroke-width='1.5'/%3E%3Cpath d='M24 38h32v4H24z' fill='%234ECDC4'/%3E%3Cpath d='M32 38l-4-10-4 10' stroke='%234ECDC4' stroke-width='1.5'/%3E%3Ccircle cx='120' cy='50' r='12' stroke='%23FF6B6B' stroke-width='1.5'/%3E%3Ccircle cx='120' cy='50' r='6' fill='%23FF6B6B' opacity='0.5'/%3E%3Cpath d='M120 62v30' stroke='%23FF6B6B' stroke-width='1.5' stroke-dasharray='4,4'/%3E%3Cpath d='M60 120l10 10 50-50-10-10-50 50z' fill='%234ECDC4' opacity='0.3'/%3E%3Cpath d='M60 120l10 10 50-50-10-10-50 50z' stroke='%234ECDC4' stroke-width='1'/%3E%3Cpath d='M110 80l10-10 5 15-15-5z' fill='%234ECDC4'/%3E%3Cpath d='M142 120c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10z' stroke='%23FF6B6B' stroke-width='1.5'/%3E%3Cpath d='M142 120v20M137 140h10' stroke='%23FF6B6B' stroke-width='1.5'/%3E%3Cpath d='M150 30l-5-10-5 10v10h10V30z' fill='%23FF6B6B' opacity='0.4'/%3E%3Cpath d='M150 30l-5-10-5 10v10h10V30z' stroke='%23FF6B6B' stroke-width='1'/%3E%3Cpath d='M40 160c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10z' stroke='%234ECDC4' stroke-width='1.5'/%3E%3Cpath d='M35 155h10M40 150v10' stroke='%234ECDC4' stroke-width='1.5'/%3E%3Crect x='80' y='140' width='20' height='10' rx='2' stroke='%23FF6B6B' stroke-width='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundAttachment: 'fixed',
          backgroundSize: '180px 180px',
          zIndex: -2,
        },
        // Texture overlay
        '.texture-overlay': {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: theme.palette.mode === 'dark'
            ? `url("data:image/svg+xml,%3Csvg viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            : `url("data:image/svg+xml,%3Csvg viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: theme.palette.mode === 'dark' ? 0.03 : 0.02,
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          zIndex: -1,
        },
        // Brush strokes
        '.brush-strokes': {
          position: 'fixed',
          top: '5%',
          right: '10%',
          width: '40%',
          height: '30%',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='100' viewBox='0 0 200 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 80c30-40 50-30 70-20 20 10 30 10 50-10 20-20 40-20 60 0' stroke='%23FF6B6B' stroke-width='2' fill='none' stroke-linecap='round' opacity='0.1'/%3E%3Cpath d='M30 50c20-30 40-20 60-10 30 15 40 5 60-15' stroke='%234ECDC4' stroke-width='2' fill='none' stroke-linecap='round' opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          zIndex: -1,
          opacity: 0.6,
        },
        '.brush-strokes-2': {
          position: 'fixed',
          bottom: '10%',
          left: '5%',
          width: '35%',
          height: '25%',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='100' viewBox='0 0 200 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M190 20c-30 40-50 30-70 20-20-10-30-10-50 10-20 20-40 20-60 0' stroke='%234ECDC4' stroke-width='2' fill='none' stroke-linecap='round' opacity='0.1'/%3E%3Cpath d='M170 70c-20 20-40 10-60 0-30-15-40-5-60 15' stroke='%23FF6B6B' stroke-width='2' fill='none' stroke-linecap='round' opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          zIndex: -1,
          opacity: 0.6,
        },
        // Canvas grid (subtle)
        '.canvas-grid': {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: theme.palette.mode === 'dark'
            ? `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), 
               linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`
            : `linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px), 
               linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          zIndex: -1,
          opacity: 0.5,
        },
        // Floating elements
        '.floating-dots': {
          position: 'fixed',
          width: '100%',
          height: '100%',
          zIndex: -1,
          'canvas': {
            position: 'absolute',
            top: 0,
            left: 0
          }
        },
        // Animated wave effect
        '.wave-container': {
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          height: '300px',
          overflow: 'hidden',
          zIndex: -1,
          opacity: 0.4,
          '.wave': {
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '200%',
            height: '100%',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath fill='%234ECDC4' opacity='0.3' d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z'%3E%3C/path%3E%3Cpath fill='%23FF6B6B' opacity='0.2' d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z'%3E%3C/path%3E%3Cpath fill='%234ECDC4' opacity='0.2' d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundSize: '50% 100%',
            animation: 'wave 25s linear infinite',
            '&:nth-of-type(2)': {
              bottom: '5px',
              animation: 'wave 20s linear -5s reverse infinite',
              opacity: 0.8,
            },
            '&:nth-of-type(3)': {
              bottom: '10px',
              animation: 'wave 30s linear -2s infinite',
              opacity: 0.6,
            },
            '@keyframes wave': {
              '0%': { transform: 'translateX(0)' },
              '50%': { transform: 'translateX(-25%)' },
              '100%': { transform: 'translateX(-50%)' }
            }
          }
        }
      }}
    >
      {/* Background elements */}
      <Box className="texture-overlay" />
      <Box className="brush-strokes" />
      <Box className="brush-strokes-2" />
      <Box className="canvas-grid" />
      
      {/* Floating dots */}
      <Box className="floating-dots" />
      
      {/* Wave effect */}
      <Box className="wave-container">
        <Box className="wave" />
        <Box className="wave" />
        <Box className="wave" />
      </Box>

      <Navbar />
      
      {/* Hero Section with animated background */}
      <Box
        component={motion.div}
        style={{ y: backgroundY }}
        sx={{ position: 'relative', zIndex: 1 }}
      >
      <Hero />
      </Box>
      
      {/* Features with scroll animations */}
      <Box sx={{ position: 'relative', zIndex: 2 }}>
      <Features />
      </Box>
      
      {/* ToolsShowcase */}
      <Box 
        sx={{ 
          position: 'relative', 
          zIndex: 2,
          background: theme.palette.mode === 'dark'
            ? 'rgba(15, 23, 42, 0.7)'
            : 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          py: 8
        }}
      >
        <ToolsShowcase />
      </Box>
      
      <About />
      <Contact />
      <Footer />
      <FloatingCTA />
    </Box>
  );
};

export default Home; 