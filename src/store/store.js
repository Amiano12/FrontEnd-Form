import { configureStore } from "@reduxjs/toolkit";

import formSlice from "./formSlice";

const store = configureStore({
    reducer: formSlice.reducer,
});

export default store;