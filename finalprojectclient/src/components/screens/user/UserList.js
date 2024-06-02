
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
import { fetchAllUsers } from '../../features/User/UserSlice';
import { useDispatch, useSelector } from "react-redux";
import PersonIcon from '@mui/icons-material/Person';
import Grid from '@mui/material/Grid';




export default function UserList() {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const arrFromRedux = useSelector(s => s.user.arrUsers)
    const statusFetchData = useSelector(s => s.user.getStatus)
    console.log(arrFromRedux)


    useEffect(() => {

        fetchAllUsersList()
    }, [])

    const fetchAllUsersList = async () => {
        if (statusFetchData == "idle")
            dispatch(fetchAllUsers())
    }

    const dispatch = useDispatch()


    return (
                <>
                    <h1>All Users</h1>
                    <Grid container spacing={2} justifyContent="center">
                        {arrFromRedux.length && arrFromRedux.map(item => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                                <Card sx={{ height: '20vh', width: '100%' }}>
                                    <CardHeader
                                        avatar={
                                            <Avatar
                                                alt={item.name}
                                                src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
                                            />
                                        }
                                        title={item.firstName+' '+item.lastName}
                                        subheader={item.email}
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary" component="p">
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </>
            );
}


