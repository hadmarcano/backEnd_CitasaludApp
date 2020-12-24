const express = require("express");
const router = express.Router();

// Controllers ...

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

const {
  userById,
  update,
  read,
  // getMedicalHistory
} = require("../controllers/user");

// User Routes ...

router.get("/users/:userId", requireSignin, isAuth, read);
router.patch("/users/:userId", requireSignin, isAuth, update);

//router.get('/history/by/user/:userId', requireSignin, isAuth, isAdmin, getMedicalHistory);

// Params ...

router.param("userId", userById);

module.exports = router;
