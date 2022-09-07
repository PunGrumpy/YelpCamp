const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

UserSchema.plugin(passportLocalMongoose);

module.exports = model('User', UserSchema);
