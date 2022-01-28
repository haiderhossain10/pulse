const publicAuth = async (req, res, next) => {
    const token = req.cookies.login;
    if (token) {
        res.redirect("/");
    } else {
        next();
    }
};

module.exports = publicAuth;
