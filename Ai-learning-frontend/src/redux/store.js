import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import categoryReducer from "./slices/categorySlice";
import subCategoryReducer from "./slices/subCategorySlice";
import promptReducer from "./slices/promptSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoryReducer,
    subCategories: subCategoryReducer,
    prompts: promptReducer,
  },
});