const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const Thought = require('./Thought');
const mongoose = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Username is Required',
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: 'Email is Required',
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// get total count of friends on retrieval
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})
.set(function(value) {
    return this.friends = value;
}); 

const User = model('User', userSchema);

module.exports = User;