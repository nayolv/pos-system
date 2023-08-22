import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CssBaseline, Divider, IconButton, List, ListItem, ListItemIcon, Toolbar, useTheme } from '@mui/material';
import { AppBar, Drawer, DrawerHeader, SidebarItem, sidebarData } from '../Sidebar/helper';
import { Header } from '../Header/Header';
import { UserDto } from '../../models/user.model';
import Logo from '../../assets/images/logo.png'
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import './sidebar.scss';

export const Sidebar = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const userJSON = localStorage.getItem("user");
    const user: UserDto = userJSON ? JSON.parse(userJSON) : null;

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    return (
        <>
            <CssBaseline />
            <AppBar position="fixed" open={open} color='inherit' elevation={0} >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}>
                        <MenuIcon />
                    </IconButton>
                    <Header />
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader className='d-flex justify-content-between'>
                    <a className="navbar-brand d-flex align-items-" href="#">
                        <img src={Logo} alt="logo" width={30} />
                        <h5 className='px-1 d-flex' style={{ margin: 0, padding: 0 }}>
                            POS System
                        </h5>
                    </a>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>

                <Divider />

                <List className='sidebar-container'>
                    {sidebarData[user.role].map(({ text, icon, path }: SidebarItem) => (
                        <ListItem className='sidebar-container__items' key={text} disablePadding>
                            <NavLink
                                to={path}
                                className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}>
                                <div style={{ minHeight: "48px", display: "flex", padding: "0 1rem" }}>
                                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto' }}>
                                        {icon}
                                    </ListItemIcon>
                                    <span style={{ opacity: open ? 1 : 0 }}>
                                        {text}
                                    </span>
                                </div>
                            </NavLink>
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
        </>
    )
}
