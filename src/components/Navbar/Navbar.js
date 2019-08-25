import React, { useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MobileButtonsMenu from './MobileButtonsMenu';
import HostingComponent from '../login/Animatlogin';
import { Link, withRouter } from "react-router-dom";
import './style.css';
import firebase from '../Firebase/Firebase'
import SearchField from '../SearchField/SearchField'
import Logo from '../../logos/logo.png'

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        height: '20px',
        width:'150px',
        marginRight: theme.spacing(2),
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        // pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    
}));

function PrimarySearchAppBar(props) {


    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [temp, setTemp] = React.useState(true)

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);



    function handleProfileMenuOpen(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleMobileMenuClose() {
        setMobileMoreAnchorEl(null);
    }
    function handlechangehistoryToHome() {
        props.history.push({ pathname: '/' })
    }
    function signOut() {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
        });
        sessionStorage.clear();
        handleMenuClose()
    }

    function handleMenuClose() {
        setAnchorEl(null);
        handleMobileMenuClose();
    }

    function handleMobileMenuOpen(event) {
        setMobileMoreAnchorEl(event.currentTarget);
    }



    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <Link className='link' to='/user'>
                <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
            </Link>
            <Link className='link' to='/'>
                <MenuItem onClick={signOut}>Sign out</MenuItem>
            </Link>
        </Menu>
    );

    // user menu for mobile 

    // const mobileMenuId = 'primary-search-account-menu-mobile';
    // const renderMobileMenu = (
    //     <Menu
    //         anchorEl={mobileMoreAnchorEl}
    //         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    //         id={mobileMenuId}
    //         keepMounted
    //         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    //         open={isMobileMenuOpen}
    //         onClose={handleMobileMenuClose}
    //     >
    //         <MenuItem>
    //             <IconButton aria-label="show 4 new mails" color="inherit">
    //                 <Badge badgeContent={4} color="secondary">
    //                     <MailIcon />
    //                 </Badge>
    //             </IconButton>
    //             <p>Messages</p>
    //         </MenuItem>
    //         <MenuItem>
    //             <IconButton aria-label="show 11 new notifications" color="inherit">
    //                 <Badge badgeContent={11} color="secondary">
    //                     <NotificationsIcon />
    //                 </Badge>
    //             </IconButton>
    //             <p>Notifications</p>
    //         </MenuItem>
    //         <MenuItem onClick={handleProfileMenuOpen}>
    //             <IconButton
    //                 aria-label="account of current user"
    //                 aria-controls="primary-search-account-menu"
    //                 aria-haspopup="true"
    //                 color="inherit"
    //             >
    //                 <AccountCircle />
    //             </IconButton>
    //             <p>Profile</p>
    //         </MenuItem>
    //     </Menu>
    // );

    const userInfo = <div className={classes.sectionDesktop}>
        {/* messages and notification menu */}
        {/* <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
                <MailIcon />
            </Badge>
        </IconButton>
        <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
            </Badge>
        </IconButton> */}
        <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
        >
            <AccountCircle />
        </IconButton>
    </div>

    const signIn = <HostingComponent />

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <img src={Logo}
                        onClick={() => handlechangehistoryToHome()}
                        className={classes.title}
                        variant="h6"/>
                        {/* GREEN BOOK */}
                    {/* </img> */}

                    <div className={classes.sectionMobile}>
                        <MobileButtonsMenu />
                    </div>
                    <div className={classes.sectionDesktop}>
                        <Grid item >
                            <Link onClick={()=>temp?setTemp(false):setTemp(true)} className='link' to={{pathname: "/",temp: temp}} >
                                <Button variant="outlined"
                                    size="large"
                                    color="secondary"
                                    className={classes.margin}>
                                    Home
                            </Button>
                            </Link>
                            <Link className='link' to='/mybook/all' >
                                <Button variant="outlined"
                                    size="large"
                                    color="secondary"
                                    className={classes.margin}>
                                    MY BOOKS
                            </Button>
                            </Link>
                            <Link className='link' to='/forum' >
                                <Button variant="outlined"
                                    size="large"
                                    color="secondary"
                                    className={classes.margin}>
                                    Forum
                            </Button>
                            </Link>
                        </Grid>
                    </div>

                    <SearchField/>

                    <div className={classes.grow} />
                    {sessionStorage.getItem("myid") ? userInfo : signIn}
                    {/* {user && userInfo}
                    {!user && signIn} */}
                    {sessionStorage.getItem("myid") && <div className={classes.sectionMobile}>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>}
                </Toolbar>
            </AppBar>
            {/* {renderMobileMenu} */}
            {renderMenu}
        </div>
    );
}



export default withRouter(PrimarySearchAppBar);