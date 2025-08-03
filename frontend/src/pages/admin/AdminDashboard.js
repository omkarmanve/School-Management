import { useState, useEffect } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppBar, Drawer } from '../../components/styles';
import Logout from '../Logout';
import SideBar from './SideBar';
import AdminProfile from './AdminProfile';
import AdminHomePage from './AdminHomePage';

import AddStudent from './studentRelated/AddStudent';
import SeeComplains from './studentRelated/SeeComplains';
import ShowStudents from './studentRelated/ShowStudents';
import StudentAttendance from './studentRelated/StudentAttendance';
import StudentExamMarks from './studentRelated/StudentExamMarks';
import ViewStudent from './studentRelated/ViewStudent';

import AddNotice from './noticeRelated/AddNotice';
import ShowNotices from './noticeRelated/ShowNotices';

import ShowSubjects from './subjectRelated/ShowSubjects';
import SubjectForm from './subjectRelated/SubjectForm';
import ViewSubject from './subjectRelated/ViewSubject';

import AddTeacher from './teacherRelated/AddTeacher';
import ChooseClass from './teacherRelated/ChooseClass';
import ChooseSubject from './teacherRelated/ChooseSubject';
import ShowTeachers from './teacherRelated/ShowTeachers';
import TeacherDetails from './teacherRelated/TeacherDetails';

import AddClass from './classRelated/AddClass';
import ClassDetails from './classRelated/ClassDetails';
import ShowClasses from './classRelated/ShowClasses';
import AccountMenu from '../../components/AccountMenu';

const AdminDashboard = () => {
    const [open, setOpen] = useState(false);
    const [activePath, setActivePath] = useState('/');
    const theme = useTheme();

    const toggleDrawer = () => setOpen(!open);
    
    // Set initial active path
    useEffect(() => {
        const path = window.location.pathname;
        setActivePath(path);
    }, []);

    return (
        <Box sx={{ 
            display: 'flex', 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)',
            position: 'relative',
            overflow: 'hidden',
            '&:before': {
                content: '""',
                position: 'absolute',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(118,75,162,0.15) 0%, rgba(118,75,162,0) 70%)',
                top: '15%',
                right: '10%',
                borderRadius: '50%',
                zIndex: 0
            },
            '&:after': {
                content: '""',
                position: 'absolute',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(102,126,234,0.15) 0%, rgba(102,126,234,0) 70%)',
                bottom: '10%',
                left: '8%',
                borderRadius: '50%',
                zIndex: 0
            }
        }}>
            <CssBaseline />

            {/* Floating Toggle Button for Mobile */}
            <Box sx={{
                position: 'fixed',
                bottom: 20,
                left: 20,
                zIndex: 1200,
                display: { xs: 'block', md: 'none' },
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.1)' },
                    '100%': { transform: 'scale(1)' }
                }
            }}>
                <IconButton
                    color="primary"
                    onClick={toggleDrawer}
                    sx={{
                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                        color: 'white',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                        width: 56,
                        height: 56,
                        '&:hover': {
                            background: 'linear-gradient(45deg, #5a6cd4, #6a419a)',
                        }
                    }}
                >
                    <MenuIcon fontSize="medium" />
                </IconButton>
            </Box>

            {/* Top AppBar with gradient */}
            <AppBar
                open={open}
                position="fixed"
                sx={{
                    background: 'linear-gradient(to right, #667eea, #764ba2)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                    zIndex: theme.zIndex.drawer + 1,
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(102, 126, 234, 0.85)',
                    height: 70
                }}
            >
                <Toolbar sx={{ 
                    pr: '24px',
                    justifyContent: 'space-between',
                    height: '100%'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{ 
                                marginRight: '24px',
                                display: { xs: 'none', md: 'block' },
                                ...(open && { display: 'none' })
                            }}
                        >
                            <MenuIcon fontSize="large" sx={{ color: 'white' }} />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h5"
                            noWrap
                            sx={{
                                fontWeight: 700,
                                fontFamily: `'Poppins', sans-serif`,
                                letterSpacing: '0.05em',
                                background: 'linear-gradient(to right, #ffffff, #e0e0e0)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                fontSize: { xs: '1.2rem', sm: '1.5rem' }
                            }}
                        >
                            🎓 Admin Control Panel
                        </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{
                            mr: 3,
                            px: 2,
                            py: 1,
                            background: 'rgba(255, 255, 255, 0.15)',
                            borderRadius: '20px',
                            backdropFilter: 'blur(5px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            display: { xs: 'none', sm: 'block' }
                        }}>
                            <Typography variant="body2" sx={{ 
                                color: 'white', 
                                fontWeight: 500,
                                textOverflow: 'ellipsis',
                                maxWidth: 200,
                                overflow: 'hidden',
                                whiteSpace: 'nowrap'
                            }}>
                                {activePath.split('/').pop() || 'Dashboard'}
                            </Typography>
                        </Box>
                        <AccountMenu />
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Glassmorphism Sidebar */}
            <Drawer
                variant="permanent"
                open={open}
                sx={{
                    '& .MuiDrawer-paper': {
                        background: 'rgba(255, 255, 255, 0.75)',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        borderRight: '1px solid rgba(255, 255, 255, 0.5)',
                        borderRadius: '0 20px 20px 0',
                        transition: 'all 0.3s ease',
                        overflowX: 'hidden',
                        zIndex: theme.zIndex.drawer,
                        width: open ? 260 : 72,
                    },
                    ...(open ? styles.drawerStyled : styles.hideDrawer)
                }}
            >
                <Toolbar sx={styles.toolBarStyled}>
                    <IconButton 
                        onClick={toggleDrawer}
                        sx={{
                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                            color: 'white',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #5a6cd4, #6a419a)',
                            }
                        }}
                    >
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider sx={{ borderColor: 'rgba(0,0,0,0.05)' }} />
                <List component="nav" sx={{ p: 1 }}>
                    <SideBar open={open} setActivePath={setActivePath} />
                </List>
                
                {/* Sidebar Footer */}
                {open && (
                    <Box sx={{
                        mt: 'auto',
                        p: 2,
                        textAlign: 'center',
                        color: '#667eea',
                        fontSize: '0.75rem',
                        fontWeight: 500
                    }}>
                        <Typography variant="caption">Education Portal v2.0</Typography>
                        <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                            © 2023 All Rights Reserved
                        </Typography>
                    </Box>
                )}
            </Drawer>

            {/* Main Content */}
            <Box 
                component="main" 
                sx={{
                    ...styles.boxStyled,
                    width: `calc(100% - ${open ? 260 : 72}px)`,
                    transition: 'all 0.3s ease',
                    ml: { xs: 0, md: `${open ? 260 : 72}px` },
                    position: 'relative',
                    zIndex: 1
                }}
            >
                <Toolbar />
                <Box sx={{
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    minHeight: 'calc(100vh - 70px)',
                    p: 3,
                    position: 'relative',
                    overflowY: 'auto',
                    maxHeight: 'calc(100vh - 70px)'
                }}>
                    <Routes>
                        <Route path="/" element={<AdminHomePage />} />
                        <Route path="*" element={<Navigate to="/" />} />
                        <Route path="/Admin/dashboard" element={<AdminHomePage />} />
                        <Route path="/Admin/profile" element={<AdminProfile />} />
                        <Route path="/Admin/complains" element={<SeeComplains />} />

                        {/* Notice */}
                        <Route path="/Admin/addnotice" element={<AddNotice />} />
                        <Route path="/Admin/notices" element={<ShowNotices />} />

                        {/* Subject */}
                        <Route path="/Admin/subjects" element={<ShowSubjects />} />
                        <Route path="/Admin/subjects/subject/:classID/:subjectID" element={<ViewSubject />} />
                        <Route path="/Admin/subjects/chooseclass" element={<ChooseClass situation="Subject" />} />
                        <Route path="/Admin/addsubject/:id" element={<SubjectForm />} />
                        <Route path="/Admin/class/subject/:classID/:subjectID" element={<ViewSubject />} />
                        <Route path="/Admin/subject/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
                        <Route path="/Admin/subject/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />

                        {/* Class */}
                        <Route path="/Admin/addclass" element={<AddClass />} />
                        <Route path="/Admin/classes" element={<ShowClasses />} />
                        <Route path="/Admin/classes/class/:id" element={<ClassDetails />} />
                        <Route path="/Admin/class/addstudents/:id" element={<AddStudent situation="Class" />} />

                        {/* Student */}
                        <Route path="/Admin/addstudents" element={<AddStudent situation="Student" />} />
                        <Route path="/Admin/students" element={<ShowStudents />} />
                        <Route path="/Admin/students/student/:id" element={<ViewStudent />} />
                        <Route path="/Admin/students/student/attendance/:id" element={<StudentAttendance situation="Student" />} />
                        <Route path="/Admin/students/student/marks/:id" element={<StudentExamMarks situation="Student" />} />

                        {/* Teacher */}
                        <Route path="/Admin/teachers" element={<ShowTeachers />} />
                        <Route path="/Admin/teachers/teacher/:id" element={<TeacherDetails />} />
                        <Route path="/Admin/teachers/chooseclass" element={<ChooseClass situation="Teacher" />} />
                        <Route path="/Admin/teachers/choosesubject/:id" element={<ChooseSubject situation="Norm" />} />
                        <Route path="/Admin/teachers/choosesubject/:classID/:teacherID" element={<ChooseSubject situation="Teacher" />} />
                        <Route path="/Admin/teachers/addteacher/:id" element={<AddTeacher />} />

                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </Box>
            </Box>
        </Box>
    );
};

export default AdminDashboard;

const styles = {
    boxStyled: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        p: 3,
        transition: 'all 0.3s ease'
    },
    toolBarStyled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
        minHeight: '64px !important'
    },
    drawerStyled: {
        display: 'flex'
    },
    hideDrawer: {
        display: 'flex',
        '@media (max-width: 900px)': {
            display: 'none',
        },
    },
};