const mongoose = require('mongoose');
const { Schema } = mongoose;

const statusSchema = new Schema({
    name: { type: String, required: true },
});

mongoose.model('statuses', statusSchema);
