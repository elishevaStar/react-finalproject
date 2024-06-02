import * as React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';
import {getOrderById } from '../../features/Order/OrderSlice';
import { useEffect } from 'react'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'



export default function Order(props) {
    const[order,setOrder]=useState()

    const dis = useDispatch()


    // useEffect(() => {
    //     getOneOrder()
    // }, [])

    // const getOneOrder = async () => {
    //   const ord=dis(getOrderById(props.myOrder))   
    // }

  return (
    <Card sx={{  m: 2 ,height:'70vh',width:'40vw',marginLeft:'30vw',marginTop:'15vh'}}>
      <CardHeader
        avatar={
            <Avatar
              alt="Ted talk"
              src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
            />
        }
        action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
        }
        title={
            'Ted'
        }
        subheader={
            '5 hours ago'
        }
      />
        <CardMedia
          component="img"
          height="350"
          // image={ord.imageUrl}
          alt="Nicola Sturgeon on a TED talk stage"
        />

      <CardContent>
        
          <Typography variant="body2" color="text.secondary" component="p">
            {
            //   "Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success:"
            }
          </Typography>
      </CardContent>
    </Card>
  );
}



