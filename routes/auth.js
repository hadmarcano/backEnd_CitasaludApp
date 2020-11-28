const express = require("express");
const router = express.Router();

// Middlewares from auth controllers ...

const { signup, signin, signout } = require("../controllers/auth");

// Middlewares from validator ...

const { userSignupValidator } = require("../validator/index");

// Routes ...

router.post("/signup", userSignupValidator, signup);

router.post("/signin", signin);

router.get("/signout", signout);

module.exports = router;
