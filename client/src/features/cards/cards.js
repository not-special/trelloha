import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";
import { fetchBoard } from "../boards/boards" 

const initialState = [];

export const createCard = createAsyncThunk(
  "cards/createCard",
  async (newCard, callback) => {
    const data = await apiClient.createCard(newCard);
    if (callback) {
      callback;
    }
    return data;
  }
);

export const fetchCard = createAsyncThunk(
  "cards/fetchCard",
  async (id, callback) => {
    const data = await apiClient.getCardById(id);
    if (callback) {
      callback;
    }
    return data;
  }
);

export const createComment = createAsyncThunk(
  "cards/createComment",
  async (newComment, callback) => {
    const data = await apiClient.createComment(newComment);
    if (callback) {
      callback;
    }
    return data;
  }
);


const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      const { lists } = action.payload;
			const currentListIds = lists.map(list => list._id);
			const cardsWithoutCurrent = state.filter(card => !currentListIds.includes(card.listId))
      
			const currentCards = [];
			lists.forEach(list => currentCards.push(...list.cards));

      return [...cardsWithoutCurrent, ...currentCards];
    });
    builder.addCase(createCard.fulfilled, (state, action) => {
      const newCard = action.payload;     
      const cardsWithoutCurrent = state.filter(card => card._id !== newCard._id );
      return [...cardsWithoutCurrent, newCard];
    });
    builder.addCase(fetchCard.fulfilled, (state, action) => {
      const card = action.payload;     
      const cardsWithoutCurrent = state.filter(c => c._id !== card._id );
      return [...cardsWithoutCurrent, card];
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      const comment = action.payload;     
      const cardsWithoutCurrent = state.filter(c => c._id !== comment.cardId);
      const currCard = state.find(c => c._id === comment.cardId);
      currCard.comments = [...currCard.comments, comment];
      return [...cardsWithoutCurrent, currCard];
    });
  },
});

export default cardSlice.reducer;
