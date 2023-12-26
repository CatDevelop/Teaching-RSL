import {createSlice} from '@reduxjs/toolkit'
import {LocalStorageService} from "../../api/services/localStorageService";

export type AuthState = Readonly<{
    isAuth: boolean;
}>

const initialState: AuthState = {
    isAuth: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.isAuth = true;
        },
        logout: (state) => {
            console.log("Logout")
            state.isAuth = false;
            LocalStorageService.remove("Teaching-RSL-SECRET")
        },
    },
})

export const {login, logout} = authSlice.actions
export default authSlice.reducer
