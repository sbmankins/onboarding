const mongoose = require('mongoose');
const { Schema } = mongoose;

const hireStatusSchema = new Schema({
    name: { type: String, required: true },
});

mongoose.model('hirestatuses', hireStatusSchema);
