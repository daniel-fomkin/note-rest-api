const db = require("../config/db")

async function registerRepository(email, username, password_hash) {
    const response = await db.query("INSERT INTO users(email, username, hash_password) VALUES($1, $2, $3)", [email, username, password_hash]);

}

async function getHashByUsername(username) {
    const response = await db.query("SELECT hash_password, id FROM users WHERE username=$1", [username]);
    return response.rows;
}

async function loginRepository(userId, tokenHash) {
    const response = await db.query("INSERT INTO tokens(user_id, token_hash) VALUES($1, $2)", [userId, tokenHash]);
}

async function refreshRepository(tokenHash) {
    const response = await db.query("SELECT user_id, expires_at FROM tokens WHERE token_hash = $1", [tokenHash]);
    return response.rows
}

async function deleteRefreshToken(tokenHash) {
    const response = await db.query("DELETE FROM tokens WHERE token_hash = $1 RETURNING *", [tokenHash]);
    return response.rows
}

module.exports = {
    registerRepository,
    getHashByUsername,
    loginRepository,
    refreshRepository,
    deleteRefreshToken
}