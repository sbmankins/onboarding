const mongoose = require('mongoose');
const { Schema } = mongoose;

const teamSchema = new Schema({
    name: { type: String, required: true },
});

mongoose.model('teams', teamSchema);
