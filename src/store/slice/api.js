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
      providesTags: ['GetUser']
    }),

    signupVendor: builder.mutation({
      query: (args) => {
        return {
          url: '/auth/vendorSignUp',
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
      providesTags: ['GetUser']
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
      providesTags: ['User', 'GetUser'],
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
            picture: args.picture,
            password: args.password,
          }
        }
      },
      invalidatesTags: ['User']
    }),

    addProduct: builder.mutation({
      query: (args) => {
        return {
          url: '/users/product',
          method: 'POST',
          body: {
            name: args.name,
            category: args.category,
            description: args.description,
            price: args.price,
            location: args.location,
            pictures: args.pictures,
            tags: args.tags
          }
        }
      },
      invalidatesTags: ['Product']
    }),

    getProducts: builder.query({
      query: () => {
        return {
          url: '/users/product',
          method: 'GET',
        }
      },
      providesTags: ['Product'],
    }),

    getSingleProduct: builder.query({
      query: (orderId) => {
        return {
          url: `/users/product/${orderId}`,
          method: 'GET',
        }
      },
      providesTags: ['SingleProduct']
    }),

    editProduct: builder.mutation({
      query: (args) => {
        return {
          url: `/users/product`,
          method: 'PATCH',
          body: {
            category: args.category,
            name: args.name,
            description: args.description,
            price: args.price,
            location: args.location,
            picture: args.picture,
            tags: args.tags,
            productId: args.productId
          }
        }
      },
      invalidatesTags: ['Product', 'SingleProduct']
    }),

    getAllProduct: builder.query({
      query: () => {
        return {
          url: `/users/allProduct`,
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
    
    getCategory: builder.query({
      query: () => {
        return {
          url: `/users/category`,
          method: 'GET',
        }
      },
      providesTags: ['Product']
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
            pictures: args.pictures,
            orderStatus: args.orderStatus,
            quantity: args.quantity,
            orderId: args.orderId,
            productId: args.productId,
          }
        }
      },
      invalidatesTags: ['Order']
    }),

    getOrders: builder.query({
      query: () => {
        return {
          url: `/users/order`,
          method: 'GET',
        }
      },
      providesTags: ['Order', 'OrderDelete', 'Payment']
    }),

    getAllOrders: builder.query({
      query: () => {
        return {
          url: `/users/orders`,
          method: 'GET',
        }
      },
      providesTags: ['Order', 'OrderDelete', 'Payment', 'UpdateOrder']
    }),

    deleteOrder: builder.mutation({
      query: (orderId) => {
        return {
          url: `/users/order/${orderId}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['OrderDelete']
    }),

    addPayment: builder.mutation({
      query: (args) => {
        return {
          url: '/payments/add',
          method: 'POST',
          body: {
            cardNumber: args.cardNumber,
            cvv: args.cvv,
            name: args.name,
            expireDate: args.expireDate,
            price: args.price,
          }
        }
      },
      invalidatesTags: ['Payment']
    }),
 
    makeFavoriteProduct: builder.mutation({
      query: (args) => {
        return {
          url: '/users/favorite',
          method: 'POST',
          body: {
            favorite: args.favorite,
            productId: args.productId,
          }
        }
      },
      invalidatesTags: ['Favorite', 'FavoriteOfUser']
    }),

    getFavoriteProduct: builder.query({
      query: () => {
        return {
          url: `/users/favorite`,
          method: 'GET',
        }
      },
      providesTags: ['Favorite', 'FavoriteOfUser']
    }),

    // getFavoriteProductOfUser: builder.query({
    //   query: () => {
    //     return {
    //       url: `/users/userFavorite`,
    //       method: 'GET',
    //     }
    //   },
    //   providesTags: ['FavoriteOfUser', 'Favorite']
    // }),

    getOrdersPending: builder.query({
      query: () => {
        return {
          url: `/users/orderPending`,
          method: 'GET',
        }
      },
      providesTags: ['Order', 'OrderDelete', 'Payment']
    }),

    getAllTags: builder.query({
      query: () => {
        return {
          url: `/users/tags`,
          method: 'GET',
        }
      },
    }),

    getSearchProduct: builder.query({
      query: (tag) => {
        return {
          url: `/users/search/${tag}`,
          method: 'GET',
        }
      },
      
    }),
    
    updateOrderStatus: builder.mutation({
      query: (args) => {
        return {
          url: '/users/orderStatus',
          method: 'PATCH',
          body: {
            orderStatus: args.orderStatus,
            orderId: args.orderId,
          }
        }
      },
      invalidatesTags: ['UpdateOrder']
    }),

    
  }),
  overrideExisting: true,
})

export const {
  useSignupCustomerMutation,
  useSignupVendorMutation,
  useLoginMutation,
  useEditUserMutation,
  useAddProductMutation,
  useGetUserQuery,
  useGetProductsQuery,
  useGetSingleProductQuery,
  useGetAllProductQuery,
  useGetCategoryQuery,
  useGetOrdersQuery,
  useGetAllOrdersQuery,
  useGetFavoriteProductQuery,
  useGetAllTagsQuery,
  useGetSearchProductQuery,
  useGetOrdersPendingQuery,
  // useGetFavoriteProductOfUserQuery,
  useEditProductMutation,
  useChangeStatusMutation,
  useAddPaymentMutation,
  useAddOrderMutation,
  useDeleteOrderMutation,
  useUpdateOrderStatusMutation,
  useMakeFavoriteProductMutation,
} = api