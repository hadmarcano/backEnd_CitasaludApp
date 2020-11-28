const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const specialistSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    rut: Number,
    role: {
      type: Number,
      default: 1
    },
    specialityName: String,
    specialization: {
      type: String,
      default: "N/A"
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true
    }
  },{ timestamps: true}
);

const Specialist = model("Specialist", specialistSchema);

module.exports = Specialist;
