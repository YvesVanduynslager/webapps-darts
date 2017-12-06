let mongoose = require('mongoose');

let SpelerSchema = new mongoose.Schema({
    naam: String,
    wedstrijden: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wedstrijd' }]
});
SpelerSchema.pre('remove', function (next) {
    this.model('Wedstrijd').remove({ wedstrijden: this._id }, next);
});

mongoose.model('Speler', SpelerSchema);