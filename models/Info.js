const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

const postSchema = mongoose.Schema({
  pageID: {
    type: Number,
    required: true,
  },
  postTitle: {
    type: String
  },
  postContent: {
    type: String,
    required: true
  },
  postDate: {
    type: Date,
    default: Date.now()
  }
});

postSchema.virtual('pageName').get(function(){
  const pageNames = {0:"FireTaxDistrict", 1:"Groton", 2:"RescueSquad"};
  return pageNames[this.pageID];
});

module.exports = mongoose.model("Post", postSchema);