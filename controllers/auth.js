const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { json } = require("body-parser");
const Specialist = require("../models/specialist");

// Middlewares ...

exports.specialistSignup = (req, res) => {
  const specialist = new Specialist(req.body);
  
}

exports.signup = (req, res) => {
  const user = new User(req.body);
  
  //console.log(user);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({ user });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup",
      });
    }

    // If user dont be authenticated
    if (!user.authenticated(password)) {
      return res.status(401).json({
        error: "Email and password dont match",
      });
    }

    // Generate a token with user id and secret ...
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // Hold the token as 't' in cookie with expires date ...
    res.cookie("t", token, {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
    });

    // Return response with user and token to client frontend ...
    const { _id, name, email, role } = user;
    return json({
      token,
      user: {
        _id,
        firstName,
        lastName,
        role,
      },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout success" });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
  algorithms: ["RS256"],
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
