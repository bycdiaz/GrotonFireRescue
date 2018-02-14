const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const firefighterSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: "You must enter a first name"
  },
  lastName: {
    type: String,
    trim: true,
    required: "You must enter a last name"
  }
});

module.exports = mongoose.model("Firefighter", firefighterSchema);