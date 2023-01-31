const { Schema, model } = require('mongoose');
const dataFormat = require('../utils/dataFormat');

// Schema to create reaction model
const reactionSchema = new Schema(
    {

        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },

        reactionBody: {
            type: String,
            require: true,
            maxLength: 280,
        },


        username: {
            type: String,
            require: true,
        },

        createdAt: {
            type: Date,
            default: Date.now,
            getter: (createdAtVal) => dataFormat(createdAtVal)
        },
    },
    {
        toJSON: {
           getter: true,
        },
       
       id: false,
    }
);


module.exports = reactionSchema;
