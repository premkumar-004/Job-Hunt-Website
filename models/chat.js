const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./user.js");

const chatSchema = new Schema(
    {
        job_provider: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        applicant: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        messages: [
            {
                content: { type: String, required: true },
                timestamp: { type: Date, default: Date.now() },
                sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
            },
        ],
        lastUpdated: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
