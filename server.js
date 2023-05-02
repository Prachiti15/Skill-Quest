const bodyparser = require("body-parser");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require('path')
require("dotenv").config();
const db = require('./database/db');
const authRouter = require("./routes/authRoute");
const gameRouter = require("./routes/gameRoute");
const userRouter = require("./routes/userRoute");
const app = express();
app.use(express.static("public"));
app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: "secret",
    })
);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}));
app.use(cookieParser())
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use('/games',gameRouter)

db.connect(() => {
    app.get('/', (req, res) => {
        res.sendFile(__dirname + "/index.html")
    })
    app.get('/adminpanel',(req,res)=>{
        res.sendFile(__dirname + "/public/pages/adminpanel.html")
    })
    app.listen(process.env.PORT, function () {
        console.log(`Listening on ${process.env.PORT}`);
    });
});

