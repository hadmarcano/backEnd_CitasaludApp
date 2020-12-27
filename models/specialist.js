const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const specialistSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    rut: Number,
    role: {
      type: Number,
      default: 1,
    },
    speciality: String,
    specialization: {
      type: String,
      default: "N/A",
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    salt: String,
    phone: Number,
    address: String,
  },
  { timestamps: true }
);

// hashing the password before saving ...

specialistSchema.pre("save", async function (next) {
  const specialist = this;
  const saltRounds = 10;
  try {
    if (specialist.isModified("password")) {
      specialist.salt = await bcrypt.genSalt(saltRounds);
      specialist.password = await bcrypt.hash(
        specialist.password,
        specialist.salt
      );
    }
  } catch (e) {
    console.log("Error: ", e);
  }
  next();
});

// specialistSchema Methods

specialistSchema.methods = {
  specAuthenticated: async function (plainText) {
    const specialist = this;
    return await bcrypt.compare(plainText, specialist.password);
  },

  generateAuthToken: async function () {
    const specialist = this;
    const token = jwt.sign(
      { _id: specialist._id.toString() },
      process.env.JWT_SECRET
    );

    return token;
  },
};

const Specialist = model("Specialist", specialistSchema);

module.exports = Specialist;
