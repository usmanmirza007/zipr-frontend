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
    editProductImages: [],
    newProductImages: [],
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

        editProductImages: (state, data) => {
            let images = []
            images.push(...state.editProductImages, data.payload)
            state.editProductImages = [...images]
        },

        removeEditProductImage: (state, data) => {
            var arr = state.editProductImages.slice();
            arr.splice(data.payload, 1);
            state.editProductImages = arr;
        },

        newProductImage: (state, data) => {
            let images = []
            images.push(...state.newProductImages, data.payload)
            state.newProductImages = [...images]
        },

        removeNewProductImage: (state, data) => {
            var arr = state.newProductImages.slice();
            arr.splice(data.payload, 1);
            state.newProductImages = arr;
        },

        editProductImageEmpty: (state, data) => {
            state.editProductImages = []
        },

        newProductImageEmpty: (state, data) => {
            state.newProductImages = []
        },
    },
})

export const { loggedIn, logout, editProductImages, removeEditProductImage, editProductImageEmpty, newProductImage, removeNewProductImage, newProductImageEmpty } = mainSlice.actions

export default mainReducer = persistReducer(persistConfig, mainSlice.reducer)