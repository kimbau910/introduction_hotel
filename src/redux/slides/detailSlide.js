import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: '',
};

export const detailSlide = createSlice({
    name: 'detail',
    initialState,
    reducers: {
        searchDetail: (state, action) => {
            state.search = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { searchDetail } = detailSlide.actions;

export default detailSlide.reducer;
