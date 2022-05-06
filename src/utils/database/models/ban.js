const mongoose = require('mongoose');
const BanModel = new mongoose.Schema({
    userId: {type: String},
	guildId: {type: String},
	time: {type: Number}
});

const Bans = module.exports = mongoose.model('bans', BanModel);