const Appointment = require("../models/appointment");
const Specialist = require("../models/specialist");

//  ++++++ MIDDLEWARES ++++++

// Validate reserve...

exports.isValidReserve = async (req, res, next) => {
  const { day, date, hourIn, hourOut } = req.body;

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
        conflict: "The time selected is reserved, try other time",
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

exports.listReserves = async (req, res) => {
  Appointment.find({ user: req.profile._id }, function (err, reserves) {
    Specialist.populate(
      reserves,
      {
        path: "specialist",
        select: "firstName lastName speciality specialization",
      },
      function (err, reserves) {
        res.status(200).json(reserves);
      }
    );
  });
};
