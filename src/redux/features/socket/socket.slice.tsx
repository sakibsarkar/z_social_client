import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TAuthState = {
  socket: string | null;
};
const initialState: TAuthState = {
  socket: null,
};
const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket(state, action: PayloadAction<string | null>) {
      state.socket = action.payload;
    },
  },
});

export const { setSocket } = socketSlice.actions;
export default socketSlice.reducer;
