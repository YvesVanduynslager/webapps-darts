var mongoose = require('mongoose');

var SpelerSchema = new mongoose.Schema({
    _id: Number,
    naam: string,
    voornaam: string,
    wedstrijden: [{ type: Schema.Types.ObjectId, ref:'Wedstrijd'}]
});

var WedstrijdSchema = new mongoose.Schema({
    _id: Number,
    _spelerId: { type: Number, ref: 'Speler'},
    puntenGewonnen: Number,
    datumGespeeld: Date,
    tegenstanderId: {type: Number, ref:'Speler'}
});

var Speler = mongoose.model('Speler', SpelerSchema);
var Wedstrijd = mongoose.model('Wedstrijd', WedstrijdSchema);