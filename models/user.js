const mongoose = require("mongoose");
const { Schema, model, ObjectId } = mongoose;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppointmentSchema = require("./appointment");

// Appointment Schema ...

// const AppointmentSchema = new Schema(
//   {
//     specialist: { type: ObjectId, ref: "Specialist" },
//     user: { type: ObjectId, ref: "User" },
//     firstName: String,
//     lastName: String,

//     date: Date,
//     hourIn: Number,
//     hourOut: Number,
//   },
//   { timestamps: true }
// );

//const Appointment = model("Appointment", AppointmentSchema);

// User Schema

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 7,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    birthDate: {
      type: Date,
      default: Date.now(),
    },
    rut: {
      type: Number,
      required: true,
    },
    ocupation: {
      type: String,
      maxlength: 32,
      trim: true,
      lowercase: true,
    },
    civilState: {
      type: String,
      trim: true,
      lowercase: true,
    },
    sexType: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
      maxlength: 60,
    },
    history: {
      type: Array,
      default: [],
    },
    appointments: [AppointmentSchema],
  },
  { timestamps: true }
);

// hashing the password before saving ...

userSchema.pre("save", async function (next) {
  const user = this;
  const saltRounds = 10;
  try {
    if (user.isModified("password")) {
      user.salt = await bcrypt.genSalt(saltRounds);
      user.password = await bcrypt.hash(user.password, user.salt);
    }
  } catch (e) {
    console.log(e);
  }
  next();
});

// userSchema Methods

userSchema.methods = {
  authenticated: async function (plainText) {
    return await bcrypt.compare(plainText, this.password);
  },

  generateAuthToken: async function () {
    const user = this;
    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET
    );
    return token;
  },
};

const User = model("User", userSchema);

module.exports = User;
