const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

/* ------------------------- Template engine  of ejs ------------------------ */
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Mongodb connected");
    })
    .catch((err) => {
        console.log(err);
    });

/* ------------------------------ Admin routes ------------------------------ */
app.use("/", adminRoutes);

/* ---------------------------- Localhost server ---------------------------- */
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
