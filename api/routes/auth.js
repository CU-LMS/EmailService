const {login,register, changeRole, getAllUsers, deleteUsers} = require('../controller/authController')
const router = require('express').Router()

router.route("/login").post(login)
router.route("/register").post(register)
router.route("/change/role").post(changeRole)
router.route("/users").get(getAllUsers)
router.route("/user/:userEmail").delete(deleteUsers)
module.exports = router
