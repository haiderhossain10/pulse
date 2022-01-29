const { validationResult } = require("express-validator");
const PeopleMode = require("../model/PeopleMode");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");

/* ------------------------------ client routes ----------------------------- */
const homeController = (req, res) => {
    res.render("index", { title: "Dashboard" });
};

const pdoaOnboardController = (req, res) => {
    res.render("pdoa-onboard", { title: "PDOA Onboard" });
};

const managePdoaController = (req, res) => {
    res.render("manage-pdoa", { title: "PDOA List" });
};

const pdoDevicesController = async (req, res) => {
    const response = await axios.get(
        "https://pulse.simplifon.in/monitor/inst/index.php"
    );
    const obj = Object.entries(response.data);
    res.render("pdo-devices", {
        title: "PDO Devices",
        pdo: obj,
    });
};

/* ------------------------------- login route ------------------------------ */
const loginController = (req, res) => {
    res.render("login", { title: "Login" });
};

/* ------------------------------ loging checker ------------------------------ */
const loginCheckController = async (req, res) => {
    const find = await PeopleMode.find({ username: req.body.username }).exec();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(201).json(errors);
    } else {
        if (find.length !== 0) {
            const compare = await bcrypt.compare(
                req.body.password,
                find[0].password
            );
            if (compare) {
                const token = jwt.sign(
                    {
                        id: find[0]._id,
                        name: find[0].username,
                        email: find[0].email,
                        license_key: find[0].license_key,
                        role: find[0].role,
                    },
                    process.env.SECRETE_CODE
                );
                res.cookie("login", { token: token });
                res.status(201).json({
                    login: true,
                });
            } else {
                res.status(201).json({
                    message: "Username & password invalid!",
                });
            }
        } else {
            res.status(201).json({
                message: "Username & password invalid!",
            });
        }
    }
};
/* ---------------------------- logout controller --------------------------- */
const logoutController = (req, res) => {
    res.clearCookie("login");
    res.redirect("/login");
};

/* ----------------------------- installer route ---------------------------- */
const instController = (req, res) => {
    res.render("installer", { title: "Installer", install: false });
};

/* ---------------------------- installer submit ---------------------------- */
const instSubmit = async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        res.render("installer", { errors: errors, install: false });
    } else {
        const {
            username,
            organization_name,
            email,
            password,
            confirm_password,
            license_key,
        } = req.body;
        if (password == confirm_password) {
            const hashed = await bcrypt.hash(req.body.password, 10);
            if (hashed) {
                const insert = new PeopleMode({
                    username: username,
                    organization_name: organization_name,
                    email: email,
                    password: hashed,
                    license_key: license_key,
                });

                insert.save((err) => {
                    if (!err) {
                        res.render("installer", { install: true });
                    }
                });
            }
        } else {
            res.render("installer", { pwd: "Password mismatch!" });
        }
    }
};

module.exports = {
    homeController,
    pdoaOnboardController,
    managePdoaController,
    pdoDevicesController,
    loginController,
    loginCheckController,
    logoutController,
    instController,
    instSubmit,
};
