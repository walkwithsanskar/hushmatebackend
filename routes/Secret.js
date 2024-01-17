const express = require("express");
const router = express.Router();

const {auth} = require("../middlewares/Auth");

const {createSecret,getAllSecrets,deleteSecret,getUserSecret} = require("../controllers/Secret");


router.post("/createSecret",auth,createSecret);
router.get("/getAllSecrets",auth,getAllSecrets);
router.delete("/deleteSecret",auth,deleteSecret);
router.get("/usersecret",auth,getUserSecret);

module.exports = router;
