const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const firefighterSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      rquired: true,
    },
    last: {
      type: String,
      required: true
    },
  },
  position: {
    type: String,
    default: "Firefighter"
  }
});

module.exports = mongoose.model("Firefighter", firefighterSchema);