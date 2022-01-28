const PeopleMode = require("../model/PeopleMode");

const installChecker = async (req, res, next) => {
    const find = await PeopleMode.find({}).exec();
    find.map((item) => {
        if (item.role == "admin") {
            res.redirect("/login");
        } else {
            next();
        }
    });
};

module.exports = installChecker;
