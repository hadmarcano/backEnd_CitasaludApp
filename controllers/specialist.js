const Specialist = require("../models/specialist");
const Appointment = require("../models/appointment");
const User = require("../models/user");

//Specialist Middlewares ...

// Specialist by id ...
exports.specialistById = (req, res, next, id) => {
  Specialist.findById(id).exec((err, spec) => {
    if (err || !spec) {
      return res.status(404).json({
        error: "Specialist not found",
      });
    }
    req.profile = spec;
    next();
  });
};

// Get specialist profile ...
exports.getProfile = (req, res) => {
  Specialist.findById({ _id: req.profile._id }).exec((err, specialist) => {
    if (err || !specialist) {
      res.status(400).json({
        error: err,
      });
    }
    res.status(200).json(specialist);
  });
};

// Update specialist profile ...
exports.updateProfile = (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "firstName",
    "lastName",
    "rut",
    "specialitity",
    "specialization",
    "email",
    "phone",
    "address",
    "password",
  ];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({
      error: "One of these fields cannot be updated",
    });
  }

  Specialist.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, specialist) => {
      if (err) {
        return res.status(400).json({
          error: " Unable to update the profile",
        });
      }
      specialist.password = undefined;
      specialist.salt = undefined;

      res.status(200).json({
        specialist,
        message: "Your profile has been updated",
      });
    }
  );
};

// List reserves by specialistId
exports.listReserves = (req, res) => {
  Appointment.find({ specialist: req.profile._id }, function (err, reserves) {
    if (err || !reserves) {
      res.status(400).json({
        error: err,
      });
    }
    User.populate(
      reserves,
      { path: "user", select: "firstName lastName rut" },
      function (err, reserves) {
        if (err || !reserves) {
          return res.status(400).json({
            error: err,
          });
        }

        if (reserves.length === 0) {
          return res.status(200).json({
            reserves,
            message: "You don't have reserves",
          });
        }
        res.status(200).json(reserves);
      }
    );
  });
};
