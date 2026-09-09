const argon2 = require("argon2");

async function hashPassword(password){
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
}

async function verifyPassword(hashedPassword, password) {
    return argon2.verify(hashedPassword, password);
}

module.exports = {
    hashPassword,
    verifyPassword
}