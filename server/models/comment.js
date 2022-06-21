const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    text: {
      type: String,
      required: [true, 'The comment text is required']
    },
    cardId: {
      type: Schema.Types.ObjectId,
      ref: "Card"
    },
    createdAt: { 
      type: Date, 
      required: true,
      default: Date.now
    },
    updatedAt: { 
      type: Date,
      required: true,
      default: Date.now 
    }
  }
);


const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;