import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";
import { fetchBoard } from "../boards/boards" 

const initialState = [];

export const createList = createAsyncThunk(
  "lists/createList",
  async (newList, callback) => {
    const data = await apiClient.createList(newList);
    if (callback) {
      callback;
    }
    return data;
  }
);

export const editList = createAsyncThunk(
  "lists/editList",
  async (updatedList, callback) => {
    const data = await apiClient.editList(updatedList);
    if (callback) {
      callback;
    }
    return data;
  }
);

const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      const { lists } = action.payload;
      const boardId = action.payload._id;
      const listsWithoutCurrent = state.filter(l => l.boardId !== boardId);
      return [...listsWithoutCurrent, ...lists];
    });
    builder.addCase(createList.fulfilled, (state, action) => {
      const addedList = action.payload;
      // const listsWithoutCurrent = state.filter(l => addedList._id !== boardId);
      // return [...listsWithoutCurrent, ...lists];
      return [...state, addedList];
    });
    builder.addCase(editList.fulfilled, (state, action) => {
      const updatedList = action.payload;
      const listsWithoutCurrent = state.filter(l => l._id !== updatedList._id); 
      return [...listsWithoutCurrent, updatedList];
    })
  },
});

export default listSlice.reducer;
