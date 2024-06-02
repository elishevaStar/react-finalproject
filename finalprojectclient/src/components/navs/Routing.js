import { Route, Routes } from "react-router-dom";
import ProductList from "../screens/product/ProductList";
import Login from "../screens/user/Login";
import LogUp from "../screens/user/Logup";
import Cart from "../screens/order/Cart";
import AddProduct from "../screens/product/AddProduct";
import UserList from "../screens/user/UserList";
import SingleProduct from "../screens/product/SingleProduct";
import OrderList from "../screens/order/OrderList";
import Payment from "../screens/order/Payment";
import CongratCard from "../screens/order/CongratCard";

export default function Routing() {
    return (
        <Routes>
           <Route path='/' element={<ProductList></ProductList>}></Route>
          <Route path='/products' element={<ProductList></ProductList>}></Route>
          <Route path='/products/:mini' element={<ProductList></ProductList>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/logup' element={<LogUp></LogUp>}></Route>
          <Route path='/cart' element={<Cart></Cart>}></Route>
          <Route path='/addProduct' element={<AddProduct></AddProduct>}></Route>
          <Route path='/addProduct/:id' element={<AddProduct></AddProduct>}></Route>
          <Route path='/users' element={<UserList></UserList>}></Route>
          <Route path='/orders' element={<OrderList></OrderList>}></Route>
          <Route path='/product/:id' element={<SingleProduct></SingleProduct>}></Route>
          <Route path='/payment' element={<Payment></Payment>}></Route>
          <Route path='/congrat' element={<CongratCard></CongratCard>}></Route>
        </Routes>
    )
}