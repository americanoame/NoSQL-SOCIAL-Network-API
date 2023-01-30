const { Schema, model } = require('mongoose');

// Schema to create thoughts model
const thoughtsSchema = new Schema(
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
    reactions: [reactionsSchema],    
    },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
postSchema
  .virtual('reactionsCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our post Thoughts
const Thoughts = model('post', postSchema);

module.exports = Thoughts;
