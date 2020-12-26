const mongoose = require("mongoose");
const { Schema, model, ObjectId } = mongoose;

// Appointment Schema

const AppointmentSchema = new Schema(
  {
    specialist: { type: ObjectId, ref: "specialist" },
    user: { type: ObjectId, ref: "User" },
    day: String,
    date: String,
    hourIn: String,
    hourOut: String,
  },
  { timestamps: true }
);

const Appointment = model("Appointment", AppointmentSchema);

module.exports = Appointment;
