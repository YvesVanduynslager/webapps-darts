var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');

//db schema's
let SpelerSchema = new mongoose.Schema({
  naam: String,
  wedstrijden: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wedstrijd' }]
});
SpelerSchema.pre('remove', function (next) {
  this.model('Wedstrijd').remove({ wedstrijden: this._id }, next);
});
let Speler = mongoose.model('Speler', SpelerSchema);

let WedstrijdSchema = new mongoose.Schema({
  puntenGewonnen: { type: Number, default: 0 },
  datumGespeeld: String, //Date wordt opgeslaan als String in backend ipv Date, geeft eenvoudiger datum terug naar front-end
  tegenstander: String
});
/* WedstrijdSchema.pre('remove', function (next) {
  this.model('Speler').remove({ wedstrijden: this._id }, next) //CHECK
}) */
let Wedstrijd = mongoose.model('Wedstrijd', WedstrijdSchema);

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
  }, process.env.DARTS_SECRET);
};


//GET alle spelers
router.get('/API/spelers/', function (req, res, next) {
  let query = Speler.find().populate('wedstrijden');
  query.exec((err, spelers) => {
    if (err) return next(err);
    res.json(spelers);
  });
});
//GET één speler
router.get('/API/spelers/:id', function (req, res, next) {
  let query = Speler.findById(req.params.id).populate('wedstrijden');
  query.exec((err, speler) => {
    if (err) return next(err);
    res.json(speler);
  });
});

//CREATE speler
router.post('/API/spelers/', function (req, res, next) {
  /* let speler = new Speler(req.body);
  speler.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(speler);
  }); */
  let speler = new Speler({ naam: req.body.naam });
  speler.save(function (err, sp) {
    if (err) {
      return next(err);
    }
    res.json(speler);
  })
});

//ADD Wedstrijd to speler
router.post('/API/spelers/:speler/wedstrijden/', function (req, res, next) {
  let wedstr = new Wedstrijd(/*req.body*/{ puntenGewonnen: req.body.puntenGewonnen, datumGespeeld: req.body.datumGespeeld, tegenstander: req.body.tegenstander });
  wedstr.save(function (err, wedstrijd) {
    if (err) {
      return next(err);
    }
    req.speler.wedstrijden.push(wedstrijd);
    req.speler.save(function (err, sp) {
      if (err) {
        wedstr.remove(function (err) {
          if (err) {
            return next(err);
          }
        });
        return next(err);
      }
      res.json(wedstrijd);
    })
  });
});

//UPDATE speler
router.put('/API/spelers/:id', function (req, res) {
  var query = { _id: req.params.id }; //req.params.id record moet upgedate worden, met nieuwe waardes
  Speler.findOneAndUpdate(query, req.body, function (err) { // nieuwe waardes te vinden in req.body (json)
    if (err) {
      return next(err);
    }
    res.json("updated speler");
  });
});

//DELETE speler
router.delete('/API/spelers/:speler', function (req, res) {
  /*   req.speler.remove(function (err) {
      if (err) {
        return next(err);
      }
      res.json("removed speler");
    }); */
  Wedstrijd.remove({ _id: { $in: req.speler.wedstrijden } },
    function (err) {
      if (err) return next(err);
      req.speler.remove(function (err) {
        if (err) return next(err);
        res.json(req.speler);
      });
    });
});

//DELETE wedstrijd
router.delete('/API/wedstrijden/:wedstrijd', function (req, res) {
  req.wedstrijd.remove(function (err) {
    if (err) return next(err);
    res.json(req.wedstrijd);
  });
});

router.param('wedstrijd', function (req, res, next, id) {
  let query = Wedstrijd.findById(id);
  query.exec(function (err, wedstrijd) {
    if (err) return next(err);
    if (!wedstrijd) return next(new Error('not found ' + id));
    req.wedstrijd = wedstrijd;
    return next();
  });
});
//hulp bij ophalen van speler
router.param('speler', function (req, res, next, id) {
  let query = Speler.findById(id);
  query.exec(function (err, speler) {
    if (err) {
      return next(err);
    }
    if (!speler) {
      return next(new Error('not found ' + id));
    }
    req.speler = speler;
    return next();
  });
});

module.exports = router;