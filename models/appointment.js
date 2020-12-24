const mongoose = require("mongoose");
const { Schema, model, ObjectId } = mongoose;

// Appointment Schema

exports.AppointmentSchema = new Schema(
  {
    specialist: { type: ObjectId, ref: "specialist" },
    user: { type: ObjectId, ref: "User" },
    day: String,
    date: Date,
    hourIn: String,
    hourOut: String,
  },
  { timestamps: true }
);

//const Appointment = model("Appointment", AppoinmentSchema);

//module.exports = Appointment;
