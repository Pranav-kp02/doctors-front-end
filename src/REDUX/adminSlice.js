import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dashData: [],
  docApplyData: [],
  allDoctors: [],
  allApppoiment: [],
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
  },
});

export const {
  getDashData,
  getApplyDoctorData,
  AllDoctorData,
  allAppoimentData,
} = adminSlice.actions;
export default adminSlice.reducer;
