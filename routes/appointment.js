const express = require("express");
const router = express.Router();

// Controllers ...
const { userById } = require("../controllers/user");
const { specialistById } = require("../controllers/specialist");
const { requireSignin, isAuth } = require("../controllers/auth");
const {
  reserveById,
  isValidReserve,
  createReserve,
  listReserves,
  updateReserve,
} = require("../controllers/appointment");

// Appointment routes ...

router.post(
  "/users/reserve/:userId/:specId",
  requireSignin,
  isAuth,
  isValidReserve,
  createReserve
);

router.get("/users/allreserves/:userId", requireSignin, isAuth, listReserves);

router.patch(
  "/users/reserve/:userId/:reserveId",
  requireSignin,
  isAuth,
  updateReserve
);

// Params ...

router.param("userId", userById);
router.param("specId", specialistById);
router.param("reserveId", reserveById);

module.exports = router;
