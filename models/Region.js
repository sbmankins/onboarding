const mongoose = require('mongoose');
const { Schema } = mongoose;

const regionSchema = new Schema({
    name: { type: String, required: true },
});

mongoose.model('regions', regionSchema);
