import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";
import './style.css';

function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MenuIcon/>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to='/' className='link'><MenuItem onClick={handleClose}>HOME</MenuItem></Link>
        <Link to='/mybook' className='link'><MenuItem onClick={handleClose}>MY BOOKS</MenuItem></Link>
        <Link to='/forum' className='link'><MenuItem onClick={handleClose}>FORUM</MenuItem></Link>
      </Menu>
    </div>
  );
}

export default SimpleMenu;