const mongoose = require('mongoose');
const blacklistDb = new mongoose.Schema({
    pseudo: {type: String,},
    userid: {type: String,},
    motif: {type: String,}


});

const Blacklist = module.exports = mongoose.model('blacklist', blacklistDb);