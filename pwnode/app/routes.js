// grab the transfers model we just created
var Transfers = require('./models/transfers');

module.exports = function (app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // sample api route
    app.get('/api/transfers', function (req, res) {
        // use mongoose to get all transfers in the database
        Transfers.find(function (err, transfers) {

            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(transfers); // return in JSON format
        });
    });

    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function (req, res) {
        res.sendFile('/index.html'); // load our public/index.html file
    });

};