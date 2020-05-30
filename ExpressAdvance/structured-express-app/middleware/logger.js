function log(req, res, next) {
    console.log('middleware logging function....');
    next();
}

module.exports = log;