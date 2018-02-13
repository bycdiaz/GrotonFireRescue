const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const firefighterSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "You must enter a name"
  }
});

module.exports = mongoose.model("Firefighter", firefighterSchema);