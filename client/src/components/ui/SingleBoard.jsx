import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { fetchBoard } from '../../features/boards/boards';
import Header from "./Header";
import List from "./List";

const SingleBoard = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const boardId = params.id;
  const boards = useSelector(state => state.boards);
  const board = boards.find(b => b._id === boardId);

  useEffect(() => {
    dispatch(fetchBoard(boardId))
  }, [dispatch, boardId])
  
  if (board === undefined) return null;
    
  return (
    <>
      <Header />
      <main>
        <div id="list-container" className="list-container">
          <div id="existing-lists" className="existing-lists">
            { /*board.lists.map(list => (
              <List key={list._id} list={list}/>*/
            }
            {/* <div className="list-wrapper">
              <div className="list-background">
                <div className="list">
                  <a className="more-icon sm-icon" href=""></a>
                  <div>
                    <input
                      type="text"
                      className="list-title"
                      value="List title during editing"
                      autoFocus="true"
                    />
                  </div>
                  <div className="add-dropdown add-top">
                    <div className="card"></div>
                    <a className="button">Add</a>
                    <i className="x-icon icon"></i>
                    <div className="add-options">
                      <span>...</span>
                    </div>
                  </div>
                  <div id="cards-container" data-id="list-2-cards">
                    <div className="card-background">
                      <div className="card ">
                        <i className="edit-toggle edit-icon sm-icon"></i>
                        <div className="cover-image"></div>
                        <div className="card-info">
                          <p>
                            Add members to a board (via the sidebar to
                            collaborate, share and discuss.
                          </p>
                        </div>
                        <div className="card-icons">
                          <i className="clock-icon sm-icon due-soon ">Sep 5</i>
                        </div>
                      </div>
                    </div>
                    <div className="card-background">
                      <div className="card ">
                        <i className="edit-toggle edit-icon sm-icon"></i>
                        <div className="cover-image"></div>
                        <div className="card-info">
                          <p>You can also change the background and more.</p>
                        </div>
                        <div className="card-icons"></div>
                      </div>
                    </div>
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
            <div className="list-wrapper add-dropdown-active">
              <div className="list-background">
                <div className="list">
                  <a className="more-icon sm-icon" href=""></a>
                  <div>
                    <p className="list-title">Third List</p>
                  </div>
                  <div className="add-dropdown add-top">
                    <div className="card"></div>
                    <a className="button">Add</a>
                    <i className="x-icon icon"></i>
                    <div className="add-options">
                      <span>...</span>
                    </div>
                  </div>
                  <div id="cards-container" data-id="list-3-cards">
                    <div className="card-background">
                      <div className="card ">
                        <i className="edit-toggle edit-icon sm-icon"></i>
                        <div className="cover-image"></div>
                        <div className="card-info">
                          <p>
                            This is a card. Drag it onto &quot;Tried it&quot; to show it&apos;s
                            done.
                          </p>
                        </div>
                        <div className="card-icons"></div>
                      </div>
                    </div>
                    <div className="card-background">
                      <div className="card ">
                        <i className="edit-toggle edit-icon sm-icon"></i>
                        <div className="cover-image"></div>
                        <div className="card-info">
                          <div className="card-label yellow colorblindable"></div>
                          <p>Add all the cards and lists you need</p>
                        </div>
                        <div className="card-icons">
                          <i className="description-icon sm-icon"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="add-dropdown add-bottom active-card">
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
            </div> */}
          </div>
          <div id="new-list" className="new-list">
            <span>Add a list...</span>
            <input type="text" placeholder="Add a list..." />
            <div>
              <input type="submit" className="button" value="Save" />
              <i className="x-icon icon"></i>
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

export default SingleBoard;
