import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { createComment } from '../../../features/cards/cards'

const CardComment = ({ cardId }) => {
  const dispatch = useDispatch();
  const [ commentText, setCommentText ] = useState("");

  const handleAddComment = () => {
    const newComment = {
      cardId, 
      comment: {
        text: commentText
      }
    };
   
    dispatch(createComment(newComment));
    setCommentText("");
  };

  return (
    <li className="comment-section">
      <h2 className="comment-icon icon">Add Comment</h2>
      <div>
        <div className="member-container">
          <div className="card-member">TP</div>
        </div>
        <div className="comment">
          <label>
            <textarea
              required=""
              rows="1"
              placeholder="Write a comment..."
              onChange={(e) => setCommentText(e.target.value)} 
              value={commentText}
            ></textarea>
            <div>
              <a className="light-button card-icon sm-icon"></a>
              <a className="light-button smiley-icon sm-icon"></a>
              <a className="light-button email-icon sm-icon"></a>
              <a className="light-button attachment-icon sm-icon"></a>
            </div>
            <div>
              <input
                type="submit"
                className="button"
                value="Save"
                onClick={handleAddComment}
              />
            </div>
          </label>
        </div>
      </div>
    </li>
  )
}

export default CardComment;