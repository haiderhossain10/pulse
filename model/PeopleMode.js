const mongoose = require("mongoose");

const PeopleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: "",
        },
        username: String,
        organization_name: String,
        email: String,
        password: String,
        license_key: String,
        role: {
            type: String,
            enum: ["admin", "pdoa", "pdo", "distributor"],
            default: "admin",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("People", PeopleSchema);
