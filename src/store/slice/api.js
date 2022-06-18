import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SERVER_URL } from './../../constants/index'
import { emptySplitApi } from './emptySplitApi'

export const api = emptySplitApi.injectEndpoints({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: ({ data }) => ({
        url: '/signup',
        method: 'POST',
        body: data
      })
    }),
    createProgram: builder.mutation({
      query: ({ data }) => {
        const formData = new FormData();
        formData.append('name', data.name);
        // formData.append('description', data.description);
        // formData.append('scope', data.scope);
        // formData.append('isActive', data.isActive);
        // formData.append('numberOfSessions', data.numberOfSessions);
        // formData.append('picture', {
        //     uri: data.picture.uri,
        //     name: data.picture.fileName,
        //     type: data.picture.type,
        // });
        return {
          url: '/user/program',
          method: 'POST',
          body: formData
        }
      },
      invalidatesTags: ['programs', 'allExercises']
    }),
    deleteProgram: builder.mutation({
      query: ({ data }) => {
        return {
          url: '/user/program',
          method: 'DELETE',
          body: data
        }
      },
      invalidatesTags: ['programs', 'currentPrograms', 'singleProgram', 'allExercises']
    }),
    createExercise: builder.mutation({
      query: ({ data }) => {
        const formData = new FormData()
        formData.append('programId', data.programId)
        formData.append('dayNumber', data.dayNumber)
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('defaultNumberOfSets', data.defaultNumberOfSets)
        formData.append('defaultNumberOfReps', data.defaultNumberOfReps)
        formData.append('weight', data.weight)
        formData.append('isActive', 'true')
        if (data.video) {
          formData.append('videoinstruction', {
            uri: data.video.uri,
            name: data.video.filename,
            type: data.video.type,
          })
        }
        return {
          url: '/user/programexercise',
          method: 'POST',
          body: formData
        }
      },
      invalidatesTags: ['programs', 'currentPrograms', 'singleProgram', 'allExercises']
    }),
    uploadProgramImage: builder.mutation({
      query: ({ data }) => {
        const formData = new FormData()
        formData.append('programId', data.programId)
        formData.append('picture', {
          uri: data.picture.uri,
          name: data.picture.filename,
          type: data.picture.type,
        })
        return {
          url: '/user/program',
          method: 'PATCH',
          body: formData
        }
      },
      invalidatesTags: ['programs', 'currentPrograms', 'singleProgram']
    }),
    editProfileImage: builder.mutation({
      query: ({ data }) => {
        const formData = new FormData()
        formData.append('picture', {
          uri: data.picture.uri,
          name: data.picture.filename,
          type: data.picture.type,
        })
        return {
          url: '/user/editProfile',
          method: 'PATCH',
          body: formData
        }
      },
      invalidatesTags: ['userDetail']
    }),
    uploadExerciseVideo: builder.mutation({
      query: ({ data }) => {
        const formData = new FormData()
        // formData.append('programId', data.programId)
        formData.append('exerciseId', data.exerciseId)
        formData.append('videoinstruction', {
          uri: data.video.uri,
          name: data.video.filename,
          type: data.video.type,
        })
        return {
          url: '/user/exercise',
          method: 'PATCH',
          body: formData
        }
      },
      invalidatesTags: ['programs', 'currentPrograms', 'singleProgram', 'allExercises']
    }),
    updateProgramSession: builder.mutation({
      query: ({ data }) => {
        return {
          url: '/user/programsession',
          method: 'PATCH',
          body: data
        }
      },
      invalidatesTags: ['programs', 'currentPrograms', 'singleProgram', 'allExercises']
    }),
    getUserPrograms: builder.query({
      query: () => {
        return {
          url: '/user/programs',
          method: 'GET',
        }
      },
      providesTags: (result, error, id) => [{ type: 'programs', id }],
      //no need of this right now
      // onQueryStarted: async (id ,{ dispatch, queryFulfilled }) => {
      //     try {
      //         const { data } = await queryFulfilled;
      //     } catch (err) {
      //         console.log("error... ", err);
      //     }
      // }
    }),
    getSingleUserProgram: builder.query({
      query: () => {
        return {
            url: '/user/programs',
            method: 'GET',
        }
      },
      transformResponse: (response, meta, arg) => {

        const singleUserProgram = response.filter((value) => value.id == arg);
        if (singleUserProgram.length) {

          return singleUserProgram[0].programSessions;
        } else {

            return []
          }
        },
        providesTags: (result, error, id) => [{ type: 'singleProgram', id }],
    }),
    duplicateDay: builder.mutation({
      query: ({ data }) => {
          return{
              url: '/user/duplicateDay',
              method: 'POST',
              body: data
          }
      },
      invalidatesTags: ['programs', 'currentPrograms', 'singleProgram'],
    }),
    performWorkout: builder.mutation({
      query: ({ data }) => {
        return {
          url: '/user/activeProgram',
          method: 'POST',
          body: data
        }
      },
      invalidatesTags: ['programs', 'currentPrograms', 'singleProgram']
    }),
    stopWorkout: builder.mutation({
      query: ({ data }) => {
        return {
          url: '/user/inActiveProgram',
          method: 'POST',
          body: data
        }
      },
      invalidatesTags: ['programs', 'currentPrograms', 'singleProgram']
    }),
    deletedDay: builder.mutation({
      query: ({ data }) => {
        return {
          url: '/user/program/deleteDay',
          method: 'DELETE',
          body: data
        }
      },
      invalidatesTags: ['programs', 'currentPrograms', 'singleProgram']
    }),
    addWorkout: builder.mutation({
      query: ({ data }) => {
        return {
          url: '/user/addWorkout',
          method: 'POST',
          body: data
        }
      },
      invalidatesTags: ['programs', 'finishedPrograms', 'currentPrograms']
    }),
    currentPrograms: builder.query({
      query: () => {
        return {
          url: '/user/currentPrograms',
          method: 'GET'
        }
      },
      providesTags: (result, error, id) => [{ type: 'currentPrograms', id }],
    }),
    getFinishedPrograms: builder.query({
      query: () => {
        return {
            url: '/user/finishedPrograms',
            method: 'GET',
        }
      },
        providesTags: (result, error, id) => [{ type: 'finishedPrograms', id }],
    }),
    getUserDetail: builder.query({
      query: () => {
        return {
            url: '/user/userDetail',
            method: 'GET',
        }
      },
        providesTags: (result, error, id) => [{ type: 'userDetail', id }],
    }),
    getAllExercises: builder.query({
      query: () => {
        return {
            url: '/user/allExercises',
            method: 'GET',
        }
      },
        providesTags: (result, error, id) => [{ type: 'allExercises', id }],
    }),
  }),
  overrideExisting: true,
})

export const {
  useSignupMutation,
  useCreateProgramMutation,
  useCreateExerciseMutation,
  useUpdateProgramSessionMutation,
  useUploadProgramImageMutation,
  useEditProfileImageMutation,
  useGetUserProgramsQuery,
  useGetSingleUserProgramQuery,
  useGetFinishedProgramsQuery,
  useGetAllExercisesQuery,
  useGetUserDetailQuery,
  useDeleteProgramMutation,
  usePerformWorkoutMutation,
  useDuplicateDayMutation,
  useDeletedDayMutation,
  useAddWorkoutMutation,
  useCurrentProgramsQuery,
  useUploadExerciseVideoMutation,
  useStopWorkoutMutation, } = api