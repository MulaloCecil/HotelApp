import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, IconButton } from '@mui/material';
import Bookings from '../components/Bookings';
import { useNavigate } from "react-router-dom";
import Users from '../components/Users';
import HomeNav from '../components/HomeNav';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflowY: 'auto',
    },
    openDrawer: {
        width: drawerWidth,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const AdminDashboard = () => {
    const classes = useStyles();
    const [selectedItem, setSelectedItem] = useState('Bookings');
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const handleSidebarToggle = (event) => {
        // Check if the clicked element has the "menu-icon" class
        const clickedElement = event.target;
        const isMenuIcon = clickedElement.classList.contains('menu-icon');

        // Toggle the sidebar visibility only if the clicked element is the menu icon
        if (isMenuIcon) {
            setSidebarOpen(!isSidebarOpen);
        }
    };

    const handleLogout = async () => {
        await auth.signOut().then(() => navigate("/login"));
    };

    const renderComponent = () => {
        switch (selectedItem) {
            case 'Bookings':
                return <Bookings />;
            case 'Users':
                return <Users />;
            default:
                return null;
        }
    };

    return (
        <>
            <HomeNav />
            <div className={classes.root}>
                <Drawer
                    className={`${classes.drawer} ${isSidebarOpen ? classes.openDrawer : ''}`}
                    variant="persistent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    open={isSidebarOpen}
                >
                    <Toolbar />
                    <Box sx={{ overflow: 'auto' }}>
                        <List>
                            <ListItem button onClick={handleSidebarToggle}>
                                <IconButton className="menu-icon"> {/* Add a class name to the IconButton */}
                                    <MenuIcon />
                                </IconButton>
                            </ListItem>
                            <ListItem button onClick={() => handleItemClick('Bookings')} sx={{ backgroundColor: selectedItem === 'Bookings' && '#e0e0e0' }}>
                                <ListItemIcon>{/* Add an icon for Bookings */}</ListItemIcon>
                                <ListItemText primary="Bookings" />
                            </ListItem>
                            <ListItem button onClick={() => handleItemClick('Users')} sx={{ backgroundColor: selectedItem === 'Users' && '#e0e0e0' }}>
                                <ListItemIcon>{/* Add an icon for Users */}</ListItemIcon>
                                <ListItemText primary="Users" />
                            </ListItem>
                        </List>
                        <Box sx={{ flexGrow: 1 }} />
                        <ListItem button onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </Box>
                </Drawer>
                <main className={classes.content}>
                    <Toolbar />
                    {renderComponent()}
                </main>
            </div>
        </>
    );
};

export default AdminDashboard;