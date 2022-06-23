const HttpError = require("../models/httpError");
const Card = require("../models/card");
const Action = require("../models/action")
const { validationResult } = require("express-validator");

const createCard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const newCard = {
      listId: req.list._id,
      title: req.body.card.title,
      boardId: req.list.boardId,
    }
    Card.create(newCard)
      .then((card) => {
        req.card = card;
        next();
      })
      .catch((err) =>
        next(new HttpError("Creating card failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const addCommentsToCard = (req, res, next) => {
  const comment = req.comment;
  const cardId = req.comment.cardId;
  Card.findByIdAndUpdate(cardId, {
    $addToSet: { comment: comment._id }, // adds comment to the cards array in list
  }).then(() => {
    next();
  })
  .catch((err) =>
    next(new HttpError("Could not add new comment, please try again", 500))
  );
};

const sendCard = (req, res) => res.json(req.card);


const getCardById = (req, res) => {
  const cardId = req.params.id;
  Card.findOne({ _id: cardId })
  .then((card) => {
    return res.json(card)
  })
  .catch((err) =>
    next(new HttpError("Fetching card failed, please try again", 500))
  );
};

const getActions = (props) => {
  const actionDescriptions = {
    dueDate: " modified due date",
    completed: " changed the completion status",
    listId: " moved card to a different list",
    archived: " changed archived status",
  };
  const actions = [];
  Object.keys(props).forEach(action => {
    if (actionDescriptions[action]) {
      actions.push(actionDescriptions[action])
    }
  });
  return actions;
}

const createActionsFromDescriptions = async (arrOfDesc, cardId) => {
  const createdActions = [];
  for (let i = 0; i < arrOfDesc.length; i += 1) {
    const toCreate = {
      description: arrOfDesc[i],
      cardId
    };
    let newAction = await Action.create(toCreate);
    createdActions.push(newAction._id);  
  }
  return createdActions;
}

const editCard = async(req, res, next) => {
  const cardId = req.params.id;
  const updatedCard = req.body.card;
  
  const actionDescriptions = getActions(updatedCard);

  const actionIds = await createActionsFromDescriptions(actionDescriptions, cardId);
  
  const oldCard = await Card.findOne({ _id: cardId })

  oldCard.actions = oldCard.actions ? [...oldCard.actions, ...actionIds] : actionIds;
   


  //This should be updating a card to include any changes
  await Card.findOneAndUpdate({ _id: cardId }, updatedCard, {new: true});
  
  const newCard = await Card.findById(cardId).populate({ path:'actions'} );
  console.log("newCard", newCard);

  res.json(newCard);
  //This should be populating the found card with all the action objects by using
  // the array of action IDs that is already in the card
  // then returning the response
  //try execPopulate() ??
  /*
      ( async() => {

    var user = await User.findOne( { _id } );

    await user.populate( 'comments' ).execPopulate(); // Works as expected

} );

  */
  // Card.findOne({ _id: cardId })
  // .populate({ path: 'actions' })
  // .then((card) => {
  //   return res.json(card)
  // })
  // .catch((err) =>
  //   next(new HttpError("Populating the card failed, please try again", 500))
  // );
      
};



exports.createCard = createCard;
exports.sendCard = sendCard;
exports.getCardById = getCardById;
exports.addCommentsToCard = addCommentsToCard;
exports.editCard = editCard;
