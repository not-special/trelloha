const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The Board title is required']
  },
	createdAt: 
		{ type: Date, 
			required: true,
			default: Date.now
		},
	updatedAt: { 
		type: Date,
		required: true,
		default: Date.now 
	},
  lists: [
    {
      type: Schema.Types.ObjectId,
      ref: 'List'
    }
  ]
})

const Board = mongoose.model('Board', BoardSchema);

module.exports = Board;
