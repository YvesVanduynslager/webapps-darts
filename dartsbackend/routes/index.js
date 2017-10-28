var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//-----------------------------------------------------------------------------------

let Speler = mongoose.model('Speler', new mongoose.Schema({
  //_id: mongoose.Schema.ObjectId, is niet nodig, anders geen auto generate
  naam: String,
  wedstrijden: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wedstrijd' }]
}));

let Wedstrijd = mongoose.model('Wedstrijd', new mongoose.Schema({
  //_id: Number, is niet nodig, anders geen auto generate
  _spelerId: { type: Number, ref: 'Speler' },
  puntenGewonnen: Number,
  datumGespeeld: Date,
  tegenstanderId: { type: Number, ref: 'Speler' }
}))

//-----------------------------------------------------------------------------------

//GET spelers
router.get('/API/spelers/', function (req, res, next) {
  Speler.find(function (err, spelers) {
    if (err) {
      return next(err);
    }
    res.json(spelers);
  })/*.populate('wedstrijden')*/;
});

//GET speler
router.get('/API/spelers/:id', function (req, res, next) {
  Speler.findById(req.params.id, function (err, speler) {
    if (err) {
      return next(err);
    }
    if (!speler) {
      return next(new Error('not found ' + req.params.id));
    }
    res.json(speler);
  });
});

//CREATE speler
router.post('/API/spelers/', function (req, res, next) {
  let speler = new Speler(req.body);
  speler.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(speler);
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
  req.speler.remove(function (err) {
    if (err) {
      return next(err);
    }
    res.json("removed speler");
  });
});

//hulp voor DELETE speler
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