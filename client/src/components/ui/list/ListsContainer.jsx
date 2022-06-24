import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import List from "./List";
import ListAdd from "./ListAdd";

const ListContainer = ({ boardId }) => {
  const [addingCard, setAddingCard] = useState("");

  const lists = useSelector(state => state.lists);
  const currLists = lists.filter(l => l.boardId === boardId);
  
  const handleCardForm = (id) => {
    setAddingCard(id);
  }

  return (
    <div id="list-container" className="list-container">
      <div id="existing-lists" className="existing-lists">
        {
          currLists.map(list => {
            return <List key={list._id} list={list} onAddCardForm={handleCardForm} cardFormActive={addingCard} />
          })
        }
      </div>  
        <ListAdd boardId={boardId} /> 
    </div>
  )
}

export default ListContainer;