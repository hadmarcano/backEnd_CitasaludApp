const mongoose = require("mongoose");
const { Schema, model, ObjectId } = mongoose;

// Appointment Schema

const AppoinmentSchema = new Schema(
  {
    specialist: { type: ObjectId, ref: "specialist" },
    user: { type: ObjectId, ref: "User" },
    firstName: String,
    lastName: String,

    date: Date,
    hourIn: Number,
    hourOut: Number,
  },
  { timestamps: true }
);

const Appointment = model("Appointment", AppoinmentSchema);

module.exports = Appointment;
