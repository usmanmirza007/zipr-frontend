import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logout } from '../reducer/mainSlice';
import { store } from '../store'
import { BASE_URL } from './baseurl'
console.log('url', BASE_URL);

export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: BASE_URL,
    //prepare headers work need to be done
    prepareHeaders : async (headers, {getState}) => {
      try{
        const token = store.getState().user.isLoggedIn
        // console.log('token', token);
        if (token) {
          headers.set('authorization', `Bearer ${token.token}`)
        } else {
          store.dispatch(logout())
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
    'Order',
    'SingleOrder',
    'User'
  ],
})