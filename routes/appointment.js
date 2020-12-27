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
  readReserve,
  updateReserve,
  deleteReserve,
} = require("../controllers/appointment");

// Appointment routes ...

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
 *   postReserve:
 *      type: object
 *      properties:
 *          date:
 *              type: string
 *          hourIn:
 *              type: string
 *          hourOut:
 *              type: string
 */

/**
 * @swagger
 * /api/users/reserve/{userId}/{specialistId}:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Create Reserve
 *    description: Use this request to create a new reserve with an specialist, to access the endpoint, please authenticate with the token generated when logging in
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: userId
 *        description: ID of user
 *      - in: path
 *        name: specialistId
 *        description: ID of specialist
 *      - in: body
 *        name: Reserve Info
 *        description: Info to create a reserve
 *        schema:
 *            $ref: '#definitions/postReserve'
 *    responses:
 *      "200":
 *         description: An object with the reserve created
 *      "409":
 *         description: The date and hour selected is reserved, try others hour
 *      "400":
 *         description: A bad request response!
 *
 */
router.post(
  "/users/reserve/:userId/:specialistId",
  requireSignin,
  isAuth,
  isValidReserve,
  createReserve
);

/**
 * @swagger
 * /api/users/reserves/{userId}:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      summary: List reserves by userId
 *      description: Use to request a list of reserves by userId
 *      produces:
 *         - application/json
 *      parameters:
 *         - in: path
 *           name: userId
 *           description: ID of user
 *      responses:
 *        "200":
 *           description: Object with a list of reserves by userId
 *        "400":
 *           description: User not Found!
 */
router.get("/users/reserves/:userId", requireSignin, isAuth, listReserves);

/**
 * @swagger
 * /api/users/reserve/{userId}/{reserveId}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: read reserve
 *    description: Use to request read a reserve by reserveId, to access the endpoint, please authenticate with the token generated when logging in
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: userId
 *        description: ID of user
 *      - in: path
 *        name: reserveId
 *        description: ID of reserve
 *    responses:
 *      "200":
 *         description: An object with the reserve requested!
 *      "400":
 *         description: A bad request response!
 *
 */
router.get(
  "/users/reserve/:userId/:reserveId",
  requireSignin,
  isAuth,
  readReserve
);

/**
 * @swagger
 * /api/users/reserve/{userId}/{reserveId}:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    summary: Update reserve
 *    description: Use to request update a reserve by reserveId, to access the endpoint, please authenticate with the token generated when logging in
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: userId
 *        description: ID of user
 *      - in: path
 *        name: reserveId
 *        description: ID of reserve
 *      - in: body
 *        name: Reserve info
 *        description: Reserve info to update
 *        schema:
 *          $ref: '#/definitions/postReserve'
 *    responses:
 *      "200":
 *         description: An object with the reserve updated!
 *      "400":
 *         description: A bad request response!
 *
 */
router.patch(
  "/users/reserve/:userId/:reserveId",
  requireSignin,
  isAuth,
  updateReserve
);

/**
 * @swagger
 * /api/users/reserve/{userId}/{reserveId}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: Delete reserve
 *    description: Use to request delete a reserve by reserveId, to access the endpoint, please authenticate with the token generated when logging in
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: userId
 *        description: ID of user
 *      - in: path
 *        name: reserveId
 *        description: ID of reserve
 *    responses:
 *      "200":
 *         description: An object with the reserve deleted!
 *      "400":
 *         description: A bad request response!
 *
 */
router.delete(
  "/users/reserve/:userId/:reserveId",
  requireSignin,
  isAuth,
  deleteReserve
);

// Params ...

router.param("userId", userById);
router.param("specialistId", specialistById);
router.param("reserveId", reserveById);

module.exports = router;
