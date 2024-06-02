import { Card, Typography, Box, Button, Grid, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import AlertDialog from './AlertDialog';
import { useNavigate } from 'react-router-dom';
import { deleteProductFromCart } from '../../features/Order/OrderSlice';
import { removeQty } from '../../features/Order/OrderSlice';
import { addQty } from '../../features/Order/OrderSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ControlPointIcon from '@mui/icons-material/ControlPoint';



const theme = createTheme({
  palette: {
    // primary: {
    //   main: '#1976d2',
    // },
    // secondary: {
    //   main: '#1e88e5',
    // },
    background: {
      default: '#e3f2fd',
      paper: '#ffffff',
    },
    // text: {
    //   primary: '#0d47a1',
    //   secondary: '#1e88e5',
    // },
  },
});

export default function Cart(props) {


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentLogin = useSelector(s=>s.user.currentUser)
    const currentCart = useSelector(s=>s.order.cart)
    const totalSum = useSelector(s=>s.order.totalSum)
    const products= useSelector(s=>s.product.arrProducts)
    const manager=currentLogin=="manager"?true:false
    const user=props.myUser=='user'?true:false
    const allCart=(manager || user)?props.myOrder.cart:currentCart
    const [show,setShow]=useState(false)
    const [qty, setQty]=useState(1)
    let nav = useNavigate()
    const dis =useDispatch()

    const completePay = () =>{
        console.log(currentLogin)
        if(currentLogin=="guest")
            setShow(true)
        else if(currentLogin!="manager")
            nav('/payment')
    }

    const incraeseQty= (id)=>{
        const p=products.find(x=>x.id==id)
        const c=currentCart.find(x=>x.id==id)
        if(p.qty>c.qty)
            dis(addQty(id))
    }

    const decraeseQty= (id)=>{
        dis(removeQty(id))
    }

    const deleteFromCart = (id)=>{
        dis(deleteProductFromCart(id))
    }

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2} justifyContent="center" component="main" sx={{ marginTop: '1vh', width: '100%' }}>
        {allCart && allCart.map((item) => (
          <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
            <Item>
              <img src={item.imgUrl} alt={item.name} style={{ maxWidth: '100%', height: 'auto' }} />
              <Typography component="h1" variant="h5" >
                {item.name}
              </Typography>
              {(manager) &&<Typography >userId: {props.myOrder.userId}</Typography>}
              <Typography >Content: {item.content}</Typography>
              <Typography >Qty: {item.qty}</Typography>
              <Typography >Price per Unit: {item.price}</Typography>
              {(user || manager) &&<Typography >Date: {props.myOrder.orderDate}</Typography>}
              <Typography variant="h6" >Final Price: {item.finalPrice}</Typography>
              {!manager && !user && <Typography >
                <IconButton aria-label="delete" onClick={() => deleteFromCart(item.id)} sx={{color:'#f06292'}}>
                <DeleteIcon />
              </IconButton>
              <IconButton aria-label="delete" onClick={() => decraeseQty(item.id)} sx={{color:'#f06292'}}>
                <RemoveCircleOutlineIcon />
              </IconButton>
              <IconButton aria-label="delete" onClick={() => incraeseQty(item.id)} sx={{color:'#f06292'}}>
                <ControlPointIcon />
              </IconButton>     
              </Typography>}
            </Item>
          </Grid>
        ))}
      </Grid>
      {!manager && !user &&<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
        <Card sx={{ 
          height: '8vh', 
          width: '15vw', 
          backgroundColor: 'white', 
          border: '2px solid pink', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <ul style={{ listStyleType: 'none',  padding: 0, textAlign: 'center' }}>
            {/* <Typography variant="h5" color="primary">Amount of items: {itemsFromRedux}</Typography> */}
            <Typography variant="h5" >Final price: {totalSum}</Typography>
          </ul>
        </Card>
        {<Button
          type="submit"
          variant="outlined"
          sx={{ mt: 2 ,color:'#f06292',borderColor:'#f06292'}}
          onClick={completePay}
          size="small"
        >
          Confirm Order
        </Button>}
      </Box>
      }
      {show && <AlertDialog />}
    </ThemeProvider>
  );
}


// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Avatar from '@mui/material/Avatar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { BorderColor, Image, Margin, ShopTwoOutlined } from '@mui/icons-material';
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
// import ImageListItemBar from '@mui/material/ImageListItemBar';
// import { useDispatch, useSelector } from 'react-redux';
// import { createTheme, styled } from '@mui/material/styles';
// import Grid from '@mui/material/Unstable_Grid2';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import { Button } from '@mui/material';
// import { ThemeProvider } from '@mui/material';
// import { useState } from 'react';
// import AlertDialog from './AlertDialog';
// import { useNavigate } from 'react-router-dom';
// import { deleteProductFromCart } from '../../features/Order/OrderSlice';
// import { removeQty } from '../../features/Order/OrderSlice';
// import { addQty } from '../../features/Order/OrderSlice';
// import DeleteIcon from '@mui/icons-material/Delete';

// export default function Cart(props) {
//     const defaultTheme = createTheme();
//     const currentLogin = useSelector(s=>s.user.currentUser)
//     const currentCart = useSelector(s=>s.order.cart)
//     const totalSum = useSelector(s=>s.order.totalSum)
//     const products= useSelector(s=>s.product.arrProducts)
//     const manager=currentLogin=="manager"?true:false
//     const user=props.myUser=='user'?true:false
//     const allCart=(manager || user)?props.myOrder.cart:currentCart
//     const [show,setShow]=useState(false)
//     const [qty, setQty]=useState(1)
//     let nav = useNavigate()
//     const dis =useDispatch()

//     const showDialog = () =>{
//         console.log(currentLogin)
//         if(currentLogin=="guest")
//             setShow(true)
//         else if(currentLogin!="manager")
//             nav('/payment')
//     }

//     const incraeseQty= (id)=>{
//         const p=products.find(x=>x.id==id)
//         const c=currentCart.find(x=>x.id==id)
//         if(p.qty>c.qty)
//             dis(addQty(id))
//     }

//     const decraeseQty= (id)=>{
//         dis(removeQty(id))
//     }

//     const deleteFromCart = (id)=>{
//         dis(deleteProductFromCart(id))
//     }

//     return (
//         <>
//             <ThemeProvider theme={defaultTheme}>
//                 <Grid container component="main" sx={{marginTop:'1vh', height: '50vh' , width:'45vw',marginLeft:'26vw'}}>
//                     {allCart&&allCart.map((item) => (
//                         <>
//                             <Grid key={item.id}
//                                 item
//                                 xs={false}
//                                 sm={3}
//                                 md={6}
//                                 sx={{
//                                     backgroundImage: "url(" + item.imgUrl + ")",
//                                     backgroundRepeat: 'no-repeat',
//                                     backgroundColor: (t) =>
//                                         t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
//                                     backgroundSize: 'cover',
//                                     backgroundPosition: 'center',
//                                 }}
//                             />
//                             <Grid item xs={12} sm={5} md={5}   elevation={6} square sx={{height:'50vh'}}>
//                                 <Box
//                                     sx={{
//                                         my: 8,
//                                         mx: 4,
//                                         display: 'flex',
//                                         flexDirection: 'column',
//                                         alignItems: 'center',
//                                     }}
//                                 >
//                                     <Typography component="h1" variant="h5">
//                                         {item.name}
//                                     </Typography>
//                                     <Box  noValidate  sx={{ mt: 1 }}>  
//                                         <div>
//                                             <p>content:{item.content}</p>
//                                             <p>qty:{item.qty}</p>
//                                             <p>pricePerUnit:{item.price}</p>
//                                             <h5>finalPrice:{item.finalPrice}</h5>
//                                             {(manager || user) &&<p>date:{props.myOrder.orderDate}</p>}
//                                             {!manager && !user &&<p>
//                                                 <Button variant="outlined" onClick={()=>{decraeseQty(item.id)}} sx={{  m: 1, border: 1,color:'#f06292',borderColor:'#f06292',  height: '2rem',borderRadius: '50%' }}>-</Button>
//                                                 <Button variant="outlined" onClick={()=>{incraeseQty(item.id)}} sx={{  m: 1, border: 1,color:'#f06292',borderColor:'#f06292', height: '2rem',borderRadius: '50%' }}>+</Button>
//                                                 <br></br>
//                                                 <br></br>
//                                                 <Button variant="outlined" startIcon={<DeleteIcon />} onClick={()=>{deleteFromCart(item.id)}}  sx={{color:'#f06292',borderColor:'#f06292',fontSize:'small',marginRight:'20vvw'}} >delete</Button>
//                                             </p>}
//                                         </div>
//                                     </Box>
//                                 </Box>
//                             </Grid> 
//                         </>
//                     ))}
//                 </Grid>
//             </ThemeProvider>
//             <div>
//                 {!manager && !user && 
//                 <Card>
//                     <p>*All orders arrive at the laline branch in Petah Tikva within ten business days</p>
//                     <h3>Amount to pay: {totalSum}</h3>
//                     <Button variant="outlined"  sx={{color:'#f06292',borderColor:'#f06292' }} onClick={showDialog}>for payment</Button>
//                 </Card>}
//                 {show && <AlertDialog></AlertDialog>}
//             </div>
//         </>
//     );
// }

