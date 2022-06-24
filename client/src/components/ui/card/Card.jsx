import React, { useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchCard } from '../../../features/cards/cards';
import CardSideButtons from './CardSideButtons';
import CardActivity from './CardActivity';
import CardComment from './CardComment';
import CardDetails from './CardDetails';
import CardHeader from './CardHeader';

const Card = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const cardId = params.id;
  const cards = useSelector(state => state.cards);
  const currentCard = cards.find(card => card._id === cardId);


  /*
    1. make a comments feature to make state for comments
    2. same thing for actions
    3. in 'fetchCard' action
      - de-normalize comments and actions into their own state
    4. in CardActivity component
      - filter comments and actions to get for current card
  */
  
  useEffect(() => {
    dispatch(fetchCard(cardId));
  }, [dispatch, cardId])

  if (currentCard === undefined) return null;

  const boardId = currentCard.boardId;

  return (
    <div id="modal-container">
      <div className="screen"></div>
      <div id="modal">
        <Link to={`/boards/${boardId}`}>
          <i className="x-icon icon close-modal"></i>
        </Link>
        <CardHeader card={currentCard}/>
        <section className="modal-main">
          <ul className="modal-outer-list">
            <CardDetails />
            <CardComment cardId={cardId} />
            <CardActivity card={currentCard}/>
          </ul>
        </section>
        <CardSideButtons />
      </div>
    </div>
  );
};

export default Card;
