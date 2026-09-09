const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const JWT_SECRET = process.env.JWT_SECRET;

if(!JWT_SECRET){
    const err = new Error("JWT_SECRET NOT FOUND.");
    err.status = 500;

    throw err;
}

//Generate tokens
function generateAccessToken(userID){
    const token = jwt.sign({sub: userID}, JWT_SECRET, {expiresIn: "1h"});
    return token
}

function generateRefreshToken(){
    const token = crypto.randomBytes(32).toString("hex");
    return token
}

//Hash token
function hashRefreshToken(token){
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    return hashedToken;
}

//Verify tokens
function verifyRefreshToken(storedTokenHash, token){
    const hashedToken = hashRefreshToken(token);

    return storedTokenHash === hashedToken
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    hashRefreshToken,
    verifyRefreshToken
}