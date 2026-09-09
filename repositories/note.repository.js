const db = require("../config/db");

//Create
async function createRepository(title, text, owner) {
    const response = await db.query("INSERT INTO notes (note_name, note_text, owner_id) VALUES($1, $2, $3) RETURNING *", [title, text, owner]);
    return response.rows[0]
}

//Read
async function readRepository(userId) {
    const response = await db.query("SELECT * FROM notes WHERE owner_id = $1 ORDER BY created_at", [userId]);

    return response.rows;
}

//Update
async function updateRepository(noteId, newText, newTitle) {
    const response = await db.query("UPDATE notes SET note_name = COALESCE($1, note_name), note_text = COALESCE($2, note_text) WHERE id = $3 RETURNING *", [newText, newTitle, noteId]);
    return response.rows[0];
}

//Delete
async function deleteRepository(noteId) {
    const response = await db.query("DELETE FROM notes WHERE id = $1 RETURNING *", [noteId]);

    return response.rows[0]
}

module.exports = {
    createRepository,
    deleteRepository,
    updateRepository,
    readRepository
}