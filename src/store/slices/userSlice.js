import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import API from '../../api/API';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    id: null,
    email: null,
    firstName: null,
    secondName: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            state.id = action.payload.id;
            state.email = action.payload.login;
            state.firstName = action.payload.firstName;
            state.secondName = action.payload.secondName;

            localStorage.setItem('TeachingRSL-userID', action.payload.id);
            localStorage.setItem('TeachingRSL-email', action.payload.login);
            localStorage.setItem('TeachingRSL-firstName', action.payload.firstName);
            localStorage.setItem('TeachingRSL-secondName', action.payload.secondName);
        },
        removeUser(state) {
            state.id = null;
            state.email = null;
            state.firstName = null;
            state.secondName = null;

            localStorage.removeItem('TeachingRSL-userID');
            localStorage.removeItem('TeachingRSL-email');
            localStorage.removeItem('TeachingRSL-firstName');
            localStorage.removeItem('TeachingRSL-secondName');
        },
    },
    extraReducers: {
    },
});

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;
