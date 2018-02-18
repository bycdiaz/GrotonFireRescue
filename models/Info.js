const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

const postSchema = mongoose.Schema({
  pageID: {
    type: Number,
    required: "The page ID is invalid, contact Briggs with this info >> URL, What you were doing when it happened"
  },
  title: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

postSchema.virtual('pageName').get(function(){
  const pageNames = {0:"FireTaxDistrict", 1:"Groton", 2:"RescueSquad"};
  return pageNames[this.pageID];
});

module.exports = mongoose.model("Post", postSchema);