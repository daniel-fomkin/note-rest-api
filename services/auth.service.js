const { emailValidation, notEmpty, lengthValidation } = require("../validators/auth.validator");
const { hashPassword, verifyPassword } = require("../utils/hashing");
const { registerRepository, getHashByUsername, loginRepository } = require("../repositories/auth.repository");
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
            const createdAt = Date.now();
            const expiresAt = createdAt + 30 * 24 * 60 * 60 * 1000;

            await loginRepository(userId, hashedRefresh);

            return { accessToken: access, refreshToken: refresh }
        }
    }

    const err = new Error("Invalid credentials");
    err.status = 401;

    throw err;

    
}

module.exports = {
    registerService,
    loginService
}