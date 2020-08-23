const mongoose  = require("mongoose");

const itemSchema = new mongoose.Schema({
  content: String,
  addedOn: {type: mongoose.Schema.Types.Date, default: Date.now()}
});

module.exports = mongoose.model('item', itemSchema);
