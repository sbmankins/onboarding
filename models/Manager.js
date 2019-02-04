const mongoose = require('mongoose');
const {Schema} = mongoose;

const managerSchema = new Schema ({
  name: String
});

mongoose.model('managers', managerSchema);
