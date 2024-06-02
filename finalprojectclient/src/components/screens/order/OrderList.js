
import axios from 'axios';
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { fetchAllOrders,getOrderById } from '../../features/Order/OrderSlice';
import { useDispatch, useSelector } from "react-redux";
import Cart from './Cart';
import { useParams } from 'react-router-dom';



export default function UserList() {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const arrFromRedux = useSelector(s => s.order.arrOrders)
    const statusFetchData = useSelector(s => s.order.status)
    const currentLogin = useSelector(s=>s.user.currentUser)
    console.log(arrFromRedux)
    const id = useParams().id


    useEffect(() => {

        fetchAllOrdersList()
    }, [])

    const fetchAllOrdersList = async () => {
        // if(id)
        //     dispatch(getOrderById(id))
         if (statusFetchData == "idle")
            dispatch(fetchAllOrders())
    }

    const dispatch = useDispatch()


    return (<>
        <h1>all Orders</h1>
        <ul>
            {currentLogin=="manager" && arrFromRedux.length && arrFromRedux.map(item => {
                return <Cart myOrder={item} ></Cart>
                   
            })}
             {currentLogin!="manager" && arrFromRedux.length && arrFromRedux.filter(item => item.userId == currentLogin.id).map(item => {
                return <Cart myOrder={item} myUser={'user'}></Cart>
                   
            })}

        </ul>
    </>);
}

