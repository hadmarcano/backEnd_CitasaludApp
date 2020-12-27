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
  listAllSpecialist,
} = require("../controllers/specialist");

// Routes ...

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
 *   UpdateSpecialist:
 *      type: object
 *      properties:
 *          firstName:
 *              type: string
 *          lastName:
 *              type: string
 *          email:
 *              type: string
 *          speciality:
 *              type: string
 *          specialization:
 *              type: string
 *          rut:
 *              type: integer
 *          phone:
 *              type: integer
 *          address:
 *              type: string
 *          password:
 *              type: string
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
 * /api/specialist/{specialistId}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Get specialist profile
 *    description: Use to request specialist profile, to access the profile, please authenticate with the token generated when logging in
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: specialistId
 *        description: ID of specialist
 *    responses:
 *      "200":
 *         description: An object with the specialist profile
 *      "400":
 *         description: A bad request response!
 *
 */
router.get(
  "/specialist/:specialistId",
  requireSignin,
  isAuth,
  isAdmin,
  getProfile
);

/**
 * @swagger
 * /api/specialist/{specialistId}:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    summary: Update specialist profile
 *    description: Use to request update specialist profile, to access the profile, please authenticate with the token generated when logging in
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: specialistId
 *        description: ID of specialist
 *      - in: body
 *        name: Specialist info
 *        description: Specialist info to update
 *        schema:
 *          $ref: '#/definitions/UpdateSpecialist'
 *    responses:
 *      "200":
 *         description: An object with the specialist updated!
 *      "400":
 *         description: A bad request response!
 *
 */
router.patch(
  "/specialist/:specialistId",
  requireSignin,
  isAuth,
  isAdmin,
  updateProfile
);

/**
 * @swagger
 * /api/specialist/reserves/{specialistId}:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      summary: List reserves by specialistId
 *      description: use to request a list of reserves by specialistId
 *      produces:
 *         - application/json
 *      parameters:
 *         - in: path
 *           name: specialistId
 *           description: ID of the specialist
 *      responses:
 *        "200":
 *           description: Object with a list of reserves by specialistId
 *        "400":
 *           description: specialist not Found!
 */
router.get(
  "/specialist/reserves/:specialistId",
  requireSignin,
  isAuth,
  isAdmin,
  listReserves
);

/**
 * @swagger
 * /api/specialist/reserve/{specialistId}/{reserveId}:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    summary: Update reserve
 *    description: Use to request update a reserve by reserveId, to access the endpoint, please authenticate with the token generated when logging in
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: specialistId
 *        description: ID of specialist
 *      - in: path
 *        name: reserveId
 *        description: ID of reserve
 *      - in: body
 *        name: Reserve info
 *        description: Reserve info to update
 *    responses:
 *      "200":
 *         description: An object with the reserve updated!
 *      "400":
 *         description: A bad request response!
 *
 */
router.patch(
  "/specialist/reserve/:specialistId/:reserveId",
  requireSignin,
  isAuth,
  isAdmin,
  updateReserve
);

/**
 * @swagger
 * /api/specialist/reserve/{specialistId}/{reserveId}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: read reserve
 *    description: Use to request read a reserve by reserveId, to access the endpoint, please authenticate with the token generated when logging in
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: specialistId
 *        description: ID of specialist
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
  "/specialist/reserve/:specialistId/:reserveId",
  requireSignin,
  isAuth,
  isAdmin,
  readReserve
);

/**
 * @swagger
 * /api/specialist/reserve/{specialistId}/{reserveId}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: Delete reserve
 *    description: Use to request delete a reserve by reserveId, to access the endpoint, please authenticate with the token generated when logging in
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: specialistId
 *        description: ID of specialist
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
  "/specialist/reserve/:specialistId/:reserveId",
  requireSignin,
  isAuth,
  isAdmin,
  deleteReserve
);

/**
 * @swagger
 * /api/allspecialist:
 *  get:
 *      summary: List all specialist resgistered
 *      description: Use to request show all the specialist resgistered
 *      responses:
 *          "200":
 *              description: An array with the specialist registered
 *          "204":
 *              description: not found specialist registered
 *          "500":
 *              description: error message
 */
router.get("/allspecialist", listAllSpecialist);

// Params

router.param("specialistId", specialistById);
router.param("reserveId", reserveById);

module.exports = router;
