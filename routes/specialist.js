const express = require('express');
const router = express.Router();

// Controllers ...

const {
    isAuth,
    isAdmin,
    requireSignin
} = require('../controllers/auth');

const {
    specialistById,
    updateSpecialist,
    readSpecialist,
    

    
} = require('../controllers/specialist');


// Routes ...

router.patch('/specialist/:specialistId', requireSignin, isAuth, updateSpecialist);


// Params

router.param('specialistById', specialistById);

module.exports = router;


