const express = require("express");
const {
    homeController,
    instController,
    instSubmit,
    loginController,
    loginCheckController,
    logoutController,
    pdoaOnboardController,
} = require("../controller/adminController");
const installChecker = require("../middleware/installChecker");
const privateAuth = require("../middleware/privateAuth");
const publicAuth = require("../middleware/publicAuth");

const { instValidation, loginValidation } = require("../validation/validation");

const adminRoutes = express.Router();

/* ------------------------------ private auth ------------------------------ */
adminRoutes.get("/", privateAuth, homeController);
adminRoutes.get("/pdoa-onboard", privateAuth, pdoaOnboardController);

/* ------------------------------- public auth ------------------------------ */
adminRoutes.get("/installer", publicAuth, installChecker, instController);
adminRoutes.post("/installer", instValidation, instSubmit);
adminRoutes.get("/login", publicAuth, loginController);
adminRoutes.post("/login", loginValidation, loginCheckController);
adminRoutes.get("/logout", logoutController);

module.exports = adminRoutes;
