var mongoose = require("mongoose");

// Create a schema class
var Schema = mongoose.Schema;

// Create the Note schema
var NoteSchema = new Schema({
  title: {
    type: String
  },
  date: String,
  body: {
    type: String
  }
});

// Create the Note model with the NoteSchema
var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
