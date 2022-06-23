import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useLocation } from 'react-router-dom';
import { fetchBoard } from '../../features/boards/boards';
import Header from "../ui/Header";
import List from "./List";
import { createList } from '../../features/lists/lists'


const Board = () => {
  const [addingList, setAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  const [addingCard, setAddingCard] = useState("");
 /*
1. extract app into more components
  - lists (lists, handleAddList, handleEditList)
 */
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();
  const urlId = params.id;
  let boardId;
  const path = location.pathname;
  const cards = useSelector(state => state.cards);
  

  if (path.includes("cards")) {
    const currentCard = cards.find(card => card._id === urlId);
    if (currentCard) {
      boardId = currentCard.boardId; 
    }
  } else {
    boardId = urlId;
  }
  
  const boards = useSelector(state => state.boards);
  const board = boards.find(b => b._id === boardId);
  const lists = useSelector(state => state.lists);
  const currLists = lists.filter(l => l.boardId === boardId);


  const handleCardForm = (id) => {
    setAddingCard(id);
  }

  const allLists = currLists.map(list => {
    return <List key={list._id} list={list} onAddCardForm={handleCardForm} cardFormActive={addingCard} />
  })

  useEffect(() => {
  if (boardId) {
    dispatch(fetchBoard(boardId));
  }
  }, [dispatch, boardId])

  const handleAddList = (e) => {
    e.preventDefault();
    setAddingList(true);
  };

  if ( board === undefined) return null;

  const handleSaveList = (event) => {
    event.preventDefault();
    const newList = {
      "boardId": boardId,
      "list": {
        "title": newListTitle,
      }
    };
    dispatch(createList(newList));
    setNewListTitle("");
    setAddingList(false);
  };
  return (
    <>
      <Header />
      <main>
        <div id="list-container" className="list-container">
          <div id="existing-lists" className="existing-lists">
            {allLists}
          </div>  
          <div id="new-list" className={`new-list ${addingList ? "selected" : ""}`}>
            <span onClick={handleAddList}>Add a list...</span>
            <input type="text" 
                  placeholder="Add a list..." 
                  onChange={(e) => setNewListTitle(e.target.value)} 
                  value={newListTitle} />
            <div>
              <input type="submit" className="button" value="Save" onClick={handleSaveList} />
              <i className="x-icon icon" onClick={() => {setAddingList(false)}}></i>
            </div>
          </div>
        </div>
      </main>
      <div className="menu-sidebar">
        <div id="menu-main" className="main slide">
          <i className="back-icon icon"></i>
          <i className="x-icon icon"></i>
          <h1>Menu</h1>
          <div className="menu-contents">
            <div className="members">
              <div className="member-container">
                <div className="card-member ">VR</div>
              </div>
              <div className="member-container">
                <div className="card-member admin">TP</div>
              </div>
              <div className="member-container">
                <div className="card-member ">KW</div>
              </div>
            </div>
            <div className="add-members">
              <i className="add-icon sm-icon"></i>Add Members...
            </div>
            <hr />
            <ul className="menu-list">
              <li className="background-item">Change Background</li>
              <li className="filter-icon menu-icon">Filter Cards</li>
              <li className="power-icon menu-icon not-implemented">Power-Ups</li>
              <li className="stickers-icon menu-icon not-implemented">Stickers</li>
              <li className="more-icon menu-icon">More</li>
              <hr />
              <li className="activity-icon menu-icon not-implemented">Activity</li>
            </ul>
            <ul className="activity-list">
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> changed the
                  background of this board <small>yesterday at 4:53 PM</small>
                </p>
              </li>
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> sent{" "}
                  <span className="link">
                    Use the + in the top menu to make your first board now.
                  </span>{" "}
                  to the board <small>4 hours ago</small>
                </p>
              </li>
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> archived{" "}
                  <span className="link">
                    Use the + in the top menu to make your first board now.
                  </span>{" "}
                  <small>4 hours ago</small>
                </p>
              </li>
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> changed the
                  background of this board <small>5 hours ago</small>
                </p>
              </li>
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> changed the
                  background of this board <small>6 hours ago</small>
                </p>
              </li>
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> changed the
                  background of this board <small>yesterday at 10:23 PM</small>
                </p>
              </li>
            </ul>
            <a className="all-activity not-implemented">View all activity...</a>
          </div>
        </div>
      </div>
      <div id="modal-container"></div>
      <div id="dropdown-container"></div>
    </>
  );
};

export default Board;
