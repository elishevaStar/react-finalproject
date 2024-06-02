import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CongratCard() {
  const currentLogin = useSelector(s=>s.user.currentUser)
  const nav=useNavigate()
  const back=()=>{
     nav('/products')
  }
  return (
    <Card
      data-resizable
      sx={{
        textAlign: 'center',
        alignItems: 'center',
        width: '40%',
        marginLeft:'28vw',
        marginTop:'15vh',
        overflow: 'auto',
        resize: 'horizontal',
        '--icon-size': '100px',
      }}
    >
      <CardOverflow variant="solid" color="danger">
        <AspectRatio
          variant="outlined"
          color="pink"
          ratio="1"
          sx={{
            m: 'auto',
            transform: 'translateY(50%)',
            borderRadius: '50%',
            width: 'var(--icon-size)',
            boxShadow: 'sm',
            bgcolor: 'pink',
            position: 'relative',
          }}
        >
          <div>
          <img 
                src="https://www.laline.com/skin/frontend/rwd/default/images/logo.png"
                alt="logo"
                loading="lazy"
                width={50}
            />
          </div>
        </AspectRatio>
      </CardOverflow>
      <Typography level="title-lg" sx={{ mt: 'calc(var(--icon-size) / 2)' }}>
        🎊 Congrats {currentLogin?.firstName} 🎊
      </Typography>
      <CardContent sx={{ maxWidth: '40ch' }}>
      The order was successfully placed
       The shipment will arrive at the Petah Tikva branch within ten business days
      </CardContent>
      <CardActions
        orientation="vertical"
        buttonFlex={1}
        sx={{
          '--Button-radius': '40px',
          width: 'clamp(min(100%, 160px), 50%, min(100%, 200px))',
        }}
      >
        <Button onClick={back} variant="plain" color="danger">
        Back to the site
        </Button>
      </CardActions>
    </Card>
  );
}