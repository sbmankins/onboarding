const mongoose = require('mongoose');
const { Schema } = mongoose;

const leaderSchema = new Schema({
    name: { type: String, required: true },
});

mongoose.model('leaders', leaderSchema);
