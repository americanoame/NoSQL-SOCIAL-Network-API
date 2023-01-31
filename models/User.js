const { Schema, model } = require('mongoose');

// Schema to create a course model
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // Must match a valid email address (look into Mongoose's matching validation)
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought',
        },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema
  .virtual('friendsCounts')
  // Getter
  .get(function () {
    return this.friends.length;
  });

const User = model('user', userSchema);

module.exports = User;
