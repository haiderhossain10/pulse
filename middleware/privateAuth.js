const jwt = require("jsonwebtoken");

const privateAuth = async (req, res, next) => {
    const token = req.cookies.login;
    try {
        const jwtChecker = await jwt.verify(
            token.token,
            process.env.SECRETE_CODE
        );
        if (jwtChecker) {
            next();
        }
    } catch (err) {
        if (err) {
            res.clearCookie("login");
            res.redirect("/login");
        }
    }
};

module.exports = privateAuth;
