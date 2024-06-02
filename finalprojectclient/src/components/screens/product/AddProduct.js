import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector} from "react-redux";
import { useState,useEffect } from "react";
import { postProduct,putProduct } from "../../features/Product/ProductSlice";
import { useParams, useNavigate } from "react-router-dom"
import { getProductById } from '../../features/Product/ProductSlice';
import Icon from '@mui/material/Icon';
import { current } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
const defaultTheme = createTheme();

export default function AddProduct() {

  const id = useParams().id
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.currentProduct);
  const add=id?false:true
  const nav=useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imgUrl: '',
    content:'',
    price:'',
    qty:''
  });

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if(!add && product){
      setFormData({
        name: product.name || '',
        description: product.description || '',
        imgUrl: product.imgUrl || '',
        content: product.content || '',
        price: product.price || '',
        qty: product.qty || '',
      });
    }
  }, [product])

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, dirtyFields, isValid },
  } = useForm({ mode: 'onBlur' });


  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(add)
      dispatch(postProduct(formData))
    else
      dispatch(putProduct({id:id,newProduct:formData}))
    nav('/products')
  };

  const handleChange=(e)=>{
    const { name, value,type } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '50vh' , width:'60vw',marginLeft:'20vw'}}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:`url(${!add && product? product.imgUrl : 'https://www.laline.com/media/catalog/product/cache/1/small_image/480x385/9df78eab33525d08d6e5fb8d27136e95/m/0/m08161999999.jpg'})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            { <Typography component="h1" variant="h5">{ add? "Add Product" : "Update Product" }</Typography>}
            <Box component="form" onSubmit={(e)=>handleSubmit(onSubmit(e))} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="name"
                value={add?'':formData.name}
                onChange={handleChange}
                name="name"
                autoComplete="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="description"
                value={add?'':formData.description}
                onChange={handleChange}
                name="description"
                autoComplete="description"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="content"
                label="content"
                value={add?'':formData.content}
                onChange={handleChange}
                name="content"
                autoComplete="content"
              />
              <TextField
                margin="normal"
                type='number'
                required
                fullWidth
                id="price"
                label="price"
                value={add?'':formData.price}
                onChange={handleChange}
                name="price"
                autoComplete="price"
                inputProps={{min:0}}
              />
             
              <TextField
                margin="normal"
                required
                fullWidth
                id="imgUrl"
                label="imgUrl"
                value={add?'':formData.imgUrl}
                onChange={handleChange}
                name="imgUrl"
                autoComplete="imgUrl"
              />

              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="qty"
                  label="qty"
                  value={add?'':formData.qty}
                  onChange={handleChange}
                  name='qty'
                  autoComplete="qty"
                  type="number"
                inputProps={{min:0}}
             />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {add ?'Add':'Update'}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}