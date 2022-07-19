import { createSlice } from "@reduxjs/toolkit"
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from "../services/api";

const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
    blacklist: [''],
}

const initialState = {
    isLoggedIn: null,
    orderImages: [],
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
        addOrderImage: (state, data) => {
            let images = []
            images.push(...state.orderImages, data.payload)
            state.orderImages = [...images]
        },
        removeOrderImage: (state, data) => {
            var arr = state.orderImages.slice();
            arr.splice(data.payload, 1);
            state.orderImages = arr;
        },

        orderImageEmpty: (state, data) => {
            state.orderImages = []
        },
    },
})

export const { loggedIn, logout, addOrderImage, removeOrderImage, orderImageEmpty } = mainSlice.actions

export default mainReducer = persistReducer(persistConfig, mainSlice.reducer)