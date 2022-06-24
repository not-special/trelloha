const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: {
		type: String,
		required: [true, 'The Card title is required']
	}, 
  description: {
    type: String,
  },
  labels: [
    { type: String, },
  ],
  listId: {
		type: Schema.Types.ObjectId,
		ref: "List"
	},
  position: {
    type: Number,
  },
  archived: {
    type: Boolean,
  },
	createdAt: 
		{ type: Date, 
			required: true,
			default: Date.now },
	updatedAt: { 
		type: Date,
		required: true,
		default: Date.now },
  dueDate: {
    type: Date,
  },
  completed: {
    type: Boolean,
  },
  boardId: {
		type: Schema.Types.ObjectId,
		ref: "Board"
	},
  comments:  [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  actions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Action'
    }
  ],
})


const Card = mongoose.model('Card', CardSchema);

module.exports = Card;