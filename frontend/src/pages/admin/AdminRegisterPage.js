import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, CssBaseline, IconButton, InputAdornment, CircularProgress, Fade } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff, School, Person, Badge } from '@mui/icons-material';
import styled from 'styled-components';
import { registerUser } from '../../redux/userRelated/userHandle';
import Popup from '../../components/Popup';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#6a5af9',
    },
    secondary: {
      main: '#4b7bec',
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h4: {
      fontWeight: 700,
    },
    body1: {
      fontSize: '1.1rem',
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#6a5af9',
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#6a5af9',
          },
        },
      },
    },
  },
});

const AdminRegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [fadeIn, setFadeIn] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [adminNameError, setAdminNameError] = useState(false);
  const [schoolNameError, setSchoolNameError] = useState(false);
  const role = "Admin";

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.adminName.value;
    const schoolName = event.target.schoolName.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!name || !schoolName || !email || !password) {
      if (!name) setAdminNameError(true);
      if (!schoolName) setSchoolNameError(true);
      if (!email) setEmailError(true);
      if (!password) setPasswordError(true);
      return;
    }

    const fields = { name, email, password, role, schoolName };
    setLoader(true);
    dispatch(registerUser(fields, role));
  };

  const handleInputChange = (event) => {
    const { name } = event.target;
    if (name === 'email') setEmailError(false);
    if (name === 'password') setPasswordError(false);
    if (name === 'adminName') setAdminNameError(false);
    if (name === 'schoolName') setSchoolNameError(false);
  };

  useEffect(() => {
    if (status === 'success' || (currentUser !== null && currentRole === 'Admin')) {
      navigate('/Admin/dashboard');
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      console.log(error);
    }
  }, [status, currentUser, currentRole, navigate, error, response]);

  return (
    <ThemeProvider theme={theme}>
      <StyledContainer>
        <Fade in={fadeIn} timeout={800}>
          <Grid container component="main" sx={{ height: '100vh', borderRadius: '20px', overflow: 'hidden' }}>
            <CssBaseline />
            <LeftGrid item xs={12} sm={7} md={7}>
              <FormContainer>
                <HeaderBox>
                  <LogoContainer>
                    <School sx={{ fontSize: 40, color: '#6a5af9' }} />
                    <LogoText>EduTrack Pro</LogoText>
                  </LogoContainer>
                  <Tagline>Create Your School Management System</Tagline>
                </HeaderBox>

                <FormBox component="form" noValidate onSubmit={handleSubmit}>
                  <FormTitle variant="h4">Admin Registration</FormTitle>
                  <FormSubtitle>
                    Create your school account to manage students, faculty, and academic programs
                  </FormSubtitle>

                  <InputGrid container spacing={2}>
                    <Grid item xs={12}>
                      <StyledTextField
                        required
                        fullWidth
                        id="adminName"
                        label="Admin Full Name"
                        name="adminName"
                        autoComplete="name"
                        autoFocus
                        error={adminNameError}
                        helperText={adminNameError && 'Name is required'}
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person color="primary" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        required
                        fullWidth
                        id="schoolName"
                        label="School Name"
                        name="schoolName"
                        autoComplete="off"
                        error={schoolNameError}
                        helperText={schoolNameError && 'School name is required'}
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <School color="primary" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        error={emailError}
                        helperText={emailError && 'Email is required'}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={toggle ? 'text' : 'password'}
                        id="password"
                        autoComplete="current-password"
                        error={passwordError}
                        helperText={passwordError && 'Password is required'}
                        onChange={handleInputChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setToggle(!toggle)}>
                                {toggle ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="I agree to the terms and conditions"
                      />
                    </Grid>
                  </InputGrid>

                  <RegisterButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loader}
                  >
                    {loader ? <CircularProgress size={24} color="inherit" /> : "Create School Account"}
                  </RegisterButton>

                  <LoginLinkContainer>
                    Already have an account?
                    <StyledLink to="/Adminlogin">Sign in</StyledLink>
                  </LoginLinkContainer>
                </FormBox>
              </FormContainer>
            </LeftGrid>

            <RightGrid item xs={12} sm={5} md={5}>
              <ImageOverlay />
              <ContentBox>
                <FeatureTitle>Transform Your School Management</FeatureTitle>
                <FeatureList>
                  <FeatureItem>
                    <Badge color="primary" />
                    <span>Manage students and faculty with ease</span>
                  </FeatureItem>
                  <FeatureItem>
                    <Badge color="primary" />
                    <span>Track attendance and academic performance</span>
                  </FeatureItem>
                  <FeatureItem>
                    <Badge color="primary" />
                    <span>Generate comprehensive reports</span>
                  </FeatureItem>
                  <FeatureItem>
                    <Badge color="primary" />
                    <span>Communicate with teachers and students</span>
                  </FeatureItem>
                  <FeatureItem>
                    <Badge color="primary" />
                    <span>Customize your school's academic structure</span>
                  </FeatureItem>
                </FeatureList>
              </ContentBox>
            </RightGrid>
          </Grid>
        </Fade>
        <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
      </StyledContainer>
    </ThemeProvider>
  );
};

export default AdminRegisterPage;

// Styled Components
const StyledContainer = styled.div`
  background: linear-gradient(135deg, #f8f9fc 0%, #eef0f8 100%);
  height: 100vh;
  display: flex;
  align-items: center;
  padding: 20px;
`;

const LeftGrid = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 40px;
  position: relative;
  z-index: 2;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
`;

const RightGrid = styled(Grid)`
  position: relative;
  background: linear-gradient(135deg, #6a5af9 0%, #4b7bec 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  color: white;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
    opacity: 0.3;
  }
`;

const FormContainer = styled.div`
  max-width: 600px;
  width: 100%;
`;

const HeaderBox = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const LogoText = styled(Typography)`
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
  background: linear-gradient(90deg, #6a5af9, #4b7bec);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Tagline = styled(Typography)`
  color: #718096;
  font-size: 1.1rem;
`;

const FormBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormTitle = styled(Typography)`
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 5px;
`;

const FormSubtitle = styled(Typography)`
  color: #718096;
  margin-bottom: 25px;
`;

const InputGrid = styled(Grid)`
  margin-top: 10px;
`;

const StyledTextField = styled(TextField)`
  & label {
    font-weight: 500;
  }
  
  & .MuiInputBase-root {
    border-radius: 12px;
  }
`;

const RegisterButton = styled(IconButton)`
  && {
    padding: 14px;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 12px;
    background: linear-gradient(90deg, #6a5af9, #4b7bec);
    color: white;
    box-shadow: 0 5px 20px rgba(106, 90, 249, 0.4);
    transition: all 0.3s ease;
    text-transform: none;
    margin-top: 15px;
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(106, 90, 249, 0.6);
    }
    
    &:disabled {
      background: #e2e8f0;
      color: #a0aec0;
    }
  }
`;

const LoginLinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  color: #718096;
  font-size: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #6a5af9;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(106, 90, 249, 0.8) 0%, rgba(75, 123, 236, 0.8) 100%);
  z-index: 1;
`;

const ContentBox = styled.div`
  position: relative;
  z-index: 2;
  max-width: 500px;
  padding: 30px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const FeatureTitle = styled(Typography)`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 30px;
`;

const FeatureList = styled.ul`
  padding-left: 20px;
  margin: 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  font-size: 1.1rem;
  line-height: 1.6;
  
  svg {
    min-width: 24px;
  }
`;