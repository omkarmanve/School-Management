import React, { useEffect } from 'react';
import {
  Grid,
  Paper,
  Container,
  CircularProgress,
  Backdrop,
  Button,
  Typography
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from '../redux/userRelated/userHandle';

const ChooseUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, currentRole } = useSelector((state) => state.user);
  const { status, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (status) {
      dispatch(getUserDetails(currentUser._id, currentRole));
    }
    if (currentUser && currentRole !== '') {
      navigate('/dashboard');
    }
  }, [status, currentRole, navigate, currentUser, dispatch]);

  const handleNavigation = (role) => {
    navigate(`/register/${role}`);
  };

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Choose User Type
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Please select the user type you want to register as.
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleNavigation('Admin')}
              >
                Admin
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleNavigation('School')}
              >
                School
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default ChooseUser;


// Styled Components
const StyledContainer = styled.div`
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 20% 30%, rgba(106, 90, 249, 0.1) 0%, transparent 40%),
                radial-gradient(circle at 80% 70%, rgba(75, 123, 236, 0.1) 0%, transparent 40%);
    z-index: 0;
  }
`;

const Header = styled.div`
  text-align: center;
  padding: 2rem 0;
  position: relative;
  z-index: 2;
`;

const Title = styled(Typography)`
  font-weight: 700;
  background: linear-gradient(90deg, #6a5af9, #4b7bec);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
`;

const Subtitle = styled(Typography)`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
`;

const RoleCard = styled(Paper)`
  padding: 0;
  text-align: center;
  background: rgba(30, 30, 60, 0.7) !important;
  backdrop-filter: blur(10px);
  border-radius: 20px !important;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(106, 90, 249, 0.2);
  transform: ${props => props.hovered ? 'translateY(-10px) scale(1.03)' : 'translateY(0) scale(1)'};
  box-shadow: ${props => 
    props.hovered 
      ? '0 20px 40px rgba(106, 90, 249, 0.3)' 
      : '0 10px 20px rgba(0, 0, 0, 0.2)'
  } !important;

  &:hover {
    background: rgba(40, 40, 80, 0.8) !important;
    border: 1px solid rgba(106, 90, 249, 0.5);
  }
`;

const CardContent = styled.div`
  padding: 30px;
  position: relative;
  z-index: 2;
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(106, 90, 249, 0.1);
  transition: all 0.3s ease;
  color: #6a5af9;
  
  ${RoleCard}:hover & {
    background: rgba(106, 90, 249, 0.2);
    transform: scale(1.1);
    box-shadow: 0 0 20px rgba(106, 90, 249, 0.3);
  }
  
  svg {
    font-size: 40px;
  }
`;

const RoleTitle = styled.h2`
  margin-bottom: 15px;
  font-size: 1.8rem;
  color: white;
  font-weight: 600;
`;

const RoleDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 25px;
  line-height: 1.6;
  min-height: 80px;
`;

const ActionButton = styled(Button)`
  && {
    padding: 10px 30px;
    border-radius: 50px;
    font-weight: 600;
    text-transform: none;
    background: linear-gradient(90deg, #6a5af9, #4b7bec);
    transition: all 0.3s ease;
    color: white;
    box-shadow: 0 5px 15px rgba(106, 90, 249, 0.4);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(106, 90, 249, 0.6);
    }
  }
`;

const CardGlow = styled.div`
  position: absolute;
  bottom: -50px;
  left: -50px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(106, 90, 249, ${props => props.hovered ? '0.4' : '0.2'}) 0%, transparent 70%);
  filter: blur(${props => props.hovered ? '20px' : '10px'});
  transition: all 0.5s ease;
  z-index: 1;
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

const Footer = styled.footer`
  padding: 25px;
  background: rgba(15, 12, 41, 0.8);
  backdrop-filter: blur(5px);
  border-top: 1px solid rgba(106, 90, 249, 0.2);
  text-align: center;
  position: relative;
  z-index: 2;
  margin-top: auto;
`;

const FooterText = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
`;