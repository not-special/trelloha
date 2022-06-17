import { createSlice } from "@reduxjs/toolkit";
// import apiClient from "../../lib/ApiClient";
import { fetchBoard } from "../boards/boards" 

const initialState = [];

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      const { lists } = action.payload;

			const currentListIds = lists.map(list => list._Id);
			const cardsWithoutCurrent = state.filter(card => !currentListIds.includes(card.listId))
      
			const currentCards = [];
			lists.forEach(list => currentCards.push(...list.cards));

      return [...cardsWithoutCurrent, ...currentCards];
    });
  },
});

export default cardSlice.reducer;
