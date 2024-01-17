const express = require("express");
const router = express.Router();

const {auth} = require("../middlewares/Auth");

const {signUp,
    logIn,
    sendOtp,
    changePassword} = require("../controllers/Auth");

const {createAndSendToken,
    resetPassword}=require("../controllers/resetPassword");

router.post("/signup",signUp);
router.post("/login",logIn);
router.post("/sendotp",sendOtp);
router.put("/changepassword",auth,changePassword);

router.post("/sendresettoken",createAndSendToken);
router.post("/resetpassword/:token",resetPassword);
module.exports = router;
