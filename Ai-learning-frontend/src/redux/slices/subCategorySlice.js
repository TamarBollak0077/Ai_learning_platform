import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subCategories: [],
};

const subCategorySlice = createSlice({
  name: "subCategories",
  initialState,
  reducers: {
    setSubCategories(state, action) {
      state.subCategories = action.payload;
    },
  },
});

export const { setSubCategories } = subCategorySlice.actions;
export default subCategorySlice.reducer;