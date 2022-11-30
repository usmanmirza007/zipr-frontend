import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logout } from '../reducer/mainSlice';
import { store } from '../store'
import { BASE_URL } from './baseurl'
import { isJwtExpired } from 'jwt-check-expiration';
import Snackbar from 'react-native-snackbar';

console.log('url', BASE_URL);

export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: BASE_URL,
    //prepare headers work need to be done
    prepareHeaders : async (headers, {getState}) => {
      try{
        const token = store.getState().user.isLoggedIn
        const isLogin = isJwtExpired(token.token)
        // store.dispatch(createApi.util.resetApiState())
        if (!isLogin) {
          headers.set('authorization', `Bearer ${token.token}`)
        } else {
          store.dispatch(logout())
          Snackbar.show({
            text: 'Token has expried please login again', duration: Snackbar.LENGTH_SHORT, backgroundColor: '#24A9DF',
          });
          headers.set('authorization', '')
        }
      } catch(err) {
        headers.set('authorization', '')
      }
      return headers
    },
   }),
  endpoints: () => ({}),
  tagTypes: [
    'Product',
    'SingleProduct',
    'User',
    'Order',
    'OrderDelete',
    'Payment',
    'GetUser',
    'Favorite',
    'FavoriteOfUser',
    'UpdateOrder'
  ],
})