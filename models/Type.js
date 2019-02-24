const mongoose = require('mongoose');
const { Schema } = mongoose;

const typeSchema = new Schema({
    name: { type: String, required: true },
});

mongoose.model('types', typeSchema);
