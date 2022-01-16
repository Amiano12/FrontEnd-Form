import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
    name: 'FormData',
    initialState: {
        firstName: '',
        lastName: '',
        wheels: '',
        type: '',
        model: '',
        startDate: '',
        endDate: '',
        id: '',
    },
    reducers: {
        setFirstName: (state, action) => {
            state.firstName = action.payload;
        },
        setLastName: (state, action) => {
            state.lastName = action.payload;
        },
        setWheels: (state, action) => {
            state.wheels = action.payload;
        },
        setType: (state, action) => {
            state.type = action.payload;
        },
        setModel: (state, action) => {
            state.model = action.payload;
        },
        setStartDate: (state, action) => {
            state.startDate = action.payload;
        },
        setEndDate: (state, action) => {
            state.endDate = action.payload;
        },
        setId: (state, action) => {
            state.id = action.payload;
        },
    }
});

export default formSlice;
