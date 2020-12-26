const express = require("express");
const router = express.Router();

// Controllers ...

const { isAuth, isAdmin, requireSignin } = require("../controllers/auth");

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

// Params

router.param("specialistId", specialistById);

module.exports = router;
