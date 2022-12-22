const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose); //package to increment the ticket value in the Note.

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", //reference to the User schema.
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

noteSchema.plugin(AutoIncrement, {
  inc_field: "ticket", //field to be incremented
  id: "ticketNums", //reside inside seperate Schema as a counter
  start_seq: 500, //intial value
});

module.exports = mongoose.model("Note", noteSchema);
