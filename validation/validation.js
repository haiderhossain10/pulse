const { check } = require("express-validator");
const PeopleMode = require("../model/PeopleMode");

const instValidation = [
    check("username")
        .custom(async (name) => {
            const check = await PeopleMode.find({ username: name });
            if (check.length !== 0) {
                throw new Error("Username already exist");
            }
        })
        .not()
        .isEmpty()
        .withMessage("Username is required!"),
    check("organization_name")
        .not()
        .isEmpty()
        .withMessage("Organization name is required!")
        .trim(),
    check("password")
        .not()
        .isEmpty()
        .withMessage("Password is required!")
        .trim(),
    check("confirm_password")
        .not()
        .isEmpty()
        .withMessage("Confirm password is required!")
        .trim(),
    check("license_key")
        .not()
        .isEmpty()
        .withMessage("License key is required!")
        .trim(),
];

const loginValidation = [
    check("username").not().isEmpty().withMessage("Username is required!"),
    check("password").not().isEmpty().withMessage("Password is required!"),
];

module.exports = {
    instValidation,
    loginValidation,
};
