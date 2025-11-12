   import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Multi-Tenant Management',
    description: 'Effortlessly manage multiple business entities under one roof.',
    badgeColor: '#3a3a3a',
    interest: 'multi-tenant-management',
  },
  {
    title: 'Real-Time Payments & Settlements',
    description: 'Experience instant transactions and seamless settlements.',
    badgeColor: '#2558ff',
    interest: 'real-time-payments-settlements',
  },
  {
    title: 'Global Insights',
    description: 'Gain valuable insights into your global payment operations.',
    badgeColor: '#f48b86',
    interest: 'global-insights',
  },
  {
    title: 'Secure & Compliant',
    description: 'Trust in our top-notch security measures and compliance standards.',
    badgeColor: '#14a84b',
    interest: 'secure-compliant',
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function FeatureGrid() {
  return (
    <Box sx={{ py: 10, backgroundColor: '#f8faff', overflow: 'hidden' }}>
      {/* Section Header */}
      <Box textAlign="center" mb={6}>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h4"
            fontWeight="700"
            color="#3558e6"
            mb={1}
          >
            Core Features
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Typography color="text.secondary" fontSize="1.05rem">
            Discover the powerful capabilities that make our Sony Payment Portal efficient, intelligent, and secure.
          </Typography>
        </motion.div>
      </Box>

      {/* Feature Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(4,1fr)' },
            gap: 4,
            px: { xs: 3, md: 8 },
            alignItems: 'stretch',
          }}
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{
                y: -10,
                rotateX: 5,
                rotateY: -5,
                boxShadow: '0 25px 45px rgba(76,99,229,0.3)',
                transition: { duration: 0.4, ease: 'easeOut' },
              }}
              animate={{
                y: [0, -6, 0],
                transition: {
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
            >
              <Paper
                elevation={5}
                sx={{
                  position: 'relative',
                  height: '100%',
                  minHeight: { xs: 250, md: 320 },
                  borderRadius: 4,
                  p: { xs: 3, md: 4 },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  textAlign: 'center',
                  color: '#fff',
                  overflow: 'hidden',
                  background: 'linear-gradient(145deg, #748EF5 0%, #4C63E5 100%)',
                  backgroundSize: '200% 200%',
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    backgroundPosition: 'right center',
                    background: 'linear-gradient(145deg, #8198f8, #5a6ff0, #748EF5)',
                    transform: 'scale(1.02)',
                  },
                }}
              >
                {/* Floating Badge */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: -18,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: f.badgeColor,
                    boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
                  }}
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                />

                {/* Title & Description */}
                <Box>
                  <Typography variant="h6" fontWeight="700" mb={1.5}>
                    {f.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.9)',
                      lineHeight: 1.6,
                    }}
                  >
                    {f.description}
                  </Typography>
                </Box>

                {/* CTA Button */}
                <Box sx={{ mt: 3 }}>
                  <motion.div whileHover={{ x: 5 }}>
                    <Button
                      component={Link}
                      to={`/contact-onboarding?interest=${f.interest}`}
                      variant="text"
                      sx={{
                        color: '#fff',
                        fontWeight: 600,
                        textTransform: 'none',
                        p: 0,
                        position: 'relative',
                        '&:after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          width: '0%',
                          height: '2px',
                          backgroundColor: '#fff',
                          transition: 'width 0.3s',
                        },
                        '&:hover:after': {
                          width: '100%',
                        },
                        '&:hover': { background: 'transparent' },
                      }}
                    >
                      Learn More →
                    </Button>
                  </motion.div>
                </Box>
              </Paper>
            </motion.div>
          ))}
        </Box>
      </motion.div>
    </Box>
  );
}