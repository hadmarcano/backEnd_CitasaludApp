const Specialist = require("../models/specialist");

//Specialist Middlewares ...

exports.specialistById = (req, res, next, id) => {
  Specialist.findById(id).exec((err, spec) => {
    if (err || !spec) {
      return res.status(404).json({
        error: "Specialist not found",
      });
    }
    req.specialist = spec;
    next();
  });
};
