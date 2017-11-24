var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let jwt = require('express-jwt');

let Wedstrijd = mongoose.model('Wedstrijd');
let Speler = mongoose.model('Speler');

let auth = jwt({ secret: process.env.DARTS_BACKEND_SECRET, userProperty: 'payload' });

//GET alle spelers
router.get('/API/spelers/', function (req, res, next) {
  let query = Speler.find().populate('wedstrijden');
  query.exec((err, spelers) => {
    if (err) return next(err);
    res.json(spelers);
  });
});
//GET één speler
router.get('/API/spelers/:id', auth, function (req, res, next) {
  let query = Speler.findById(req.params.id).populate('wedstrijden');
  query.exec((err, speler) => {
    if (err) return next(err);
    res.json(speler);
  });
});

//CREATE speler
router.post('/API/spelers/', auth, function (req, res, next) {
  let speler = new Speler({ naam: req.body.naam, wedstrijden: new Array() });
  console.log("naam: " + req.body.naam);
  speler.save(function (err, sp) {
    if (err) {
      return next(err);
    }
    res.json(speler);
  })
});

//ADD Wedstrijd to speler
router.post('/API/spelers/:speler/wedstrijden/', auth, function (req, res, next) {
  let wedstr = new Wedstrijd({ puntenGewonnen: req.body.puntenGewonnen, datumGespeeld: req.body.datumGespeeld, tegenstander: req.body.tegenstander });
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
router.put('/API/spelers/:id', auth, function (req, res) {
  var query = { _id: req.params.id }; //req.params.id record moet upgedate worden, met nieuwe waardes
  Speler.findOneAndUpdate(query, req.body, function (err) { // nieuwe waardes te vinden in req.body (json)
    if (err) {
      return next(err);
    }
    res.json("updated speler");
  });
});

//DELETE speler
router.delete('/API/spelers/:speler', auth, function (req, res) {
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
router.delete('/API/wedstrijden/:wedstrijd', auth, function (req, res) {
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
    if (err) { return next(err); }
    if (!speler) { return next(new Error('not found ' + id)); }
    req.speler = speler;
    return next();
  });
});

module.exports = router;