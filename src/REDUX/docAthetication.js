import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctor: [],
  athetication: false,
  token: null,
  allAppoiment: [],
  docDash: [],
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
    getDoctorDashData: (state, action) => {
      state.docDash = action.payload;
    },
    updateDoctordata: (state, action) => {
      state.doctor = { ...state.doctor, ...action.payload };
    },
  },
});

export const {
  getDoctorLoginInfo,
  getAllDoctorAppoiment,
  getDoctorDashData,
  updateDoctordata,
} = docAthetication.actions;
export default docAthetication.reducer;
