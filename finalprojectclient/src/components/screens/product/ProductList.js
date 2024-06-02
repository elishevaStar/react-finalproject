import axios from 'axios'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import React,{useState} from 'react';
import {fetchAllProducts } from '../../features/Product/ProductSlice';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import '../../../components/stylesheet.css'
import Product from './Product';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import MiniCart from '../order/MiniCart';
import { useParams } from 'react-router-dom';

export default function ProductList() {

const arrFromRedux = useSelector(s=>s.product.arrProducts)
const statusFetchData = useSelector(s => s.product.status)
const currentLogin = useSelector(s=>s.user.currentUser)
const totalSum = useSelector(s=>s.order.totalSum)
const mini=useParams().mini

console.log(arrFromRedux)

    useEffect(() => {

      fetchAllProductsList()
    }, [])

    const fetchAllProductsList = async () => {
      if(statusFetchData=="idle")
           dispatch(fetchAllProducts())
    }

    const dispatch = useDispatch()

    return (
        <div>
        {statusFetchData === "pending"  && <CircularProgress/>}
        {/* {statusFetchData === "failed!!"|| statusDelete==="failded delete" && <Alert severity="error">There is an error in your project!</Alert>} */}
        <ul>
        {arrFromRedux &&<Box
sx={{
    display: 'grid',
    columnGap: 3,
    rowGap: 1,
    gridTemplateColumns: 'repeat(3, 1fr)',
    marginRight:4,
  }}
>
          {arrFromRedux.map((item) => (
            <ImageListItem key={item.imgUrl}>
              <Product  myProduct={item}></Product>
            </ImageListItem>
            ))}
          </Box>}
        </ul>
        {mini &&<MiniCart></MiniCart>}
        </div>
        
    )
}