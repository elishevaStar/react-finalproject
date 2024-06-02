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
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import {postUser} from '../../features/User/UserSlice';
import { useForm } from 'react-hook-form';
import { useState } from 'react';




// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LogUp() {
  const dis = useDispatch()
  let nav=useNavigate()
  const [user,setUser]=useState({firstName:"",lastName:"",email:"",password:""})
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, dirtyFields, isValid },
  } = useForm({ mode: 'onBlur' });

  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dis(postUser({
      "firstName": data.get('firstName'),
      "lastName":data.get('lastName'),
      "password": data.get('password'),
      "email":data.get('email')
  }))

  nav('/guest');
  };

  const signIn=()=>{
    nav('/login')
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
            Sign up
          </Typography>
          <Box component="form" onSubmit={(e)=>handleSubmit(onSubmit(e))} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                {errors.firstName?.type === 'pattern'?
                 <TextField
                 error
                 name="firstName"
                  id="error"
                  label="Error"
                 helperText="Enter your name in English."
                 onChange={(e) => setUser({...user,firstName:e.target.value})}
                {...register("firstName", { required: true, pattern: /^[A-Za-z]+$/i })}
                />: 
                <TextField
                required
                autoFocus
                fullWidth
                id="firstName"
                label="first Name"
                name="firstName"
                autoComplete="first-name"
                onChange={(e) => setUser({...user,firstName:e.target.value})}
                {...register("firstName", { required: true, pattern: /^[A-Za-z]+$/i })}
                
              />}                
              </Grid>
              <Grid item xs={12} sm={6}>
              {errors.lastName?.type === 'pattern'?
                 <TextField
                 error
                 name="lastName"
                  id="error"
                  label="Error"
                 helperText="Enter your name in English."
                 onChange={(e) => setUser({...user,lastName:e.target.value})}
                 {...register("lastName", { required:true, pattern: /^[A-Za-z]+$/i })}
                />: 
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => setUser({...user,lastName:e.target.value})}
                  {...register("lastName", { required:true, pattern: /^[A-Za-z]+$/i })}
                /> }
              </Grid>
              <Grid item xs={12}>
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
                />
              }
              </Grid>
              <Grid item xs={12}>
               {(errors.password?.type === 'minLength' || errors.password?.type === 'maxLength') ?
                 <TextField
                 error
                 name="password"
                  id="error"
                  label="Error"
                  type="password"
                  fullWidth
                 helperText="Enter a password from 4-10 characters."
                 onChange={(e) => setUser({...user,password:e.target.value})}
                 {...register("password", { required: true, minLength: 4,maxLength:10 })}
                />: 
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setUser({...user,password:e.target.value})}
                  {...register("password", { required: true, minLength: 4,maxLength:10 })}
                />
              }
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                {/* <Link href="\login" variant="body2">
                  Already have an account? Sign in
                </Link> */}
                <Button onClick={signIn} >Already have an account? Sign in</Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );

}