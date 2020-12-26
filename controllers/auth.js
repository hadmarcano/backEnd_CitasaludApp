const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const Specialist = require("../models/specialist");

// Middlewares ...

exports.userSignup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    user.password = undefined;
    user.salt = undefined;
    res.json({ user });
  });
};

exports.userSignin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }, async (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup",
      });
    }

    // Verifying if user is authenticated ...
    try {
      const isAuthenticated = await user.authenticated(password);

      if (!isAuthenticated) {
        return res.status(400).json({ error: "Not authenticated" });
      }

      // generate auth token ...
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

      // holding the token as 't' in cookie with the expires date ...
      res.cookie("t", token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
      });

      const { _id, firstName, lastName, email, role } = user;

      return res.status(202).json({
        token,
        user: {
          _id,
          firstName,
          lastName,
          email,
          role,
        },
      });
    } catch (e) {
      res.status(401).json({
        error: "Unable to login",
      });
    }
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout success" });
};

// Recuperar el usuario/specialista decodificado ...
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "admin resource! Access denied",
    });
  }
  next();
};

exports.specialistSignup = (req, res) => {
  const specialist = new Specialist(req.body);
  specialist.save((err, spec) => {
    if (err || !spec) {
      return res.status(400).json({ Error: err });
    }
    spec.password = undefined;
    spec.salt = undefined;
    res.json(spec);
  });
};

exports.specialistSignin = async (req, res) => {
  const { email, password } = req.body;

  const specialist = await Specialist.findOne({ email }, async (err, spec) => {
    if (err || !spec) {
      return res.status(400).json({ Error: "Specialist dont exist" });
    }

    try {
      const isAuthenticated = await spec.specAuthenticated(password);

      if (!isAuthenticated) {
        return res.status(401).json({ Error: "Specialist not authenticated" });
      }

      const token = jwt.sign({ _id: spec._id }, process.env.JWT_SECRET);

      res.cookie("t", token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
      });

      const {
        _id,
        firstName,
        lastName,
        speciality,
        specialization,
        email,
        role,
      } = spec;

      return res.status(202).json({
        token,
        specialist: {
          _id,
          firstName,
          lastName,
          speciality,
          specialization,
          email,
          role,
        },
      });
    } catch (e) {
      console.log("Error: ", e);
    }
  });
};
