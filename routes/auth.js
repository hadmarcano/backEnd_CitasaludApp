const express = require("express");
const router = express.Router();

// Middlewares from auth controllers ...

const { userSignup, userSignin, signout } = require("../controllers/auth");

// Middlewares from validator ...

const { userSignupValidator } = require("../validator/index");

// Routes ...

router.post("/users/signup", userSignupValidator, userSignup);

router.post("/users/signin", userSignin);

router.get("/signout", signout);

module.exports = router;
