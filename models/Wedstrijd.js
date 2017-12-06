let mongoose = require('mongoose');

let WedstrijdSchema = new mongoose.Schema({
    puntenGewonnen: { type: Number, default: 0 },
    datumGespeeld: String, //Date wordt opgeslaan als String in backend ipv Date, geeft eenvoudiger datum terug naar front-end
    tegenstander: String
});

mongoose.model('Wedstrijd', WedstrijdSchema);