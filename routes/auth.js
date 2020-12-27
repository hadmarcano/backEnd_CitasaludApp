const express = require("express");
const router = express.Router();

// Middlewares from auth controllers ...

const {
  specialistSignup,
  specialistSignin,
  userSignup,
  userSignin,
  signout,
} = require("../controllers/auth");

// Middlewares from validator ...

const { signupValidator } = require("../validator/index");

// Routes ...

/**
 * @swagger
 *  definitions:
 *   NewUser:
 *      type: object
 *      required:
 *          - firstName
 *          - lastName
 *          - email
 *          - rut
 *          - phone
 *          - address
 *          - password
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
 *  definitions:
 *   NewSpecialist:
 *      type: object
 *      required:
 *          - firstName
 *          - lastName
 *          - email
 *          - rut
 *          - speciality
 *          - phone
 *          - address
 *          - password
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
 * /api/specialist/signup:
 *  post:
 *    summary: Create a specialist or specialist Register
 *    description: Use to request an specialist register
 *    requestBody:
 *      content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/NewSpecialist'
 *    produces:
 *      - application/json
 *    responses:
 *      "200":
 *         description: Object with specialist registered!
 *      "400":
 *         description: A bad request response!
 */
router.post("/specialist/signup", signupValidator, specialistSignup);

/**
 * @swagger
 * /api/specialist/signin:
 *  post:
 *    summary: signin specialist
 *    description: Use to request signin specialist
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              email:
 *                  type: string
 *                  required: true
 *                  description: specialist email valid
 *              password:
 *                  type: string
 *                  required: true
 *                  description: specialist password valid
 *    responses:
 *      "200":
 *         description: An Object with a token and specialist profile
 *      "400":
 *         description: A bad request response
 */
router.post("/specialist/signin", specialistSignin);

/**
 * @swagger
 * /api/specialist/signout:
 *  get:
 *      summary: signout specialist
 *      description: Use to request logout specialist
 *      responses:
 *          "200":
 *              description: A succesfull response
 */
router.get("/specialist/signout", signout);

/**
 * @swagger
 * /api/users/signup:
 *  post:
 *    summary: Create a User or User Register
 *    description: Use to request an user register
 *    requestBody:
 *      content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/NewUser'
 *    produces:
 *      - application/json
 *    responses:
 *      "200":
 *         description: Object with user registered!
 *      "400":
 *         description: A bad request response!
 */
router.post("/users/signup", signupValidator, userSignup);

/**
 * @swagger
 * /api/users/signin:
 *  post:
 *    summary: signin user
 *    description: Use to request signin user
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              email:
 *                  type: string
 *                  required: true
 *                  description: email user valid
 *              password:
 *                  type: string
 *                  required: true
 *                  description: password user valid
 *    responses:
 *      "200":
 *         description: An Object with a token and user profile info
 *      "400":
 *         description: A bad request response
 */
router.post("/users/signin", userSignin);

/**
 * @swagger
 * /api/users/signout:
 *  get:
 *      summary: signout user
 *      description: Use to request logout user
 *      responses:
 *          "200":
 *              description: A succesfull response
 */
router.get("/users/signout", signout);

module.exports = router;
