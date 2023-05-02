const express = require("express");
const router = express.Router();
const path = require("path")
const userController = require("../controllers/userController")

router.get('/leaderboard',(req,res)=>{
    res.sendFile(path.join(__dirname , "../public/pages" , "/leaderboard.html"))
})

router.get("/profile",(req,res)=>{
    res.sendFile(path.join(__dirname , "../public/pages" , "/profile.html"))
})
router.get("/howtoplay",(req,res)=>{
    res.sendFile(path.join(__dirname , "../public/pages" , "/howtoplay.html"))
})

router.post("/leaderboard",userController.leaderboard)
router.post("/adminpanel",userController.adminpanel)
router.post("/profile",userController.userData)

module.exports = router