import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState: {
        _id: ""
    },
    reducers: {
        storeUserInRedux: (state,action)=>{
            console.log("storing user data in redux")
            state._id = action.payload
        },

        emptyUser: (state)=>{
           state._id= ""
        }
    }
})


export const { storeUserInRedux, emptyUser } = userSlice.actions;
export default userSlice.reducer;