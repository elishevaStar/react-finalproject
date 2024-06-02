import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(true);
  let nav=useNavigate()

  const handleCloseDis = () => {
    setOpen(false);
    nav('/products')
  };

  const handleClose = () => {
    setOpen(false);
    nav('/login')
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"You have not logged in to the system"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          If you want to add a product to the shopping cart
          You must login or if you do not have an account yet open an account
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDis}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}