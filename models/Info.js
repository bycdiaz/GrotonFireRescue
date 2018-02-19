const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

const pageSchema = mongoose.Schema({
  pageID: {
    type: Number,
    required: "The page ID is invalid, contact Briggs with this info >> URL, What you were doing when it happened"
  },
  pageTitle: {
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

pageSchema.virtual('pageName').get(function(){
  const pageNames = {0:"fire-tax-district", 1:"groton", 2:"rescue-squad"};
  return pageNames[this.pageID];
});

module.exports = mongoose.model("Page", pageSchema);