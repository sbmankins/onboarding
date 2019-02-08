const mongoose = require('mongoose');
const {Schema} = mongoose;

const managerSchema = new Schema ({
  name: {type: String, required: true},
});

mongoose.model('managers', managerSchema);
