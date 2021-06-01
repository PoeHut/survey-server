const mongoose = require("mongoose");
const { Schema } = mongoose;

// subdocument of survey
const recipientSchema = new Schema({
  email: String,
  respond: { type: Boolean, default: false },
});

module.exports = recipientSchema;