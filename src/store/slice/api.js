import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from './baseurl'
import { emptySplitApi } from './emptySplitApi'

export const api = emptySplitApi.injectEndpoints({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({

    signupCustomer: builder.mutation({
      query: (args) => {
        return {
          url: '/auth/customerSignUp',
          method: 'POST',
          body: {
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email,
            password: args.password,
            type: args.type,
          }
        }
      },
    }),

    signupVendor: builder.mutation({
      query: (args) => {
        return {
          url: '/auth/vendorSignUp',
          method: 'POST',
          body: {
            firstName: args.firstName,
            lastName: args.lastName,
            vendorName: args.vendorName,
            email: args.email,
            password: args.password,
            type: args.type,
          }
        }
      },
    }),

    login: builder.mutation({
      query: (args) => {

        return {
          url: '/auth/login',
          method: 'POST',
          body: {
            email: args.email,
            password: args.password
          }
        }
      },
    }),

    getUser: builder.query({
      query: () => {
        return {
          url: '/users/',
          method: 'GET',
        }
      },
      providesTags: ['User'],
    }),

    editUser: builder.mutation({
      query: (args) => {
        return {
          url: '/users/edit',
          method: 'PATCH',
          body: {
            firstName: args.firstName,
            lastName: args.lastName,
            vendorName: args.vendorName,
            bio: args.bio,
            location: args.location,
            type: args.type,
            picture: args.picture
          }
        }
      },
      invalidatesTags: ['User']
    }),

    addOrder: builder.mutation({
      query: (args) => {
        return {
          url: '/users/order',
          method: 'POST',
          body: {
            name: args.name,
            description: args.description,
            price: args.price,
            location: args.location,
            picture: args.picture,
            tags: args.tags
          }
        }
      },
      invalidatesTags: ['Order']
    }),

    getOrders: builder.query({
      query: () => {
        return {
          url: '/users/order',
          method: 'GET',
        }
      },
      providesTags: ['Order'],
    }),

    getSingleOrder: builder.query({
      query: (orderId) => {
        return {
          url: `/users/order/${orderId}`,
          method: 'GET',
        }
      },
      providesTags: ['SingleOrder']
    }),

    editOrder: builder.mutation({
      query: (args) => {
        return {
          url: `/users/order`,
          method: 'PATCH',
          body: {
            name: args.name,
            description: args.description,
            price: args.price,
            location: args.location,
            picture: args.picture,
            tags: args.tags,
            orderId: args.orderId
          }
        }
      },
      invalidatesTags: ['Order', 'SingleOrder']
    }),

    getAllOrder: builder.query({
      query: () => {
        return {
          url: `/users/allOrder`,
          method: 'GET',
        }
      },
    }),

    changeStatus: builder.mutation({
      query: (args) => {
        return {
          url: `/users/status`,
          method: 'PATCH',
          body: {
            type: args.type,
          }
        }
      },
      invalidatesTags: ['User']
    }),
    
  }),
  overrideExisting: true,
})

export const {
  useSignupCustomerMutation,
  useSignupVendorMutation,
  useLoginMutation,
  useEditUserMutation,
  useAddOrderMutation,
  useGetUserQuery,
  useGetOrdersQuery,
  useGetSingleOrderQuery,
  useGetAllOrderQuery,
  useEditOrderMutation,
  useChangeStatusMutation,
} = api