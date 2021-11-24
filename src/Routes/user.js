const express = require("express");
const userSchema = require("../models/userSchema");

const router = express.Router();

// create user
/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: the user name
 *        age:
 *          type: integer
 *          description: the user age
 *        email:
 *          type: string
 *          description: the user email
 *      required:
 *        - name
 *        - age
 *        - email
 *      example:
 *        name: Victor Aponte
 *        age: 24
 *        email: victor@gmail.com
 */

/**
 * @swagger
 * /api/users:
 *  post:
 *    sumary: create new user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          scheme:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: new user created
 */
router.post("/users", (req, res) => {
  const user = userSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all users
/**
 * @swagger
 * /api/users:
 *  get:
 *    sumary: return all users
 *    tags: [User]
 *    responses:
 *      200:
 *        description: all users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 */
router.get("/users", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get a user
/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    sumary: return a users
 *    tags: [User]
 * parameters:
 *   - in: path
 *     name: id
 *     schema:
 *      type: string
 *    required: true
 *    description: the user id
 *    responses:
 *      200:
 *        description: all users
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: user not found
 */
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete a user
/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *    sumary: deleted a users
 *    tags: [User]
 * parameters:
 *   - in: path
 *     name: id
 *     schema:
 *      type: string
 *    required: true
 *    description: the user id
 *    responses:
 *      200:
 *        description: user deleted
 *      400:
 *        description: user not found
 */
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update a user
// delete a user
/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *    sumary: update a users
 *    tags: [User]
 * parameters:
 *   - in: path
 *     name: id
 *     schema:
 *      type: string
 *    required: true
 *    description: the user id
 * requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          scheme:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: user updated
 *      400:
 *        description: user not found
 */
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: { name, age, email } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
