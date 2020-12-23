const express = require("express");
const router = express.Router();

// Middlewares from auth controllers ...

const { 
    specialistSignup,
    specialistSignin,
    userSignup,
    userSignin,
    signout
} = require("../controllers/auth");

// Middlewares from validator ...

const { signupValidator } = require("../validator/index");

// Routes ...

router.post('/specialist/signup', signupValidator, specialistSignup);

router.post('/specialist/signin', specialistSignin);

router.post('/specialist/signout', signout);

router.post("/users/signup", signupValidator, userSignup);

router.post("/users/signin", userSignin);

router.get("/users/signout", signout);

module.exports = router;
