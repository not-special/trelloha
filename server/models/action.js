const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActionSchema = new Schema({
  description: {
    type: String,
  },
  cardId: {
		type: Schema.Types.ObjectId,
		ref: "Card"
	},
	createdAt: 
		{ type: Date, 
			required: true,
			default: Date.now },
	updatedAt: { 
		type: Date,
		required: true,
		default: Date.now },
})


const Action = mongoose.model('Action', ActionSchema);

module.exports = Action;