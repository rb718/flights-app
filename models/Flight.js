//Import the mongoose module
const mongoose = require('mongoose');

function next_year() {
    const dt = new Date();
    const curYr = dt.getFullYear();
    dt.setFullYear(curYr + 1);
    return dt;
}

//Flight Schema definition
const flightSchema = mongoose.Schema({
    airline: {type: String, enum: ["American", "Southwest", "United"]},
    airport: {type: String, enum: ["AUS", "DFW", "DEN", "LAX", "SAN"], default: "DEN"},
    flightNo: {type: Number, min: 10, max: 9999},
    departs: {
        type: Date,
        default: function () {
            return next_year();
        },
        set: function (value) {
            if (value) {
                return value
            } else {
                return next_year();
            }
        }
    }
});
module.exports = mongoose.model('Flight', flightSchema, 'flights');