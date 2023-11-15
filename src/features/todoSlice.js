import { createEntityAdapter } from '@reduxjs/toolkit';
import {createApi} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({ reducerPath: 'api', endpoints: () => ({}), tagTypes: []})

export const todoAdapter = createEntityAdapter();
const initialState = todoAdapter.getInitialState();

// count for total number of items, data for the current page
const getResponse = (page) => ({count: 20, data: new Array(10).fill(0).map((_, i) => ({id: page * 10 + i, item: `${i} item`}))})

const sleep = (t) => new Promise((res) => setTimeout(res, t));

const todoSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodo: builder.query({
      queryFn: async (page) => {
        await sleep(1000);

        const response = getResponse(page);

        console.log('response ', response.data);

        return {
          ...response,
          data: todoAdapter.setAll(initialState, response.data)
        };
      }
    })
  })
});

export const { useGetTodoQuery } = todoSlice;

export default todoSlice.reducer;

export const {
  selectAll: selectAllTodos,
  selectById: selectTodoById,
} = todoAdapter.getSelectors();