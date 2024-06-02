import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import ProductList from '../screens/product/ProductList';
import Login from '../screens/user/Login';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import {logout} from '../features/User/UserSlice'
import { useDispatch } from 'react-redux';
import AddProduct from '../screens/product/AddProduct';
import UserList from '../screens/user/UserList';
import OrderList from '../screens/order/OrderList'
import {deleteCart} from '../features/Order/OrderSlice'



const pages = ['Products','Add Product', 'Users', 'Orders'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ManagerNavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  let nav=useNavigate()
  const dis=useDispatch()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut= () => {
    setAnchorEl(null);
    dis(logout())
    dis(deleteCart())
    nav('/')
    
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const openPages = (page) => {
    if(page==pages[0]){
      nav('/products')
    }
    if(page==pages[1]){
      nav('/addProduct')
    }
    if(page==pages[2]){
      nav('/users')

    }
    if(page==pages[3]){
      nav('/orders')

    }
    
  };

  return (
    <>
    <AppBar position="static" >
      <Container maxWidth="xl"  sx={{backgroundColor:"#f8bbd0"}}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img 
                src="https://www.laline.com/skin/frontend/rwd/default/images/logo.png"
                alt="logo"
                loading="lazy"
                width={50}
            />
            
          </Typography>
          <img 
                src="https://www.togonline.co.il/images/cart.svg"
                alt="logo"
                loading="lazy"
                width={50}
            />

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              
              {pages.map((page) => (
                <MenuItem key={page} onClick={()=>{openPages(page)}}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              
            </Menu>
            
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img 
                src="https://www.laline.com/skin/frontend/rwd/default/images/logo.png"
                alt="logo"
                loading="lazy"
                width={50}
            />
           
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>{openPages(page)}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Logout">
              <IconButton onClick={handleMenu} sx={{ p: 0 ,width:50,height:50}}
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogOut}>Exit</MenuItem>
              </Menu>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    {/* <Routes>
        <Route path='/' element={<ProductList></ProductList>}></Route>
        <Route path='/products' element={<ProductList></ProductList>}></Route>
        <Route path='/addProduct' element={<AddProduct></AddProduct>}></Route>
        <Route path='/addProduct/:id' element={<AddProduct></AddProduct>}></Route>
        <Route path='/users' element={<UserList></UserList>}></Route>
        <Route path='/orders' element={<OrderList></OrderList>}></Route>

      </Routes> */}
    </>
  );
}
export default ManagerNavBar;