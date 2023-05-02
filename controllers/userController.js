const db = require("../database/db");

const userData = async (req, res) => {
    const user = await db
        .get()
        .collection("Users")
        .findOne({ email: req.body.email });
    res.status(200).send(user)
}

const leaderboard = async (req, res) => {
    const data = await db.get().collection("Users").find({}).sort({totalScore : -1 , totalTime : 1}).limit(5).toArray()
    res.status(200).send(data)

}

const adminpanel = async (req, res) => {
    const data = await db.get().collection("Users").find({}).sort({totalScore : -1 , totalTime : 1}).toArray()
    res.status(200).send(data)

}

module.exports = {
    userData,
    leaderboard,
    adminpanel
};