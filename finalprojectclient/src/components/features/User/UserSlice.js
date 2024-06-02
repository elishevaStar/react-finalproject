import { createSlice, nanoid ,createAsyncThunk } from '@reduxjs/toolkit'
import { getUsers,getUserByIdA,postUserA,loginA } from './UserApi'

const initialState = {
    currentUser:"guest",
    status: "idle",
    poststatus: "idle",
    arrUsers:[],
    getStatus:"idle"
}

export const fetchAllUsers = createAsyncThunk(
    'user/fetchAllUsers',
    async (thunkAPI) => {
        const res = await getUsers()
        return res
    },
)

export const getUserById = createAsyncThunk(
    'user/getUserById',
    async (id,thunkAPI) => {
        const res = await getUserByIdA(id)
        return res
    },
)

export const postUser = createAsyncThunk(
    'user/postUser',
    async (newUser,thunkAPI) => {
        const res = await postUserA(newUser)
        return res
    },
)

export const login = createAsyncThunk(
    'user/login',
    async (user,thunkAPI) => {
        const res = await loginA(user)
        return res
    },
)



export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state, action) => {
            state.currentUser = "guest"
            state.status="idle"
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, { payload }) => {
                state.currentUser = payload
                state.status = "fullfilled"
                console.log(state.currentUser)
            })
            .addCase(postUser.fulfilled, (state, { payload }) => {
                state.currentUser = payload
                state.status = "fullfilled"
                console.log(state.currentUser)
            })
            // You can chain calls, or have separate `builder.addCase()` lines each time
            .addCase(fetchAllUsers.fulfilled, (state,  { payload }) => {
                state.arrUsers=payload
                state.getStatus = "fulfilled"
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.getStatus = "rejected"
            })

    },
})


export const {  logout } = UserSlice.actions

export default UserSlice.reducer