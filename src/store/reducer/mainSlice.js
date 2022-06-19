import { createSlice } from "@reduxjs/toolkit"
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from "../services/api";

const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
    blacklist: ['program', 'userPrograms'],
}

const initialState = {
    isLoggedIn: null,
    program: {},
    userPrograms:[],
    userDetail: {}
}


export const mainSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loggedIn: (state, data) => {
            state.isLoggedIn = {
                token: data.payload.token,
                userType: data.payload.type
            }
        },
        logout : (state) => {
            state.isLoggedIn = null
        },
    },
})

export const { loggedIn, logout } = mainSlice.actions

export default mainReducer = persistReducer(persistConfig, mainSlice.reducer)