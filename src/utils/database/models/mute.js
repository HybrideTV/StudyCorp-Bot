const mongoose = require('mongoose');
const MuteModel = new mongoose.Schema({
    userId: {type: String},
	guildId: {type: String},
	time: {type: Number}
});

const Mutes = module.exports = mongoose.model('mutes', MuteModel);