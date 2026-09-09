const { emailValidation, notEmpty, lengthValidation } = require("../validators/auth.validator");
const { hashPassword } = require("../utils/hashing");
const asyncHandler = require("../middleware/asyncHandler");
const { registerRepository } = require("../repositories/auth.repository");
const { json } = require("express");

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
            const err = new Error("This username is already taken. Pleasy try another one");
            err.status = 409

            throw err
        }
    }
}

module.exports = {
    registerService
}