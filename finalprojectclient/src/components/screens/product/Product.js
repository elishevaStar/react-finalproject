import {useDispatch, useSelector } from "react-redux";
import * as React from 'react';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import { getProductById } from '../../features/Product/ProductSlice';
import { useState,useEffect } from "react";

export default function Product(props) {
    let product = props.myProduct
    const dis = useDispatch()
    const currentLogin = useSelector(s=>s.user.currentUser)
    console.log(currentLogin)
    let nav=useNavigate()

    
    const updateProduct=()=>{
      nav('/addProduct/'+product.id) 
    }

    const showOneProduct=()=>{
      nav('/product/'+product.id)
    }


    return (<>
              <img
                srcSet={`${product.imgUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${product.imgUrl}?w=248&fit=crop&auto=format`}
                alt={product.name}
                loading="lazy"
                width={380}
              />
              <ImageListItemBar 
                title={product.name}
                subtitle={"$"+product.price+".00"}
                actionIcon={
                  <IconButton color="primary" aria-label="add to shopping cart" sx={{color:"white"}}>
                    {currentLogin=="manager"? <BuildCircleIcon onClick={updateProduct} />: <AddShoppingCartIcon onClick={showOneProduct}/>}
                  </IconButton>

                }
                
              />
              
              </>
      );
}