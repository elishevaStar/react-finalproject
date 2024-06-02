import { createSlice, nanoid ,createAsyncThunk } from '@reduxjs/toolkit'
import { getProducts,getProductByIdA,postProductA,putProductA, deleteProductA } from './ProductApi'

const initialState = {
    arrProducts: [],
    status: "idle",
    poststatus: "idle",
    currentProduct:null
}

export const fetchAllProducts = createAsyncThunk(
    'product/fetchAllProducts',
    async (thunkAPI) => {
        const res = await getProducts()
        return res
    },
)

export const getProductById = createAsyncThunk(
    'product/getProductById',
    async (id,thunkAPI) => {
        const res = await getProductByIdA(id)
        return res
    },
)

export const postProduct = createAsyncThunk(
    'product/postProduct',
    async (newProduct,thunkAPI) => {
        const res = await postProductA(newProduct)
        return res
    },
)

export const putProduct = createAsyncThunk(
    'product/putProduct',
    async ({id,newProduct},thunkAPI) => {
        const res = await putProductA(id,newProduct)
        return res
    },
)

export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (id,thunkAPI) => {
        const res = await deleteProductA(id)
        return res
    },
)


export const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        // setAllProducts: (state, action) => {
        //     state.arrProduct = action.payload
        // },
        // updateProduct: (state, action) => {
        //     let index = state.arrProduct.findIndex(x => x.id === action.payload.id)
        //     state.arrProduct.splice(index, 1, action.payload)
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.fulfilled, (state, { payload }) => {
                state.arrProducts = payload
                state.status = "fullfilled"
            })
            // You can chain calls, or have separate `builder.addCase()` lines each time
            .addCase(fetchAllProducts.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.status = "rejected"
            })
            .addCase(postProduct.fulfilled, (state, action) => {
                state.poststatus = "fullfilled"
                console.log(state.poststatus)
            })
            .addCase(postProduct.rejected, (state, action) => {
                state.poststatus = "rejected"
                console.log(state.poststatus)
            })
            .addCase(getProductById.fulfilled, (state, { payload }) => {
                state.currentProduct = payload
            })

    },
})


// export const {  updateProduct } = ProductSlice.actions

export default ProductSlice.reducer