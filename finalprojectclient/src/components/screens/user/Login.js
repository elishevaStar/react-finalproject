import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login } from '../../features/User/UserSlice';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useState } from 'react';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  // const myUser = useSelector(s=>s.user.currentUser)
  const dis = useDispatch()
  let nav = useNavigate()
  const [user,setUser]=useState({email:"",password:""})
  const [show,setShow]=useState(false)
  const arrUsers=useSelector(s=>s.user.arrUsers)
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, dirtyFields, isValid },
  } = useForm({ mode: 'onBlur' });
  
  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const f=arrUsers.find(x=>x.password==data.get('password') && x.email==data.get('email'))
    console.log(f)
    if(f){
      setShow(false)
      dis(login({
        "email":data.get('email'),
        "password": data.get('password')
      }))
      nav('/')
    }
    else{
      setShow(true)
    }
   
  };

  const signUp=()=>{
    nav('/logup')
  }
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={(e)=>handleSubmit(onSubmit(e))} sx={{ mt: 1 }}>
                {errors.email?.type === 'pattern'?
                 <TextField
                 error
                 fullWidth
                 name="email"
                  id="error"
                  label="Error"
                 helperText="The email address is not valid."
                 onChange={(e) => setUser({...user,email:e.target.value})}
                 {...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ })}
                />: 
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setUser({...user,email:e.target.value})}
                  {...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ })}  
                />}
                {(errors.password?.type === 'minLength' || errors.password?.type === 'maxLength') ?
                 <TextField
                 error
                 name="password"
                 margin="normal"
                  id="error"
                  label="Error"
                  type="password"
                  fullWidth
                 helperText="Enter a password from 4-10 characters."
                 onChange={(e) => setUser({...user,password:e.target.value})}
                 {...register("password", { required: true, minLength: 4,maxLength:10 })}
                />: 
                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setUser({...user,password:e.target.value})}
                {...register("password", { required: true, minLength: 4,maxLength:10 })}
                />
                }
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {show && <h3>User does not exist in the system</h3>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                {/* <Link href="/logup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link> */}
                <Button onClick={signUp} >Don't have an account? Sign Up</Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}