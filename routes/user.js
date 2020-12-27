const express = require("express");
const router = express.Router();

// Controllers ...

const { requireSignin, isAuth } = require("../controllers/auth");

const { userById, update, read } = require("../controllers/user");

// User Routes ...

/**
 * @swagger
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 */

/**
 * @swagger
 *  definitions:
 *   UpdateUser:
 *      type: object
 *      properties:
 *          firstName:
 *              type: string
 *          lastName:
 *              type: string
 *          email:
 *              type: string
 *          birthDate:
 *              type: string
 *              format: date
 *          rut:
 *              type: integer
 *          ocupation:
 *              type: string
 *          civilState:
 *              type: string
 *          sexType:
 *              type: string
 *          phone:
 *              type: integer
 *          address:
 *              type: string
 *          password:
 *              type: string
 */

/**
 * @swagger
 * /api/users/{userId}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Get user profile
 *    description: Use to request user profile, to access the profile, please authenticate with the token generated when logging in
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: userId
 *        description: ID of user
 *    responses:
 *      "200":
 *         description: An object with the user profile
 *      "400":
 *         description: A bad request response!
 *
 */
router.get("/users/:userId", requireSignin, isAuth, read);

/**
 * @swagger
 * /api/users/{userId}:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    summary: Update user profile
 *    description: Use to request update user profile, to access the profile, please authenticate with the token generated when logging in
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: userId
 *        description: ID of user
 *      - in: body
 *        name: User info
 *        description: User info to update
 *        schema:
 *          $ref: '#/definitions/UpdateUser'
 *    responses:
 *      "200":
 *         description: An object with the user updated!
 *      "400":
 *         description: A bad request response!
 *
 */
router.patch("/users/:userId", requireSignin, isAuth, update);

// Params ...

router.param("userId", userById);

module.exports = router;
