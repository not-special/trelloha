import { createSlice } from "@reduxjs/toolkit";
// import apiClient from "../../lib/ApiClient";
import { fetchBoard } from "../boards/boards" 

const initialState = [];

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
  },
});

export default listSlice.reducer;
