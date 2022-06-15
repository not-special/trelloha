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
    type: Decimal128,
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
    { type: String, },
  ],
  commentsCount: {
    type: Integer,
  },
  actions: [
 // Need to come back to this??
  ],
})


const List = mongoose.model('List', ListSchema);

module.exports = List;