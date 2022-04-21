
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
        img:""

    },
    reducers: {
        addToCart: (state, action)=>{
            state.products.push(action.payload) 
            state.quantity = parseInt(state.quantity) + parseInt(action.payload.quantity);
            state.total += action.payload.price * action.payload.quantity;
            state.img = action.payload.img
        },
        emptyCart: (state)=>{
            state.products = []
            state.quantity = 0
            state.total = 0
            state.img = ""
        }
    }

})

export const { addToCart, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;




// export store and methods