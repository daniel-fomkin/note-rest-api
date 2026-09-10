const { emailValidation, notEmpty, lengthValidation, dbNotFound } = require("../validators/auth.validator");
const { hashPassword, verifyPassword } = require("../utils/hashing");
const { registerRepository, getHashByUsername, loginRepository, refreshRepository, deleteRefreshToken } = require("../repositories/auth.repository");
const { generateAccessToken, generateRefreshToken, hashRefreshToken } = require("../utils/jwt");

async function registerService(email, username, password) {
    //Email validation
    emailValidation(email);

    //Username Validation
    notEmpty(username, "Username");
    lengthValidation(username, "username", 4);

    //Password Validation
    notEmpty(password, "Password");
    lengthValidation(password, "password", 6);

    //Password Hashing
    const hashedPassword = (await hashPassword(password));
    try{
        await registerRepository(email, username, hashedPassword);
    }
    catch(err){
        if(err.code == "23505"){
            const error = new Error("This username is already taken. Pleasy try another one");
            error.status = 409

            throw error
        }
        else{
            const error = new Error("Undefined error on adding your account on db");
            error.status = 500;

            throw error;
        }
    }
}

async function loginService(username, password) {
    //Username Validation
    notEmpty(username, "Username");

    //Password Validation
    notEmpty(password, "Password");

    const userInfo = await getHashByUsername(username);

    if(userInfo[0]){
        const hashedPassword = userInfo[0].hash_password;
        const userId = userInfo[0].id;

        const isRightPassword = await verifyPassword(hashedPassword, password);

        if(isRightPassword){
            const access = generateAccessToken(userId);
            const refresh = generateRefreshToken();

            const hashedRefresh = hashRefreshToken(refresh);

            await loginRepository(userId, hashedRefresh);

            return { accessToken: access, refreshToken: refresh }
        }
    }

    const err = new Error("Invalid credentials");
    err.status = 401;

    throw err;

    
}

async function logoutService(refreshToken) {
    notEmpty(refreshToken, "Refrest Token");
    const hashedToken = hashRefreshToken(refreshToken);

    const dbResponse = await deleteRefreshToken(hashedToken);
    dbNotFound(dbResponse[0], "Refresh Token");

}

async function refreshService(refreshToken) {
    notEmpty(refreshToken, "Refrest Token");
    const hashedToken = hashRefreshToken(refreshToken);

    const dbResponse = await refreshRepository(hashedToken);

    dbNotFound(dbResponse[0], "Refresh Token");

    const expiresAt = dbResponse[0].expires_at;

    if(expiresAt < Date.now()){
        await deleteRefreshToken(hashedToken);

        const err = new Error("Token is expired");
        err.status = 401;

        throw err;
    }

    const userId = dbResponse[0].user_id;
    const accesToken = generateAccessToken(userId);

    return accesToken;

}



module.exports = {
    registerService,
    loginService,
    refreshService,
    logoutService
}