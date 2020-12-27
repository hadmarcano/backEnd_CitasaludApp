const express = require("express");
const router = express.Router();

// Controllers ...

const { isAuth, isAdmin, requireSignin } = require("../controllers/auth");

const {
  reserveById,
  updateReserve,
  readReserve,
  deleteReserve,
} = require("../controllers/appointment");

const {
  specialistById,
  getProfile,
  updateProfile,
  listReserves,
} = require("../controllers/specialist");

// Routes ...

router.get(
  "/specialist/:specialistId",
  requireSignin,
  isAuth,
  isAdmin,
  getProfile
);

router.patch(
  "/specialist/:specialistId",
  requireSignin,
  isAuth,
  isAdmin,
  updateProfile
);

router.get(
  "/specialist/reserves/:specialistId",
  requireSignin,
  isAuth,
  isAdmin,
  listReserves
);

router.patch(
  "/specialist/reserve/:specialistId/:reserveId",
  requireSignin,
  isAuth,
  isAdmin,
  updateReserve
);

router.get(
  "/specialist/reserve/:specialistId/:reserveId",
  requireSignin,
  isAuth,
  isAdmin,
  readReserve
);

router.delete(
  "/specialist/reserve/:specialistId/:reserveId",
  requireSignin,
  isAuth,
  isAdmin,
  deleteReserve
);

// Params

router.param("specialistId", specialistById);
router.param("reserveId", reserveById);

module.exports = router;
