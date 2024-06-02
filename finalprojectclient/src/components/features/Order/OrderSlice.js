import { createSlice, nanoid ,createAsyncThunk } from '@reduxjs/toolkit'
import { getOrders,getOrderByIdA,postOrderA,deleteOrderA } from './OrderApi'

const initialState = {
    arrOrders: [],
    status: "idle",
    cart:[],
    totalSum:0,
    currentOrder:null,
    numOfItems:0
}

export const fetchAllOrders = createAsyncThunk(
    'order/fetchAllOrders',
    async (thunkAPI) => {
        const res = await getOrders()
        return res
    },
)

export const getOrderById = createAsyncThunk(
    'order/getOrderById',
    async (id,thunkAPI) => {
        const res = await getOrderByIdA(id)
        return res
    },
)

export const postOrder = createAsyncThunk(
    'order/postOrder',
    async (newOrder,thunkAPI) => {
        const res = await postOrderA(newOrder)
        return res
    },
)

export const deleteOrder = createAsyncThunk(
    'order/deleteOrder',
    async (id,thunkAPI) => {
        const res = await deleteOrderA(id)
        return res
    },
)


export const OrderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addProductToCart: (state, action) => {
            const item=action.payload
            const p=state.cart.find(x=>x.id===item.id)
            console.log(p)
            if(p){
                p.qty+=item.qty
                p.finalPrice+=item.qty*item.price
            }
            else{
                state.cart.push(item)
                state.numOfItems++
            }
            state.totalSum+=action.payload.finalPrice
            console.log(action.payload)
        },
        addQty:(state, action)=>{
            let productIndex = state.cart.findIndex(x => x.id == action.payload)
            state.cart[productIndex].qty++
            state.cart[productIndex].finalPrice+=state.cart[productIndex].price
            state.totalSum+=state.cart[productIndex].price
        },
        removeQty:(state, action)=>{
            let productIndex = state.cart.findIndex(x => x.id == action.payload)
            if( state.cart[productIndex].qty>1){
                state.cart[productIndex].qty--
                state.cart[productIndex].finalPrice-=state.cart[productIndex].price
                state.totalSum-=state.cart[productIndex].price
            }
            console.log(state.cart)
        },
        deleteCart:(state, action)=>{
            state.cart=[]
            state.totalSum=0
            state.numOfItems=0
        },
        deleteProductFromCart: (state, action) => {
            let productIndex = state.cart.findIndex(x => x.id == action.payload)
            state.totalSum -= state.cart[productIndex].finalPrice
            state.numOfItems--;
            state.cart.splice(productIndex, 1)
            console.log(state.cart)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllOrders.fulfilled, (state, { payload }) => {
                state.arrOrders = payload
                state.status = "fullfilled"
            })
            // You can chain calls, or have separate `builder.addCase()` lines each time
            .addCase(fetchAllOrders.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.status = "rejected"
            })
            .addCase(postOrder.fulfilled, (state, action) => {
                state.cart=[]
                state.totalSum=0
                state.numOfItems=0
            })
           

    },
})


 export const { addProductToCart ,deleteProductFromCart,addQty,removeQty,deleteCart} = OrderSlice.actions


export default OrderSlice.reducer