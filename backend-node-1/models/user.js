const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    sleepChanges: {
        type: [String],
    },
    sleepStruggleDuration: {
        type: String,
    },
    sleepBedTime: {
        type: String,
    },
    sleepWakeUpTime: {
        type: String,
    },
    sleepHours: {
        type: Number,
    },
    sleepScore: {
        type: Number,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("User", userSchema);