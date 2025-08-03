import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button, Paper, Typography, useTheme } from '@mui/material';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import Students from "../assets/students.svg";
import { LightPurpleButton } from '../components/buttonStyles';

// Animations
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const Homepage = () => {
  const theme = useTheme();

  return (
    <StyledContainer maxWidth="xl">
      <BackgroundGradient />
      <Grid container spacing={0}>
        {/* Left Image */}
        <Grid item xs={12} md={6}>
          <AnimatedImageContainer>
            <img src={Students} alt="students" style={{ width: '90%', maxWidth: '700px' }} />
          </AnimatedImageContainer>
        </Grid>

        {/* Right Content */}
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={3}>
         <StyledTitle>
  Welcome to
  <br />
  <Highlight>EduSphere</Highlight>
  <br />
  Platform
</StyledTitle>

<StyledText>
  Streamline school management, organize classes, and manage students and faculty effortlessly.
  Track attendance, assess performance, and foster communication.
</StyledText>


            <FeatureGrid container spacing={2} sx={{ my: 3 }}>
              <FeatureItem item xs={6}>
                <FeatureIcon>📊</FeatureIcon>
                <FeatureText>Track Attendance</FeatureText>
              </FeatureItem>
              <FeatureItem item xs={6}>
                <FeatureIcon>📝</FeatureIcon>
                <FeatureText>Manage Classes</FeatureText>
              </FeatureItem>
              <FeatureItem item xs={6}>
                <FeatureIcon>📈</FeatureIcon>
                <FeatureText>Performance Reports</FeatureText>
              </FeatureItem>
              <FeatureItem item xs={6}>
                <FeatureIcon>💬</FeatureIcon>
                <FeatureText>Communication Hub</FeatureText>
              </FeatureItem>
            </FeatureGrid>

            <StyledBox>
              <StyledLink to="/choose">
                <LightPurpleButton variant="contained" fullWidth sx={{ animation: `${pulse} 2s infinite` }}>
                  Login
                </LightPurpleButton>
              </StyledLink>

              <StyledText small center>
                Don’t have an account?{' '}
                <Link to="/Adminregister" style={{
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px'
                }}>
                  Sign up
                </Link>
              </StyledText>
            </StyledBox>
          </StyledPaper>
        </Grid>
      </Grid>

      <Footer>
        <Typography variant="body2" color="textSecondary">
          © 2023 School Management System. All rights reserved.
        </Typography>
      </Footer>
    </StyledContainer>
  );
};

export default Homepage;

//
// Styled Components (same as before)
//

const StyledContainer = styled(Container)`
  padding: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const BackgroundGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7f1 100%);
  z-index: -1;
`;

const StyledPaper = styled(Paper)`
  padding: 3rem 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  border-radius: 0 !important;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1) !important;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(106, 27, 154, 0.05) 0%, rgba(255,255,255,0) 70%);
    z-index: 0;
  }
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem 0;
  position: relative;
  z-index: 1;
`;

const StyledTitle = styled.h1`
  font-size: 2.8rem;
  color: #2d3748;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 0.8s ease-out;

  @media (max-width: 600px) {
    font-size: 2.2rem;
  }
`;

const Highlight = styled.span`
  color: #6a1b9a;
  background: linear-gradient(120deg, rgba(106,27,154,0.15) 0%, rgba(106,27,154,0) 100%);
  padding: 0 8px;
  border-radius: 4px;
`;

const StyledText = styled.p`
  color: ${props => props.small ? "#555" : "#4a5568"};
  font-size: ${props => props.small ? "1rem" : "1.15rem"};
  line-height: 1.7;
  text-align: ${props => (props.center ? "center" : "left")};
  margin: ${props => (props.small ? "1rem 0" : "1.5rem 0")};
  max-width: 600px;
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 1s ease-out;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
  max-width: 400px;
`;

const AnimatedImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  animation: ${floatAnimation} 6s ease-in-out infinite;

  @media (max-width: 900px) {
    height: auto;
    padding: 3rem 1rem 2rem;
  }
`;

const FeatureGrid = styled(Grid)`
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const FeatureItem = styled(Grid)`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 12px;
  background: rgba(245, 243, 255, 0.6);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.8s ease-out;

  &:hover {
    background: rgba(234, 229, 255, 0.8);
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(106, 27, 154, 0.1);
  }
`;

const FeatureIcon = styled.span`
  font-size: 1.8rem;
  margin-right: 12px;
  background: linear-gradient(135deg, #6a1b9a 0%, #9c27b0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const FeatureText = styled.span`
  font-weight: 600;
  color: #4a5568;
  font-size: 0.95rem;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.8);
  margin-top: auto;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
`;
