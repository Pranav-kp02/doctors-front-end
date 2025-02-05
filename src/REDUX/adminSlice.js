import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dashData: [],
  docApplyData: [],
  allDoctors: [],
  allApppoiment: [],
  aFilterappoiment: [],
};

const adminSlice = createSlice({
  name: "Admin",
  initialState,
  reducers: {
    getDashData: (state, action) => {
      state.dashData = action.payload;
    },
    getApplyDoctorData: (state, action) => {
      state.docApplyData = action.payload;
    },
    AllDoctorData: (state, action) => {
      state.allDoctors = action.payload;
    },
    allAppoimentData: (state, action) => {
      state.allApppoiment = action.payload;
    },
    adminFilterAppoiment: (state, action) => {
      const status = action.payload;
      if (status) {
        state.aFilterappoiment = state.allApppoiment.filter(
          (ele) => ele.status === status
        );
      } else {
        state.aFilterappoiment = state.allApppoiment;
      }
    },
  },
});

export const {
  getDashData,
  getApplyDoctorData,
  AllDoctorData,
  allAppoimentData,
  adminFilterAppoiment,
} = adminSlice.actions;
export default adminSlice.reducer;
