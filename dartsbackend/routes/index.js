var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//-----------------------------------------------------------------------------------

//Models (werkt niet volgens cursus)
let Speler = mongoose.model('Speler', new mongoose.Schema({
  _id: Number,
  naam: String,
  voornaam: String,
  wedstrijden: [{ type: mongoose.Schema.Types.ObjectId, ref:'Wedstrijd' }]
}));

let Wedstrijd = mongoose.model('Wedstrijd', new mongoose.Schema({
  _id: Number,
  _spelerId: { type: Number, ref: 'Speler' },
  puntenGewonnen: Number,
  datumGespeeld: Date,
  tegenstanderId: { type: Number, ref:'Speler' }
}))

//-----------------------------------------------------------------------------------

//GET home page.
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/API/spelers/', function (req, res, next) {
  Speler.find(function (err, spelers) {
    if (err) {
      return next(err);
    }
    res.json(spelers);
  });
});

router.post('/API/spelers/', function (req, res, next) {
  let speler = new Speler(req.body);
  speler.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(speler);
  })
})

module.exports = router;