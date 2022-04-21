import { createSlice } from "@reduxjs/toolkit";


const adminSlice = createSlice({
    name: "admin",
    initialState: {
        currentAdmin: null,
        isFetching: false,
        errorFound: false
    },

    reducers : {
        storeAdmin: (state, action)=>{
            state.currentAdmin = action.payload
            state.isFetching = false
        },
        fetching: (state)=>{
            state.isFetching = true
        },
        errorFound: (state)=>{
            state.errorFound = true
            state.isFetching = false
        },
    },
})

export const { storeAdmin,fetching, errorFound } = adminSlice.actions;
export default adminSlice.reducer;