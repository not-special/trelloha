import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CardTile from "../card/CardTile";
import { useState } from "react";
import { editList } from '../../../features/lists/lists';
import { createCard } from '../../../features/cards/cards';

const List = ({ list, onAddCardForm, cardFormActive, onCardSelect }) => {
  const dispatch = useDispatch();
  const [showEditTitle, setShowEditTitle] = useState(false);
  const [title, setTitle] = useState(list.Title);
  const [cardTitle, setCardTitle] = useState("");
  const cards = useSelector(state => state.cards);
  const currListCards = cards.filter(c => c.listId === list._id);
  const addingCard = cardFormActive === list._id;
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

const handleSaveCard = (e) => {
  e.preventDefault();
  const newCard = {
    "listId": list._id,
    "card": {
      "title": cardTitle,
    }
  };
  dispatch(createCard(newCard));
  setCardTitle("");
  onAddCardForm("");
}


  return (
    <div className={`list-wrapper ${addingCard ? "add-dropdown-active": ""}`}>
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
                  <CardTile key={card._id} card={card} onCardSelect={onCardSelect}/>
                ))
              }
          </div>
          <div className={`add-dropdown add-bottom ${addingCard ? "active-card": ""}`}>
            <div className="card">
              <div className="card-info"></div>
              <textarea name="add-card" 
                placeholder="Enter a title or this card" 
                onChange={(e) => setCardTitle(e.target.value)} 
                defaultValue={cardTitle}>  
              </textarea>
              <div className="members"></div>
            </div>
            <a className="button" onClick={handleSaveCard}>Add</a>
            <i className="x-icon icon" onClick={() => onAddCardForm("")}></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div className="add-card-toggle" data-position="bottom" onClick={() => onAddCardForm(list._id)}>
            Add a card...
          </div>
        </div>
      </div>
    </div>
  )
}

export default List;