import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { taskType } from "./types";

export const BASE_URL = "http://localhost:5000/api/tasks"

interface globalStateType {
    task: taskType[]
}

export const globalState: globalStateType = {
    task: []
};

export const taskSlice = createApi({
    reducerPath: "api",
    tagTypes: ["getTask"],
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),

    endpoints: builder => ({
        getAllTask: builder.query<taskType[], void>({
            query: () => {
                return {
                    url: "/",
                    method: "GET"
                }
            },
            providesTags: ["getTask"]
        }),

        createTask: builder.mutation<taskType, taskType>({
            query: (body) => {
                return {
                    url: "/",
                    method: "POST",
                    body: body 
                }
            },
            invalidatesTags: ["getTask"]
        }),

        getFilteredTask: builder.query({
            query: (data) => {
                return {
                    url: `/filter-task/${data}`,
                    method: "GET"
                }
            }
        }),

        upateCompletion: builder.mutation({
            query: (body => ({
                url: '/complete',
                method: 'PATCH',
                body: body,
            })),
            invalidatesTags: ["getTask"]
        }),
    })
})

export const {
    useGetAllTaskQuery,
    useCreateTaskMutation,
    useGetFilteredTaskQuery,
    useUpateCompletionMutation
} = taskSlice