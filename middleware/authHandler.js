const { verifyAccessToken } = require("../utils/jwt");
const { notEmpty } = require("../validators/auth.validator");

function authHandler(req, res, next){
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        const err = new Error("Not authorized");
        err.status = 401;

        throw err;
    }

    const userAccessToken = authHeader.split(" ")[1];

    notEmpty(userAccessToken, "JWT");

    req.user = verifyAccessToken(userAccessToken);
    next();
}

module.exports = authHandler