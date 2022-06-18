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

const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      const { lists, boardId } = action.payload;
      const listsWithoutCurrent = state.filter(l => l.boardId !== boardId);
      return [...listsWithoutCurrent, ...lists];
    });
    builder.addCase(createList.fulfilled, (state, action) => {
      const { lists, boardId } = action.payload;
      const listsWithoutCurrent = state.filter(l => l.boardId !== boardId);
      return [...listsWithoutCurrent, ...lists];
    });
  },
});

export default listSlice.reducer;
