import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctor: [],
  athetication: false,
  token: null,
  allAppoiment: [],
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
    getAllDoctorAppoiment: (state, action) => {
      state.allAppoiment = action.payload;
    },
  },
});

export const { getDoctorLoginInfo, getAllDoctorAppoiment } =
  docAthetication.actions;
export default docAthetication.reducer;
