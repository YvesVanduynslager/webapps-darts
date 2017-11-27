var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

//middleware die gaat controleren of de request een authenticated response mag terugzenden of niet,
//wordt uitgevoerd vooraleer response wordt teruggezonden
passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            //no user
            if (!user || !user.validPassword(password)) {
                return done(null, false, { message: 'Onbekende gebruikersnaam of wachtwoord.' });
            }
            //no valid pw
/*             if (!user.validPassword(password)) {
                return done(null, false, { message: 'Verkeerd wachtwoord.' });
            } */
            return done(null, user);
        });
    }));