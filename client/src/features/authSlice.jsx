import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  token: "", // en öenmlisi
  loading: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchStart: (state) => {
      // pending işlemi için
      state.loading = true;
      state.error=false
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.user = payload.user.username
      state.token=payload.token
    },
    registerSuccess:(state,{payload})=>{
      state.loading=false;
      state.user=payload.data.username
      state.token=payload.token

    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.user = "";
      state.token = "";
    },

    fetchFail:(state)=>{
      state.loading=false
      state.error=true
    }
  },
});

export const { fetchStart,loginSuccess,fetchFail,registerSuccess,logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
// normalde redux aysncthunk kullanmalıydık ancak 2. bir yöntem daha var workaround yandan çözüm her bir durumu ayrı ayrı ele alıp aycktunck a yapmak yerine kendimiz ayrı ayrı dispatchlerle yapabiliriz.
