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
    isLoggedIn: false,
    program: {},
    userPrograms:[],
    userDetail: {}
}


export const mainSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loggedIn: (state) => {
            state.isLoggedIn = true
        },
        saveProgram : (state, data) => {
            state.program = data.payload
        },
        logout : (state, data) => {
            state.isLoggedIn = false
        },
        userPrograms : (state, data) => {
            state.userPrograms = data
        },
        userDetails : (state, data) => {
            state.userDetail = data.payload
        }
    },
})

export const { loggedIn, logout, programSession, saveProgram, userPrograms, userDetails } = mainSlice.actions

export default mainReducer = persistReducer(persistConfig, mainSlice.reducer)