import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { createList } from '../../../features/lists/lists'


const ListAdd = ({ boardId }) => {
  const dispatch = useDispatch();
  const [addingList, setAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  

  const toggleAddList = () => {
    setAddingList(!addingList);
  };

  const handleSaveList = (event) => {
    event.preventDefault();
    const newList = {
      boardId,
      "list": {
        "title": newListTitle,
      }
    };
    dispatch(createList(newList));
    setNewListTitle("");
    toggleAddList();
  };

   return (
    <div id="new-list" className={`new-list ${addingList ? "selected" : ""}`}>
      <span onClick={toggleAddList}>Add a list...</span>
      <input type="text" 
            placeholder="Add a list..." 
            onChange={(e) => setNewListTitle(e.target.value)} 
            value={newListTitle} />
      <div>
        <input type="submit" className="button" value="Save" onClick={handleSaveList} />
        <i className="x-icon icon" onClick={toggleAddList}></i>
      </div>
    </div>
   )
}

export default ListAdd;