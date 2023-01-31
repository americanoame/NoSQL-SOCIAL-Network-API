const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const formatData = require('../utils/dataFormat')

// Schema to create thoughts model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      require: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,

      getter: (createdAtVal) => dataFormat(createdAtVal)
    },
    username: {
      type: String,
      require: true,
    },
    reactions: [reactionSchema],    
    },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema
  .virtual('reactionsCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our post Thoughts
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
