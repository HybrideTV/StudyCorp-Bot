const mongoose = require('mongoose');
const AddWarn = new mongoose.Schema({
    userId: {type: String, required:true},
    guildId: {type: String, required:true},
    reason: {type: Array, required:true},
    warnDate: {type: Array, required: true},
    userTag: {type: Array, required:true}
});

const Warns = module.exports = mongoose.model('warns', AddWarn);