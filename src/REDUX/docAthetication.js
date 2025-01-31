import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctor: [],
  athetication: false,
  token: null,
};

const docAthetication = createSlice({
  name: "DOCTOR-details",
  initialState,
  reducers: {
    getDoctorLoginInfo: (state, action) => {
      state.doctor = action.payload.doctor;
      state.athetication = action.payload.athetication;
      state.token = action.payload.token;
    },
  },
});

export const { getDoctorLoginInfo } = docAthetication.actions;
export default docAthetication.reducer;
