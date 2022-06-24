import React from "react";
import { Route } from "react-router-dom";
import TopNav from "./shared/TopNav";
import BoardsDashboardContainer from "./dashboard/BoardsDashboardContainer";
import Board from "./ui/board/Board";
import Card from "./ui/card/Card";
import UISection from "./uiReference/UISection";
import AllBoards from "./uiReference/AllBoards";
import CardArchived from "./uiReference/CardArchived";
import CardEditingDescription from "./uiReference/CardEditingDescription";
import SingleCard from "./uiReference/SingleCard";
import CopyCardPopover from "./uiReference/CopyCardPopover";
import CreateBoard from "./uiReference/CreateBoard";
import DueDatePopover from "./uiReference/DueDatePopover";
import LabelsPopover from "./uiReference/LabelsPopover";
import MoveCardPopover from "./uiReference/MoveCardPopover";
import SingleBoard from "./uiReference/SingleBoard";

const Application = () => {
  return (
    <div>
      <TopNav />
      <Route path="/" exact component={BoardsDashboardContainer} />
      <Route path="/cards/:id" component={Card}/>
      <Route path="/cards/:id" component={Board}/>
      <Route path="/boards/:id" component={Board}/>
      <Route path="/uiReference" exact component={UISection} />
      <Route path="/uiReference/allBoards" component={AllBoards} />
      <Route path="/uiReference/cardArchived" component={CardArchived} />
      <Route
        path="/uiReference/cardEditingDescription"
        component={CardEditingDescription}
      />
      <Route path="/uiReference/card" component={SingleCard} />
      <Route path="/uiReference/copyCardPopover" component={CopyCardPopover} />
      <Route path="/uiReference/createBoard" component={CreateBoard} />
      <Route path="/uiReference/dueDatePopover" component={DueDatePopover} />
      <Route path="/uiReference/labelsPopover" component={LabelsPopover} />
      <Route path="/uiReference/moveCardPopover" component={MoveCardPopover} />
      <Route path="/uiReference/singleBoard" component={SingleBoard} />
    </div>
  );
};

export default Application;
