import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../../features/Product/ProductSlice';
import { addProductToCart } from '../../features/Order/OrderSlice';
import NumberInput from '../order/NumberInput'
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function SingleProduct() {
    const id = useParams().id
    const product=useSelector(s=>s.product.currentProduct)
    const currentLogin = useSelector(s=>s.user.currentUser)
    const dis = useDispatch()
    const nav=useNavigate()
    const [qty, setQty]=useState(1)
    const currentCart = useSelector(s=>s.order.cart)
    

    useEffect(() => {

        getOneProduct()
      }, [])
    
      const getOneProduct=()=>{
        if(id){ 
          dis(getProductById(id))
        }
    }

    const addToCart=()=>{
      const mini=true;
      dis(addProductToCart({ ...product,qty:qty,finalPrice:product.price*qty}))
      nav('/products/'+mini)
    }
    
  return (
    <>
    <Card sx={{  m: 2 ,height:'70vh',width:'40vw',marginLeft:'30vw',marginTop:'15vh'}}>
      <CardHeader
        title={
            product && product.name
        }
        subheader={
            product && product.description
        }
      />
        <CardMedia
          component="img"
          height="200"
          image={product && product.imgUrl}
          alt="products' image"
          sx={{objectFit:'cover'}}
        />

      <CardContent>
        
          <Typography variant="body" color="text.secondary" component="p">
            {
                product && "content:" +product.content+" "+"price:"+product.price+"$"
            
            }
          </Typography>
          <br></br>
          <NumberInput myFunc={setQty}></NumberInput>
          <br></br>
          <Button variant="outlined" sx={{color:'#f06292',borderColor:'#f06292'}} onClick={addToCart}>add to cart</Button>
      </CardContent>
    </Card>
    
  </>
  );
}



