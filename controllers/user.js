const User = require("../models/user");

//User Middlewares ...

// userById

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

// update

exports.update = (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "firstName",
    "lastName",
    "email",
    "rut",
    "phone",
    "address",
    "civilState",
    "sexType",
    "birthDate",
  ];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({
      error: "Unable to update any this fields",
    });
  }

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to perform this action",
        });
      }
      user.password = undefined;
      user.salt = undefined;
      res.json(user);
    }
  );
};

// read

exports.read = (req, res) => {
  User.findOne({ _id: req.profile._id }).exec((err, user) => {
    if (err || !user) {
      return res.status(404).json({
        Error: "User not found",
      });
    }
    user.password = undefined;
    user.salt = undefined;

    res.status(200).json(user);
  });
};

// addSummaryToMedicalHistory

// getMedicalHistory
