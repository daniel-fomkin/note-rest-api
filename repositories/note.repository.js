const db = require("../config/db");

async function createRepository(title, text, owner) {
    const response = await db.query("INSERT INTO notes (note_name, note_text, owner_id) VALUES($1, $2, $3) RETURNING *", [title, text, owner]);
    return response.rows[0]
}

module.exports = {
    createRepository
}