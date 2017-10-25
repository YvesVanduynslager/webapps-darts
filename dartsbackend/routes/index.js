var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//-----------------------------------------------------------------------------------

let Speler = mongoose.model('Speler', new mongoose.Schema({
  //_id: mongoose.Schema.ObjectId,
  naam: String,
  voornaam: String,
  wedstrijden: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wedstrijd' }]
}));

let Wedstrijd = mongoose.model('Wedstrijd', new mongoose.Schema({
  //_id: Number,
  _spelerId: { type: Number, ref: 'Speler' },
  puntenGewonnen: Number,
  datumGespeeld: Date,
  tegenstanderId: { type: Number, ref: 'Speler' }
}))

//-----------------------------------------------------------------------------------

//GET home page.
/* router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
}); */

//alle spelers ophalen
router.get('/API/spelers/', function (req, res, next) {
  Speler.find(function (err, spelers) {
    if (err) {
      return next(err);
    }
    res.json(spelers);
  })/*.populate('wedstrijden')*/;
});



//nieuwe speler toevoegen
router.post('/API/spelers/', function (req, res, next) {
  let speler = new Speler(req.body);
  speler.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(speler);
  });
});

//get één speler
/* router.get('/API/spelers/:speler', function (req, res) {
  res.json(req.speler);
}); */
router.get('/API/spelers/:id', function (req, res, next) {
  Speler.findById(req.params.id, function (err, speler) {
    if (err) { return next(err); }
    if (!speler) { return next(new Error('not found ' + req.params.id)); }
    res.json(speler);
  });
});

//speler verwijderen
router.delete('/API/spelers/:speler', function (req, res) {
  req.speler.remove(function (err) {
    if (err) { return next(err); }
    res.json("removed speler");
  });
});

//speler edit
router.put('/API/spelers/:speler', function (req, res) {
  req.speler.save(function (err) {
    if (err) { return next(err); }
    res.json("updated speler");
  });
});

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