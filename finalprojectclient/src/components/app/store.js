import { configureStore } from '@reduxjs/toolkit'
import ProductSlice from '../features/Product/ProductSlice'
import UserSlice from '../features/User/UserSlice'
import OrderSlice from '../features/Order/OrderSlice'

export const store = configureStore({
  reducer: {
       product:ProductSlice,
       user:UserSlice,
       order:OrderSlice
  },
})