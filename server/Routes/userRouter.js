const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {registerUser, loginUser, getMe} = require("../Routes/Controller/userController")
const router = express.Router();

router.route('/').post(registerUser)
router.post('/login',loginUser)
router.get('/get',protect,getMe)

module.exports =router;