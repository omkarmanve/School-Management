import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Stack, TextField, Typography, Grid } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { BlueButton } from "../../../components/buttonStyles";
import Popup from "../../../components/Popup";
import Classroom from "../../../assets/classroom.png";
import styled from "styled-components";
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
});

const AddClass = () => {
    const [sclassName, setSclassName] = useState("");

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error, tempDetails } = userState;

    const adminID = currentUser._id
    const address = "Sclass"

    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        sclassName,
        adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(addStuff(fields, address))
    };

    useEffect(() => {
        if (status === 'added' && tempDetails) {
            navigate("/Admin/classes/class/" + tempDetails._id)
            dispatch(underControl())
            setLoader(false)
        }
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            setMessage("Network Error")
            setShowPopup(true)
            setLoader(false)
        }
    }, [status, navigate, error, response, dispatch, tempDetails]);
    
    return (
        <ThemeProvider theme={theme}>
            <StyledContainer>
                <GlassCard>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <ImageContainer>
                                <img
                                    src={Classroom}
                                    alt="classroom"
                                    style={{ width: '100%', borderRadius: '16px' }}
                                />
                            </ImageContainer>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormContainer>
                                <Title variant="h4">Create New Classroom</Title>
                                <Subtitle>Add a new class to your school management system</Subtitle>
                                
                                <form onSubmit={submitHandler}>
                                    <Stack spacing={3} sx={{ mt: 3 }}>
                                        <StyledTextField
                                            label="Class Name"
                                            variant="outlined"
                                            value={sclassName}
                                            onChange={(event) => {
                                                setSclassName(event.target.value);
                                            }}
                                            required
                                            fullWidth
                                            InputProps={{
                                                style: {
                                                    borderRadius: '12px',
                                                    backgroundColor: 'rgba(255, 255, 255, 0.8)'
                                                }
                                            }}
                                        />
                                        <ButtonContainer>
                                            <BlueButton
                                                fullWidth
                                                size="large"
                                                variant="contained"
                                                type="submit"
                                                disabled={loader}
                                            >
                                                {loader ? <CircularProgress size={24} color="inherit" /> : "Create Classroom"}
                                            </BlueButton>
                                            <StyledButton variant="outlined" onClick={() => navigate(-1)}>
                                                Go Back
                                            </StyledButton>
                                        </ButtonContainer>
                                    </Stack>
                                </form>
                            </FormContainer>
                        </Grid>
                    </Grid>
                </GlassCard>
                <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
            </StyledContainer>
        </ThemeProvider>
    )
}

export default AddClass

const StyledContainer = styled(Box)`
  flex: 1 1 auto;
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7f1 100%);
  padding: 20px;
`;

const GlassCard = styled(Box)`
  width: 100%;
  max-width: 900px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const ImageContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FormContainer = styled(Box)`
  padding: 20px;
`;

const Title = styled(Typography)`
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 10px;
  background: linear-gradient(90deg, #6a5af9, #4b7bec);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled(Typography)`
  color: #718096;
  font-size: 1.1rem;
  margin-bottom: 30px;
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.8);
  }
  
  & .MuiInputLabel-root {
    color: #718096;
  }
  
  & .Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #6a5af9 !important;
    border-width: 2px;
  }
  
  & .MuiInputLabel-root.Mui-focused {
    color: #6a5af9;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

const StyledButton = styled(Button)`
  && {
    padding: 12px;
    border-radius: 12px;
    font-weight: 600;
    text-transform: none;
    font-size: 1rem;
    transition: all 0.3s ease;
    border-width: 2px;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
  }
`;