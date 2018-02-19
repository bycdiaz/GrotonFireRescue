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
  rank: {
    type: Number,
    default: 9
  }
});

firefighterSchema.virtual('position').get(function(){
  const positions = {0:"Chief", 
                    1:"First Assisstant Chief", 
                    2:"Second Assistant Chief",
                    3:"First Captain", 
                    4:"Second Captain", 
                    5:"Third Captain",
                    6:"President",
                    7:"Vice President",
                    8:"Secretary/Treasurer",
                    9:"Firefighter"}

  return positions[this.rank];
})

module.exports = mongoose.model("Firefighter", firefighterSchema);