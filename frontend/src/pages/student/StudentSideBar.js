import * as React from 'react';
import { 
    Divider, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText, 
    ListSubheader,
    Box,
    Typography,
    styled 
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SchoolIcon from '@mui/icons-material/School';

// Styled components for modern design
const SidebarContainer = styled('div')(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(245,247,255,0.9) 100%)',
  backdropFilter: 'blur(10px)',
  borderRadius: '0 20px 20px 0',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  borderRight: '1px solid rgba(255, 255, 255, 0.5)',
  height: '100%',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
}));

const StyledListItemButton = styled(ListItemButton)(({ theme, active }) => ({
  borderRadius: '12px',
  marginBottom: '8px',
  transition: 'all 0.3s ease',
  background: active ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
  borderLeft: active ? `4px solid ${theme.palette.primary.main}` : 'none',
  '&:hover': {
    background: 'rgba(102, 126, 234, 0.08)',
    transform: 'translateX(5px)',
  },
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme, active }) => ({
  minWidth: '40px',
  background: active ? theme.palette.primary.main : 'rgba(102, 126, 234, 0.1)',
  borderRadius: '10px',
  padding: '8px',
  color: active ? 'white' : theme.palette.primary.main,
  transition: 'all 0.3s ease',
  justifyContent: 'center',
}));

const ProfileIcon = styled('div')(({ theme }) => ({
  width: '48px',
  height: '48px',
  background: 'linear-gradient(45deg, #667eea, #764ba2)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  marginRight: '12px',
}));

const StudentSideBar = () => {
  const location = useLocation();
  
  // Check active routes
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname === "/Student/dashboard";
    }
    return location.pathname.startsWith(path);
  };
  
  // Navigation items
  const navItems = [
    { path: "/", icon: <HomeIcon />, text: "Home" },
    { path: "/Student/subjects", icon: <AssignmentIcon />, text: "Subjects" },
    { path: "/Student/attendance", icon: <ClassOutlinedIcon />, text: "Attendance" },
    { path: "/Student/complain", icon: <AnnouncementOutlinedIcon />, text: "Complain" },
  ];
  
  const userItems = [
    { path: "/Student/profile", icon: <AccountCircleOutlinedIcon />, text: "Profile" },
    { path: "/logout", icon: <ExitToAppIcon />, text: "Logout" },
  ];

  return (
    <SidebarContainer>
      {/* User Profile Card */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        p: 2, 
        mb: 2,
        background: 'linear-gradient(45deg, rgba(102,126,234,0.1), rgba(118,75,162,0.08))',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      }}>
        <ProfileIcon>
          <SchoolIcon />
        </ProfileIcon>
        <div>
          <Typography variant="subtitle1" fontWeight="bold">Student Portal</Typography>
          <Typography variant="body2" color="textSecondary">Welcome back!</Typography>
        </div>
      </Box>
      
      {/* Main Navigation */}
      {navItems.map((item, index) => (
        <StyledListItemButton 
          key={index} 
          component={Link} 
          to={item.path}
          active={isActive(item.path) ? 1 : 0}
        >
          <StyledListItemIcon active={isActive(item.path) ? 1 : 0}>
            {item.icon}
          </StyledListItemIcon>
          <ListItemText 
            primary={item.text} 
            primaryTypographyProps={{
              fontWeight: isActive(item.path) ? 'bold' : 'medium',
              color: isActive(item.path) ? 'primary.main' : 'text.primary'
            }} 
          />
        </StyledListItemButton>
      ))}
      
      <Divider sx={{ my: 2, borderColor: 'rgba(0,0,0,0.08)' }} />
      
      {/* User Section */}
      <ListSubheader 
        component="div" 
        sx={{
          background: 'transparent',
          color: 'primary.main',
          fontWeight: 'bold',
          fontSize: '0.875rem',
          px: 0,
          mb: 1,
        }}
      >
        Account
      </ListSubheader>
      
      {userItems.map((item, index) => (
        <StyledListItemButton 
          key={index} 
          component={Link} 
          to={item.path}
          active={isActive(item.path) ? 1 : 0}
        >
          <StyledListItemIcon active={isActive(item.path) ? 1 : 0}>
            {item.icon}
          </StyledListItemIcon>
          <ListItemText 
            primary={item.text} 
            primaryTypographyProps={{
              fontWeight: isActive(item.path) ? 'bold' : 'medium',
              color: isActive(item.path) ? 'primary.main' : 'text.primary'
            }} 
          />
        </StyledListItemButton>
      ))}
      
      {/* Footer */}
      <Box sx={{ 
        mt: 'auto', 
        textAlign: 'center', 
        pt: 2,
        color: 'text.secondary',
        fontSize: '0.75rem'
      }}>
        <Typography variant="caption">Education Portal v2.0</Typography>
      </Box>
    </SidebarContainer>
  );
}

export default StudentSideBar;