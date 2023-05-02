const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../database/db.js");


router.put("/scores/", async (req, res) => {
    const level = req.body.level;
    const email = req.body.email;
    const newtime = req.body.time;
    const attempt = req.body.attempt;
    const user = await db.get().collection("Users").findOne({ email: email })
    let up = user.time;
    let upscore = user.score;
    let totalScore = 0;
    let totalTime = 0;
    upscore.forEach(element => {
        totalScore = totalScore + element
    });
    if (level != 5) {
        upscore[level - 1] = (1 / attempt) * 100
    } else {
        upscore[level - 1] = newtime
    }
    up[level - 1] = newtime
    up.forEach(element => {
        totalTime = totalTime + element
    });
    await db.get().collection("Users").findOneAndUpdate({ email: email }, { $set: { score: upscore, time: up, totalScore: totalScore, totalTime: totalTime, currentLevel: level } })
    res.status(200).send({
        message: "success"
    })
})


router.get("/aimtraining", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/games", "/aimtraining.html"))
})
router.get('/:level', (req, res) => {
    const level = req.params.level
    res.sendFile(path.join(__dirname, "../public/games", `/skill${level}.html`))
})

module.exports = router
