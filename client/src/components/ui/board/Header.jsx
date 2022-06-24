import React from "react";

const Header = ({ boardTitle }) => {
  return (
    <header>
      <ul>
        <li id="title">{boardTitle}</li>
        <li className="star-icon icon"></li>
        <li className="private private-icon icon">Private</li>
      </ul>
      <div className="menu">
        <i className="more-icon sm-icon"></i>Show Menu
      </div>
      <div className="subscribed">
        <i className="sub-icon sm-icon"></i>Subscribed
      </div>
    </header>
  )
}

export default Header;