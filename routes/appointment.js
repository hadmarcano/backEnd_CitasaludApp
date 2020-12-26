const express = require("express");
const router = express.Router();

// Controllers ...
const { userById } = require("../controllers/user");
const { specialistById } = require("../controllers/specialist");
const { requireSignin, isAuth } = require("../controllers/auth");
const {
  isValidReserve,
  createReserve,
  listReserves,
} = require("../controllers/appointment");

// Appointment routes ...

router.post(
  "/users/reserve/:userId",
  requireSignin,
  isAuth,
  isValidReserve,
  createReserve
);

router.get("/users/allreserves/:userId", requireSignin, isAuth, listReserves);

// Params ...

router.param("userId", userById);
router.param("specById", specialistById);

module.exports = router;
