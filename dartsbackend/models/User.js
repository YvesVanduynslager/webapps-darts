let mongoose = require('mongoose');
let crypto = require('crypto');
let jwt = require('jsonwebtoken');

let UserSchema = new mongoose.Schema({
    username: { type: String, lowercase: true, unique: true },
    hash: String, //encrypted wachtwoord
    salt: String //random bytes gebruikt in hashen van wachtwoord
});

//hashen van wachtwoord mbv salt
UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(32).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt,
        10000, 64, 'sha512').toString('hex');
};

//check of password geldig is, wachtwoord hashen en vergelijken met ingestelde hash waarde, returns true | false
UserSchema.methods.validPassword = function (password) {
    let hash = crypto.pbkdf2Sync(password, this.salt,
        10000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

//json web token genereren, checkt identiteit van ingelogde gebruiker
UserSchema.methods.generateJWT = function () {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    return jwt.sign({
        _id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000)
    }, process.env.DARTS_BACKEND_SECRET);
};

mongoose.model('User', UserSchema);