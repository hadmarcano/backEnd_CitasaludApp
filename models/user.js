const mongoose = require("mongoose");
const { Schema, model, ObjectId } = mongoose;
const bcrypt = require("bcryptjs");
//const uuidv1 = require("uuid/v1");

// Appointment Schema ...

const AppoinmentSchema = new Schema(
  {
    specialist: { type: ObjectId, ref: "Specialist" },
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
    hashed_password: {
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
    bloodType: {
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
    photo: {
      data: Buffer,
      contentType: String,
    },
    insuranceCompany: {
      type: String,
      trim: true,
      lowercase: true,
    },
    policyNumber: {
      type: Number,
      default: 0,
    },
    appoinments: [AppoinmentSchema],
  },
  { timestamps: true }
);

const User = model("User", userSchema);

// Control virtual fields

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    // const saltRounds = 10;
    // this.salt = bcrypt.genSalt(saltRounds);
    // this.hashed_password = this.encryptPassword(password);
    try{
        if(user.isModified('password')){
            const saltRounds = 10;
            this.salt = bcrypt.genSalt(saltRounds);
            user.hashed_password = this.encryptPassword(password);
        }
    }catch(e){
        console.log(e);
    }
  })
  .get(function () {
    return this._password;
  });

// userSchema Methods

userSchema.methods = {
  authenticated: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: async function (password) {
    if (!password) return "";
    try {
      return  await bcrypt.hash(this.password, this.salt);
    } catch (err) {
      return "";
    }
  },
};

module.exports = { User, Appointment };
