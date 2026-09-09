const db = require("../config/db")

async function registerRepository(email, username, password_hash) {
    const response = await db.query("INSERT INTO users(email, username, hash_password) VALUES($1, $2, $3)", [email, username, password_hash]);

}

module.exports = {
    registerRepository
}