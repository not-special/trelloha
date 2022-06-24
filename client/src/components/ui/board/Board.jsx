import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, useLocation } from 'react-router-dom';
import { fetchBoard } from '../../../features/boards/boards';
import Header from "./Header";
import ListsContainer from "../list/ListsContainer";
import Sidebar from "./Sidebar";

const Board = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();
  const urlId = params.id;
  const path = location.pathname;

  const cards = useSelector(state => state.cards);
  const currentCard = cards.find(card => card._id === urlId);
  
  let boardId = path.includes("cards") && currentCard ?
  currentCard.boardId : urlId;
    
  useEffect(() => {
    if (boardId) {
      dispatch(fetchBoard(boardId));
    }
  }, [dispatch, boardId])

  const boards = useSelector(state => state.boards);
  const board = boards.find(b => b._id === boardId);

  if ( board === undefined) return null;

  return (
    <>
      <Header boardTitle={board.title} />
      <main>
        <ListsContainer boardId={boardId} />
      </main>
      <Sidebar />
      <div id="modal-container"></div>
      <div id="dropdown-container"></div>
    </>
  );
};

export default Board;
