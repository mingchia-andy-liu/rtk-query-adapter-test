import { createEntityAdapter } from '@reduxjs/toolkit';
import {createApi} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({ reducerPath: 'api', endpoints: () => ({}), tagTypes: []})

export const todoAdapter = createEntityAdapter();
const initialState = todoAdapter.getInitialState();

// count for total number of items, data for the current page
const data = {count: 20, data: [{id: 1, item: 'a'}, {id: 2, item: 'b'}]}

const sleep = (t) => new Promise((res) => setTimeout(res, t));

const todoSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodo: builder.query({
      queryFn: async () => {
        // pagination with args
        await sleep(1000);
        todoAdapter.setAll(initialState, data.data);
        return {data};
      }
    })
  })
});

export const { useGetTodoQuery } = todoSlice;

export default todoSlice.reducer;
