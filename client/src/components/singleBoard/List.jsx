import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CardTile from "./CardTile";
import { useState } from "react";
import { editList } from '../../features/lists/lists';

const List = ({ list }) => {
  const dispatch = useDispatch();
  const [showEditTitle, setShowEditTitle] = useState(false);
  const [title, setTitle] = useState(list.Title);
  const cards = useSelector(state => state.cards);
  const currListCards = cards.filter(c => c.listId === list._id);
  
/*add-dropdown-active*/ // add this text behind list-wrapper className 
// to show the add card dropdown

const handleEditTitle = (e) => {
  if (e.key === 'Enter') {
    const updatedList = {
      id: list._id,
      title: title,
    }
    dispatch(editList(updatedList));
    setShowEditTitle(false);
  }
}

// editableListTitle

  return (
    <div className="list-wrapper ">
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div>
            {showEditTitle ?
              (
                <input type="text" 
                  className="list-title"
                  placeholder={list.title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  value={title} 
                  onKeyPress={handleEditTitle}  
                />
              )
             :
              (<p className="list-title" onClick={() => {setShowEditTitle(true)}}>{list.title}</p>)
            }
          </div>
          <div className="add-dropdown add-top">
            <div className="card"></div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div id="cards-container" data-id="list-1-cards">
              {
                currListCards.map(card => (
                  <CardTile key={card._id} card={card}/>
                ))
              }
            {/* <div className="card-background">
              <div className="card ">
                <i className="edit-toggle edit-icon sm-icon"></i>
                <div className="cover-image"></div>
                <div className="card-info">
                  <p>Another list with stuff</p>
                </div>
                <div className="card-icons">
                  <i className="clock-icon sm-icon overdue ">Aug 3</i>
                  <i className="description-icon sm-icon"></i>
                </div>
              </div>
            </div>
            <div className="card-background">
              <div className="card ">
                <i className="edit-toggle edit-icon sm-icon"></i>
                <div className="cover-image"></div>
                <div className="card-info">
                  <p>
                    Use the + in the top menu to make your first board
                    now.
                  </p>
                </div>
                <div className="card-icons"></div>
              </div>
            </div> */}
          </div>
          <div className="add-dropdown add-bottom">
            <div className="card">
              <div className="card-info"></div>
              <textarea name="add-card"></textarea>
              <div className="members"></div>
            </div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div className="add-card-toggle" data-position="bottom">
            Add a card...
          </div>
        </div>
      </div>
    </div>
  )
}

export default List;