import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getClassDetails, getClassStudents, getSubjectList } from "../../../redux/sclassRelated/sclassHandle";
import { deleteUser } from '../../../redux/userRelated/userHandle';
import {
    Box, Container, Typography, Tab, IconButton, Paper, Grid, Card, CardContent, CircularProgress
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { resetSubjects } from "../../../redux/sclassRelated/sclassSlice";
import { BlueButton, GreenButton, PurpleButton } from "../../../components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from '@mui/icons-material/PostAdd';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { styled } from '@mui/material/styles';

const ClassDetails = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { subjectsList, sclassStudents, sclassDetails, loading, error, response, getresponse } = useSelector((state) => state.sclass);

    const classID = params.id

    useEffect(() => {
        dispatch(getClassDetails(classID, "Sclass"));
        dispatch(getSubjectList(classID, "ClassSubjects"))
        dispatch(getClassStudents(classID));
    }, [dispatch, classID])

    if (error) {
        console.log(error)
    }

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        setMessage("Sorry the delete function has been disabled for now.")
        setShowPopup(true)
        dispatch(deleteUser(deleteID, address))
          .then(() => {
                dispatch(getClassStudents(classID));
                 dispatch(resetSubjects())
                 dispatch(getSubjectList(classID, "ClassSubjects"))
             })
    }

    const subjectColumns = [
        { id: 'name', label: 'Subject Name', minWidth: 170 },
        { id: 'code', label: 'Subject Code', minWidth: 100 },
    ]

    const subjectRows = subjectsList && subjectsList.length > 0 && subjectsList.map((subject) => {
        return {
            name: subject.subName,
            code: subject.subCode,
            id: subject._id,
        };
    })

    const SubjectsButtonHaver = ({ row }) => {
        return (
            <ButtonContainer>
                <IconButton onClick={() => deleteHandler(row.id, "Subject")} size="small">
                    <DeleteIcon color="error" fontSize="small" />
                </IconButton>
                <BlueButton
                    variant="contained"
                    size="small"
                    onClick={() => {
                        navigate(`/Admin/class/subject/${classID}/${row.id}`)
                    }}
                >
                    View
                </BlueButton >
            </ButtonContainer>
        );
    };

    const subjectActions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Subject',
            action: () => navigate("/Admin/addsubject/" + classID)
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All Subjects',
            action: () => deleteHandler(classID, "SubjectsClass")
        }
    ];

    const ClassSubjectsSection = () => {
        return (
            <SectionContainer>
                {response ?
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                        <GreenButton
                            variant="contained"
                            startIcon={<PostAddIcon />}
                            onClick={() => navigate("/Admin/addsubject/" + classID)}
                        >
                            Add Subjects
                        </GreenButton>
                    </Box>
                    :
                    <>
                        <SectionHeader>
                            <MenuBookIcon color="primary" fontSize="large" />
                            <Typography variant="h5" gutterBottom>
                                Subjects List
                            </Typography>
                        </SectionHeader>

                        <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
                        <SpeedDialTemplate actions={subjectActions} />
                    </>
                }
            </SectionContainer>
        )
    }

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
    ]

    const studentRows = sclassStudents.map((student) => {
        return {
            name: student.name,
            rollNum: student.rollNum,
            id: student._id,
        };
    })

    const StudentsButtonHaver = ({ row }) => {
        return (
            <ButtonContainer>
                <IconButton onClick={() => deleteHandler(row.id, "Student")} size="small">
                    <PersonRemoveIcon color="error" fontSize="small" />
                </IconButton>
                <BlueButton
                    variant="contained"
                    size="small"
                    onClick={() => navigate("/Admin/students/student/" + row.id)}
                >
                    View
                </BlueButton>
                <PurpleButton
                    variant="contained"
                    size="small"
                    onClick={() =>
                        navigate("/Admin/students/student/attendance/" + row.id)
                    }
                >
                    Attendance
                </PurpleButton>
            </ButtonContainer>
        );
    };

    const studentActions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Student',
            action: () => navigate("/Admin/class/addstudents/" + classID)
        },
        {
            icon: <PersonRemoveIcon color="error" />, name: 'Delete All Students',
            action: () => deleteHandler(classID, "StudentsClass")
        },
    ];

    const ClassStudentsSection = () => {
        return (
            <SectionContainer>
                {getresponse ? (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                        <GreenButton
                            variant="contained"
                            startIcon={<PersonAddAlt1Icon />}
                            onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                        >
                            Add Students
                        </GreenButton>
                    </Box>
                ) : (
                    <>
                        <SectionHeader>
                            <PeopleIcon color="primary" fontSize="large" />
                            <Typography variant="h5" gutterBottom>
                                Students List
                            </Typography>
                        </SectionHeader>

                        <TableTemplate buttonHaver={StudentsButtonHaver} columns={studentColumns} rows={studentRows} />
                        <SpeedDialTemplate actions={studentActions} />
                    </>
                )}
            </SectionContainer>
        )
    }

    const ClassTeachersSection = () => {
        return (
            <SectionContainer sx={{ textAlign: 'center', py: 4 }}>
                <AssignmentIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h5" color="text.secondary" gutterBottom>
                    Teacher Management
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    This feature is currently under development
                </Typography>
            </SectionContainer>
        )
    }

    const ClassDetailsSection = () => {
        const numberOfSubjects = subjectsList.length;
        const numberOfStudents = sclassStudents.length;

        return (
            <SectionContainer>
                <Typography variant="h4" align="center" gutterBottom sx={{ mb: 3, fontWeight: 700, color: '#2d3748' }}>
                    {sclassDetails && sclassDetails.sclassName}
                </Typography>
                
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={6}>
                        <StatCard>
                            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                                <StatIcon sx={{ bgcolor: 'rgba(106, 90, 249, 0.1)' }}>
                                    <MenuBookIcon color="primary" fontSize="large" />
                                </StatIcon>
                                <Box sx={{ ml: 3 }}>
                                    <Typography variant="h6" color="text.secondary">
                                        Subjects
                                    </Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#6a5af9' }}>
                                        {numberOfSubjects}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </StatCard>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                        <StatCard>
                            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                                <StatIcon sx={{ bgcolor: 'rgba(75, 123, 236, 0.1)' }}>
                                    <PeopleIcon color="primary" fontSize="large" />
                                </StatIcon>
                                <Box sx={{ ml: 3 }}>
                                    <Typography variant="h6" color="text.secondary">
                                        Students
                                    </Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#4b7bec' }}>
                                        {numberOfStudents}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </StatCard>
                    </Grid>
                </Grid>
                
                <ActionContainer>
                    {getresponse &&
                        <GreenButton
                            variant="contained"
                            startIcon={<PersonAddAlt1Icon />}
                            onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                        >
                            Add Students
                        </GreenButton>
                    }
                    {response &&
                        <GreenButton
                            variant="contained"
                            startIcon={<PostAddIcon />}
                            onClick={() => navigate("/Admin/addsubject/" + classID)}
                        >
                            Add Subjects
                        </GreenButton>
                    }
                </ActionContainer>
            </SectionContainer>
        );
    }

    return (
        <>
            {loading ? (
                <LoadingContainer>
                    <CircularProgress size={60} />
                    <Typography variant="h6" sx={{ mt: 2 }}>Loading Class Details...</Typography>
                </LoadingContainer>
            ) : (
                <StyledContainer>
                    <Box sx={{ width: '100%', typography: 'body1' }} >
                        <TabContext value={value}>
                            <StyledTabList onChange={handleChange} scrollButtons="auto">
                                <StyledTab icon={<SchoolIcon />} label="Class Details" value="1" />
                                <StyledTab icon={<MenuBookIcon />} label="Subjects" value="2" />
                                <StyledTab icon={<PeopleIcon />} label="Students" value="3" />
                                <StyledTab icon={<AssignmentIcon />} label="Teachers" value="4" />
                            </StyledTabList>
                            
                            <Container sx={{ marginTop: "6rem", marginBottom: "4rem" }}>
                                <Paper elevation={0} sx={{ borderRadius: 4, p: 4, bgcolor: 'background.paper' }}>
                                    <TabPanel value="1">
                                        <ClassDetailsSection />
                                    </TabPanel>
                                    <TabPanel value="2">
                                        <ClassSubjectsSection />
                                    </TabPanel>
                                    <TabPanel value="3">
                                        <ClassStudentsSection />
                                    </TabPanel>
                                    <TabPanel value="4">
                                        <ClassTeachersSection />
                                    </TabPanel>
                                </Paper>
                            </Container>
                        </TabContext>
                    </Box>
                    <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
                </StyledContainer>
            )}
        </>
    );
};

export default ClassDetails;

// Styled Components
const StyledContainer = styled(Container)`
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const StyledTabList = styled(TabList)`
  position: fixed;
  width: 100%;
  background-color: white;
  z-index: 1100;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  top: 64px;
  
  .MuiTabs-indicator {
    background-color: #6a5af9;
    height: 4px;
  }
`;

const StyledTab = styled(Tab)`
  text-transform: none;
  font-weight: 600;
  min-height: 64px;
  
  &.Mui-selected {
    color: #6a5af9;
  }
`;

const SectionContainer = styled(Box)`
  padding: 24px;
  border-radius: 16px;
  background-color: white;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
`;

const SectionHeader = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

const StatCard = styled(Card)`
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
  }
`;

const StatIcon = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 12px;
`;

const ButtonContainer = styled(Box)`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const ActionContainer = styled(Box)`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 24px;
`;

const LoadingContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;