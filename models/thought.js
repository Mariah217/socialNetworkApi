// reaction (schema only will be a subdocument in the Thought model)

const { kStringMaxLength } = require('buffer');
const { Schema, model } = require('mongoose');
const { stringify } = require('querystring');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: {

        },
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;