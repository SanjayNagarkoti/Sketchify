import React from 'react';
import { Box, Container, Grid, Typography, Button, useTheme, Avatar, Paper, Stack, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import EastIcon from '@mui/icons-material/East';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import MemoryIcon from '@mui/icons-material/Memory';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import DevicesIcon from '@mui/icons-material/Devices';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  const theme = useTheme();
  
  // Feature list for "Why Choose Sketchify"
  const features = [
    {
      icon: <AutoFixHighIcon />,
      title: "AI-Powered Precision",
      description: "Our advanced algorithms understand your sketches with remarkable accuracy, delivering results that match your intent."
    },
    {
      icon: <MemoryIcon />,
      title: "Cutting-Edge Technology",
      description: "Built on state-of-the-art machine learning models trained on millions of design samples and code patterns."
    },
    {
      icon: <SecurityIcon />,
      title: "Secure & Private",
      description: "Your sketches and data remain private and secure. We never store your designs without your permission."
    },
    {
      icon: <SpeedIcon />,
      title: "Lightning Fast",
      description: "Get results in seconds, not minutes. Our optimization makes complex AI processing incredibly fast."
    },
    {
      icon: <DevicesIcon />,
      title: "Cross-Platform",
      description: "Works seamlessly across all your devices - desktop, tablet, or mobile with a consistent experience."
    },
    {
      icon: <CelebrationIcon />,
      title: "Constantly Improving",
      description: "We regularly update our AI models and add new features based on user feedback and technological advances."
    }
  ];

  return (
    <Box 
      component="section"
      id="about" 
      sx={{ 
        position: 'relative',
        py: { xs: 10, md: 16 },
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(180deg, rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.9))' 
          : 'linear-gradient(180deg, rgba(248, 250, 252, 0.7), rgba(248, 250, 252, 0.9))',
      }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '40%',
          height: '50%',
          opacity: 0.4,
          background: `url("data:image/svg+xml,%3Csvg width='300' height='300' viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='150' cy='150' r='100' stroke='%234ECDC4' stroke-width='2' fill='none' stroke-dasharray='8 12' opacity='0.2'/%3E%3Ccircle cx='150' cy='150' r='70' stroke='%23FF6B6B' stroke-width='2' fill='none' stroke-dasharray='6 8' opacity='0.2'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          zIndex: -1,
        }}
      />
      
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center">
          {/* About content */}
          <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Box>
                <Typography
                  variant="overline"
                  sx={{
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    fontWeight: 600,
                    letterSpacing: 1.2,
                    mb: 2,
                    color: theme.palette.mode === 'dark' ? '#4ECDC4' : '#4ECDC4',
                    textTransform: 'uppercase',
                    display: 'block',
                  }}
                >
                  Our Story
                </Typography>
                
        <Typography 
          variant="h2" 
                  component="h2"
          sx={{ 
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                    fontWeight: 800,
                    mb: 3,
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(90deg, #4ECDC4, #FF6B6B)'
                      : 'linear-gradient(90deg, #4ECDC4, #FF6B6B)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                  }}
                >
                  Bridging Creativity & Technology
                </Typography>
                
                <Typography 
                  variant="body1"
                  sx={{ 
                    fontSize: '1.1rem',
                    mb: 3,
                    color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                    lineHeight: 1.8,
                  }}
                >
                  Sketchify began with a simple question: <strong>what if turning a sketch into functional code or finding similar images was as easy as drawing?</strong> Founded in 2023, our team of AI researchers and design enthusiasts set out to bridge the gap between creative expression and technological implementation.
                </Typography>
                
                <Typography 
                  variant="body1"
                  sx={{ 
                    fontSize: '1.1rem',
                    mb: 3,
                    color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                    lineHeight: 1.8,
                  }}
                >
                  We've built a platform that understands the intent behind your sketches and transforms them into actionable results—whether that's code, solutions, or visual references. Our AI doesn't just recognize what you've drawn; it comprehends the context and purpose behind it.
        </Typography>
                
                <Box sx={{ mt: 5 }}>
                  <Button
                    component={Link}
                    to="/canvas"
                    variant="contained"
                    endIcon={<EastIcon />}
                    sx={{
                      py: 1.5,
                      px: 3,
                      fontWeight: 600,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '1rem',
                      boxShadow: '0 8px 16px rgba(78, 205, 196, 0.2)',
                      background: 'linear-gradient(90deg, #4ECDC4, #4ECDC4CC)',
                      '&:hover': {
                        background: 'linear-gradient(90deg, #3DBDB5, #3DBDB5CC)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 20px rgba(78, 205, 196, 0.3)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Try Sketchify Now
                  </Button>
                </Box>
              </Box>
            </motion.div>
          </Grid>
          
          {/* Image or illustration */}
          <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
                    : '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
                  height: { xs: '300px', md: '400px' },
                  background: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.7)',
                  border: theme.palette.mode === 'dark' 
                    ? '1px solid rgba(255, 255, 255, 0.1)' 
                    : '1px solid rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Replace with actual about/team image */}
                <Typography variant="body2" color="text.secondary">
                  Team or Product Illustration
              </Typography>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
        
        {/* Why Choose Us Section */}
        <Box sx={{ mt: { xs: 10, md: 16 } }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Typography
              variant="h3"
              component="h2"
              align="center"
              sx={{
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                fontWeight: 800,
                mb: 6,
                color: theme.palette.mode === 'dark' ? 'white' : 'rgba(0,0,0,0.8)',
              }}
            >
              Why Choose <span style={{ 
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(90deg, #4ECDC4, #FF6B6B)' 
                  : 'linear-gradient(90deg, #4ECDC4, #FF6B6B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Sketchify</span>
            </Typography>
          </motion.div>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                  height: '100%',
                      borderRadius: 3,
                      background: theme.palette.mode === 'dark' 
                        ? 'rgba(30, 41, 59, 0.4)' 
                        : 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      borderLeft: `3px solid ${index % 2 === 0 ? '#4ECDC4' : '#FF6B6B'}`,
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                        color: index % 2 === 0 ? '#4ECDC4' : '#FF6B6B',
                      }}
                    >
                      {feature.icon}
                    </Box>
                    
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        mb: 1.5,
                        color: theme.palette.mode === 'dark' ? 'white' : 'rgba(0,0,0,0.8)',
                      }}
                    >
                      {feature.title}
                    </Typography>
                    
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                        lineHeight: 1.6,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default About; 