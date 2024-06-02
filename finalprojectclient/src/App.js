import logo from './logo.svg';
import './App.css';
import GuestNavBar from './components/navs/GuestNavBar';
import Login  from './components/screens/user/Login'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import store from './components/app/store'
import { useSelector } from 'react-redux';
import ManagerNavBar from './components/navs/ManagerNavBar';
import UserNavBar from './components/navs/UserNavBar'
import Payment from './components/screens/order/Payment';
import Routing from './components/navs/Routing';
import MiniCart from './components/screens/order/MiniCart';
import CongratCard from './components/screens/order/CongratCard';



function App() {
  const currentLogin = useSelector(s=>s.user.currentUser)
  return (
    <div className="App">
     
      <BrowserRouter>
      {currentLogin == "guest" ? <GuestNavBar></GuestNavBar> : currentLogin == "manager" ? <ManagerNavBar></ManagerNavBar>: <UserNavBar></UserNavBar>}
      <Routing></Routing>
      </BrowserRouter>
      {/* <CongratCard></CongratCard> */}
     
    </div>
  );
}

export default App;
