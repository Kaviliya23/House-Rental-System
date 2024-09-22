import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    currentUser:null,
    error:null,
    loading:false,
};

const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart:(state)=>{
        state.loading=true;
    },

    signInSuccess:(state,action)=>{
        state.currentUser=action.payload;
        state.loading=false;
        state.error=null;
    },

    signInFailure:(state)=>{
        state.loading=false;
        state.error=action.payload;
    },

  },
});

export const { signInStart,signInSuccess,signInFailure } = userSlice.action

export default counterSlice.reducer