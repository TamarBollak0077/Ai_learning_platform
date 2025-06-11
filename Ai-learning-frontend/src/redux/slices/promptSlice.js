import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllPrompts } from "../../api/promptService";

const initialState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchPrompts = createAsyncThunk(
  "prompts/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await fetchAllPrompts();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to fetch prompts");
    }
  }
);

const promptSlice = createSlice({
  name: "prompts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrompts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrompts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPrompts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error loading prompts";
      });
  },
});

export default promptSlice.reducer;