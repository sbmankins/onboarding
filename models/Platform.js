const mongoose = require('mongoose');
const { Schema } = mongoose;

const platformSchema = new Schema({
    name: { type: String, required: true },
});

mongoose.model('platforms', platformSchema);
