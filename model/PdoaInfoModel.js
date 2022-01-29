const mongoose = require("mongoose");

const PdoaInfoSchema = new mongoose.Schema({
    name: String,
    email: String,
    license: String,
    code: String,
    authorised_person: String,
    mobile_number: String,
    phone_number: String,
    website_address: String,
    registered_address: String,
    country: String,
    state: String,
    district: String,
    city: String,
    subdivision: String,
    block: String,
    post_office: String,
    police_station: String,
    pin_code: String,
    latitude: Number,
    longitude: Number,
    logo: String,
});

module.exports = mongoose.model("PdoaInfo", PdoaInfoSchema);
