import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { store } from '../store'
// import auth from '@react-native-firebase/auth'
// import { BASE_URL } from '../utils/baseurl'
import { SERVER_URL } from './../../constants/index'

export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: SERVER_URL,
    //prepare headers work need to be done
    prepareHeaders : async (headers, {getState}) => {
      try{
        const token = store.getState().user.isLoggedIn
        // console.log('token', token);
        if (token) {
          headers.set('authorization', `Bearer ${token}`)
        } else {
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
    'programs', 
    'currentPrograms', 
    'singleProgram', 
    'finishedPrograms',
    'allExercises',
    'userDetail'
  ],
})