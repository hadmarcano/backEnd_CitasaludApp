const mongoose = require("mongoose");
const { model } = mongoose;
const AppointmentSchema = require("../models/appointment");

// Appointment model ...
const Appointment = model("Appointment", AppointmentSchema);

// Middlewares ...

exports.createReserve = (req, res) => {
  const { day, date, hourIn, hourOut } = req.body;
  console.log(req.profile);
  console.log(req.specialist);
  const reserve = {
    specialist: req.specialist._id,
    user: req.profile._id,
    day,
    date,
    hourIn,
    hourOut,
  };

  const appointment = new Appointment(reserve);

  appointment.save((err, app) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    console.log(app);
    res.json(app);
  });
};
