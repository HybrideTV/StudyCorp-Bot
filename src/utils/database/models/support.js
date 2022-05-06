const mongoose = require('mongoose');
const supportDb = new mongoose.Schema({
    pseudo: {type: String,},
    userid: {type: String,},
    motif: {type: String,},
    nombre: {type: String,}


});

const Support = module.exports = mongoose.model('support', supportDb);