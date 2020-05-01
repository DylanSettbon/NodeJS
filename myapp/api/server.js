var app = require('./app');
var all_routes = require('express-list-endpoints');
var PORT = 3000;

// Run server
var server = app.listen(PORT, function () {
    console.log('Express server listening on port ' + PORT);
    console.log(all_routes(app));
});