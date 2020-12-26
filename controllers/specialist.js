const Specialist = require("../models/specialist");
const Appointment = require("../models/appointment");

//Specialist Middlewares ...

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
