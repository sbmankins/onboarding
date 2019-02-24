const mongoose = require('mongoose');
const { Schema } = mongoose;

const computerSchema = new Schema({
    name: { type: String, required: true },
});

mongoose.model('computers', computerSchema);
