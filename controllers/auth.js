const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { json } = require("body-parser");
const Specialist = require("../models/specialist");

// Middlewares ...


exports.userSignup = (req, res) => {
  const user = new User(req.body);
  user.salt;
  user.hashed_password;
  
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    
    res.json({user});
  });
};

exports.userSignin = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email }, async (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup"
      })
    }
    
    // Verifying if user is authenticated ...
    
    try {
      const isAuthenticated = await user.authenticated(password);
      
      if(!isAuthenticated){
        return res.status(400).json({error: 'Not authenticated'});
      }
      
      // generate auth token ...
      const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
      
      // holding the token as 't' in cookie with the expires date ...
      
      res.cookie('t', token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true
      });
      
      const { _id, firstName, lastName, email, role } = user;
      
      return res.status(202).json({
        token,
        user: {
          _id,
          firstName,
          lastName,
          email,
          role
        }
      });
      
    }catch(e){
      res.status(401).json({
        'error': 'Unable to login'
      })
    }
    
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

exports.specialistSignup = (req, res) => {
  const specialist = new Specialist(req.body);
  
};