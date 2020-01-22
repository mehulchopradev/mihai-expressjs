exports.logEvent = function (req, res, next) {
    // a middeware function should declare three arguments
    console.log(req.url);
    console.log(new Date());
    next(); // go ahead to the next middleware in the chain or invoke the intended route callback  
};