const express = require("express");
const router = express.Router();

// Controllers ...
const { userById } = require("../controllers/user");
const { specialistById } = require("../controllers/specialist");
const { requireSignin, isAuth } = require("../controllers/auth");
const { isValidReserve, createReserve } = require("../controllers/appointment");

// Appointment routes ...

router.post(
  "/users/reserve/:userId/:specById",
  requireSignin,
  isAuth,
  isValidReserve,
  createReserve
);

// Params ...

router.param("userId", userById);
router.param("specById", specialistById);

module.exports = router;
