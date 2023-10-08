const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const reactionSchema = require('./Reaction');
const mongoose = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true,
            ref: 'User'
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);
// get total count of reactions on retrieval
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})
.set(function(value) {
    return this.reactions = value;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
