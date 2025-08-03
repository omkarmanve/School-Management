import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, CssBaseline, IconButton, InputAdornment, CircularProgress, Backdrop, Fade } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff, School, Person, Badge, Lock, Login } from '@mui/icons-material';
import styled from 'styled-components';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

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

const LoginPage = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

  const [toggle, setToggle] = useState(false);
  const [guestLoader, setGuestLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [fadeIn, setFadeIn] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [rollNumberError, setRollNumberError] = useState(false);
  const [studentNameError, setStudentNameError] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (role === "Student") {
      const rollNum = event.target.rollNumber.value;
      const studentName = event.target.studentName.value;
      const password = event.target.password.value;

      if (!rollNum || !studentName || !password) {
        if (!rollNum) setRollNumberError(true);
        if (!studentName) setStudentNameError(true);
        if (!password) setPasswordError(true);
        return;
      }
      const fields = { rollNum, studentName, password };
      setLoader(true);
      dispatch(loginUser(fields, role));
    } else {
      const email = event.target.email.value;
      const password = event.target.password.value;

      if (!email || !password) {
        if (!email) setEmailError(true);
        if (!password) setPasswordError(true);
        return;
      }

      const fields = { email, password };
      setLoader(true);
      dispatch(loginUser(fields, role));
    }
  };

  const handleInputChange = (event) => {
    const { name } = event.target;
    if (name === 'email') setEmailError(false);
    if (name === 'password') setPasswordError(false);
    if (name === 'rollNumber') setRollNumberError(false);
    if (name === 'studentName') setStudentNameError(false);
  };

  const guestModeHandler = () => {
    const password = "zxc";

    if (role === "Admin") {
      const email = "yogendra@12";
      const fields = { email, password };
      setGuestLoader(true);
      dispatch(loginUser(fields, role));
    } else if (role === "Student") {
      const rollNum = "1";
      const studentName = "Dipesh Awasthi";
      const fields = { rollNum, studentName, password };
      setGuestLoader(true);
      dispatch(loginUser(fields, role));
    } else if (role === "Teacher") {
      const email = "tony@12";
      const fields = { email, password };
      setGuestLoader(true);
      dispatch(loginUser(fields, role));
    }
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      } else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
      setGuestLoader(false);
    }
  }, [status, currentRole, navigate, error, response, currentUser]);

  const getRoleTitle = () => {
    switch (role) {
      case "Admin": return "School Administrator";
      case "Teacher": return "Faculty Member";
      case "Student": return "Student Portal";
      default: return "User";
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledContainer>
        <Fade in={fadeIn} timeout={800}>
          <Grid container component="main" sx={{ height: '100vh', borderRadius: '20px', overflow: 'hidden' }}>
            <CssBaseline />
            <LeftGrid item xs={12} sm={6} md={6}>
              <FormContainer>
                <HeaderBox>
                  <LogoContainer>
                    <School sx={{ fontSize: 40, color: '#6a5af9' }} />
                    <LogoText>EduTrack Pro</LogoText>
                  </LogoContainer>
                  <Tagline>Welcome to the {getRoleTitle()}</Tagline>
                </HeaderBox>

                <FormBox component="form" noValidate onSubmit={handleSubmit}>
                  <FormTitle variant="h4">Sign In</FormTitle>
                  <FormSubtitle>
                    Enter your credentials to access your dashboard
                  </FormSubtitle>

                  <InputGrid container spacing={2}>
                    {role === "Student" ? (
                      <>
                        <Grid item xs={12}>
                          <StyledTextField
                            required
                            fullWidth
                            id="rollNumber"
                            label="Student Roll Number"
                            name="rollNumber"
                            autoComplete="off"
                            type="number"
                            autoFocus
                            error={rollNumberError}
                            helperText={rollNumberError && 'Roll Number is required'}
                            onChange={handleInputChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Badge color="primary" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <StyledTextField
                            required
                            fullWidth
                            id="studentName"
                            label="Full Name"
                            name="studentName"
                            autoComplete="name"
                            error={studentNameError}
                            helperText={studentNameError && 'Name is required'}
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
                      </>
                    ) : (
                      <Grid item xs={12}>
                        <StyledTextField
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          autoFocus
                          error={emailError}
                          helperText={emailError && 'Email is required'}
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
                    )}
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
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock color="primary" />
                            </InputAdornment>
                          ),
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
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                      />
                      <ForgotLink href="#">
                        Forgot password?
                      </ForgotLink>
                    </Grid>
                  </InputGrid>

                  <LoginButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loader}
                    startIcon={<Login />}
                  >
                    {loader ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
                  </LoginButton>

                 

                  {role === "Admin" && (
                    <SignupContainer>
                      Don't have an account?
                      <SignupLink to="/Adminregister">Sign up</SignupLink>
                    </SignupContainer>
                  )}
                </FormBox>
              </FormContainer>
            </LeftGrid>

            <RightGrid item xs={12} sm={6} md={6}>
              <GlassOverlay />
              <ContentBox>
                <FeatureTitle>EduTrack Pro School Management</FeatureTitle>
                <FeatureList>
                  <FeatureItem>
                    <Badge color="primary" />
                    <span>Track student progress and performance</span>
                  </FeatureItem>
                  <FeatureItem>
                    <Badge color="primary" />
                    <span>Manage classes, schedules, and assignments</span>
                  </FeatureItem>
                  <FeatureItem>
                    <Badge color="primary" />
                    <span>Communicate with teachers and students</span>
                  </FeatureItem>
                  <FeatureItem>
                    <Badge color="primary" />
                    <span>Generate comprehensive reports</span>
                  </FeatureItem>
                  <FeatureItem>
                    <Badge color="primary" />
                    <span>Access from anywhere, anytime</span>
                  </FeatureItem>
                </FeatureList>
              </ContentBox>
            </RightGrid>
          </Grid>
        </Fade>
        
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={guestLoader}
        >
          <LoadingContainer>
            <CircularProgress color="inherit" size={60} thickness={4} />
            <LoadingText>Authenticating Guest Session...</LoadingText>
          </LoadingContainer>
        </Backdrop>
        
        <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
      </StyledContainer>
    </ThemeProvider>
  );
};

export default LoginPage;

// Styled Components
const StyledContainer = styled.div`
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
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
  height: 100%;
`;

const RightGrid = styled(Grid)`
  position: relative;
  background: linear-gradient(135deg, #6a5af9 0%, #4b7bec 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  color: white;
  height: 100%;
  
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
  max-width: 500px;
  width: 100%;
  padding: 20px;
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

const LoginButton = styled(Button)`
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

const GuestButton = styled(Button)`
  && {
    padding: 14px;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 12px;
    color: #6a5af9;
    border: 2px solid #6a5af9;
    transition: all 0.3s ease;
    text-transform: none;
    margin-top: 10px;
    
    &:hover {
      background: rgba(106, 90, 249, 0.05);
      transform: translateY(-3px);
      border: 2px solid #6a5af9;
      box-shadow: 0 5px 15px rgba(106, 90, 249, 0.2);
    }
    
    &:disabled {
      border-color: #e2e8f0;
      color: #a0aec0;
    }
  }
`;

const ForgotLink = styled(Link)`
  text-decoration: none;
  color: #6a5af9;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  
  &:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  color: #718096;
  font-size: 1rem;
`;

const SignupLink = styled(Link)`
  text-decoration: none;
  color: #6a5af9;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

const GlassOverlay = styled.div`
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
  padding: 40px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const FeatureTitle = styled(Typography)`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
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

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const LoadingText = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
`;