const express = require('express');
const router = express.Router();

const {
    requireSignin,
    isAuth,
    isAdmin
} = require('../controllers/auth');

// user controllers ...