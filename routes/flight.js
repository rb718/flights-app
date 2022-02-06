const express = require('express');
const router = express.Router();
const Flight = require("../models/Flight");

// Helper function to convert date object to string with yyyy-MM-ddThh:mm format
function format_date(date) {
    formatted_date = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    formatted_date += `-${date.getDate().toString().padStart(2, '0')}T${date.toTimeString().slice(0, 5)}`;
    return formatted_date

}

// Show flights
router.get('/', async function (req, res, next) {
    const flights = await Flight.find().sort('departs');
    const now = new Date();
    const processed_flights = flights.map(function (flight) {
        const p_flight = flight.toObject();
        p_flight.expired = flight.departs < now;
        p_flight.departs = format_date(flight.departs);
        return p_flight
    })
    res.render('flight/list', {flights: processed_flights});
});

// Show new flight form
router.get('/new', function (req, res, next) {
    res.render('flight/create', {now: format_date(new Date())});
});

// Save new flight and redirect to home page
router.post('/new', async function (req, res, next) {
    const flight = Flight(req.body);
    await flight.save();
    res.redirect("/flight");
});


module.exports = router;
