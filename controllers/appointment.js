const Appointment = require("../models/appointment");
const Specialist = require("../models/specialist");
const User = require("../models/user");

//Appointment Middlewares ...

// Reserve by id ...
exports.reserveById = (req, res, next, id) => {
  Appointment.findById(id).exec((err, reserve) => {
    if (err || !reserve) {
      res.status(404).json({
        error: "reserve not found",
      });
    }
    req.reserve = reserve;
    next();
  });
};

// Validate reserve...
exports.isValidReserve = async (req, res, next) => {
  const { day, date, hourIn, hourOut } = req.body;

  console.log(req.specialist);

  const reserveData = {
    specialist: req.specialist._id,
    user: req.profile._id,
    day,
    date,
    hourIn,
    hourOut,
  };

  try {
    let reserves = await Appointment.find({
      $and: [{ specialist: req.specialist._id }, { date: date }],
    });
    console.log(reserves.length);
    let canReserve;
    if (reserves.length == 0) {
      canReserve = true;
    } else if (reserves.length > 0) {
      const arrayReserves = reserves.map((reserve) => reserve.hourIn);
      console.log(arrayReserves);
      const isReserved = arrayReserves.includes(hourIn);
      isReserved ? (canReserve = false) : (canReserve = true);
    }
    console.log(canReserve);

    if (!canReserve) {
      return res.status(409).json({
        conflict: "The date and hour selected is reserved, try others hour",
      });
    }
    req.reserve = reserveData;

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error, unable to connect to db" });
  }
};

// Create reserve ...
exports.createReserve = async (req, res) => {
  const appointment = new Appointment(req.reserve);

  appointment.save((err, reserve) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    res.json({
      reserve,
      message: "Your reserve has been save succesfuly!",
    });
  });
};

// List reserves ...
exports.listReserves = (req, res) => {
  Appointment.find({ user: req.profile._id }, function (err, reserves) {
    Specialist.populate(
      reserves,
      {
        path: "specialist",
        select: "firstName lastName speciality specialization",
      },
      function (err, reserves) {
        if (err || !reserves) {
          return res.status(500).json({
            error: err,
          });
        }
        return res.status(200).json(reserves);
      }
    );
  });
};

// Update reserve...
exports.updateReserve = (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["date", "hourIn", "hourOut"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({
      error: "Unable to update any this fields",
    });
  }

  Appointment.findOneAndUpdate(
    { _id: req.reserve._id },
    { $set: req.body },
    { new: true },
    (err, reserve) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.status(200).json({
        reserve,
        message: "Your reserve has been updated!",
      });
    }
  );
};

// Read reserve ...
exports.readReserve = (req, res) => {
  Appointment.find({ _id: req.reserve._id }, function (err, reserve) {
    if (err || !reserve) {
      res.status(404).json({
        error: err,
      });
    }
    // If is user ...
    if (req.profile) {
      Specialist.populate(
        reserve,
        {
          path: "specialist",
          select: "speciality specialization firstName lastName",
        },
        function (err, reserve) {
          if (err) {
            return res.status(400).json({
              error: err,
            });
          }
          const patient = {
            _id: req.profile._id,
            firstName: req.profile.firstName,
            lastName: req.profile.lastName,
            rut: req.profile.rut,
          };
          return res.status(200).json({
            reserve,
            patient,
          });
        }
      );
    } else {
      // If is specialist ...
      User.populate(
        reserve,
        {
          path: "user",
          select: "firstName lastName rut",
        },
        function (err, reserve) {
          if (err) {
            return res.status(400).json({
              error: err,
            });
          }

          const specialist = {
            _id: req.specialist._id,
            firstName: req.specialist.firstName,
            lastName: req.specialist.lastName,
            speciality: req.specialist.speciality,
            specialization: req.specialist.specialization,
          };
          res.status(200).json({
            reserve,
            specialist,
          });
        }
      );
    }
  });
};

// Delete reserve ...
exports.deleteReserve = (req, res) => {
  Appointment.findByIdAndDelete({ _id: req.reserve._id }).exec(
    (err, reserve) => {
      if (err || !reserve) {
        res.status(404).json({ error: "Unable to delete this reserve" });
      }
      res.status(200).json({
        reserve,
        message: "Reserve has been deleted successfully",
      });
    }
  );
};
