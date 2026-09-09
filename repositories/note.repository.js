const db = require("../config/db");

//Create
async function createRepository(title, text, owner) {
    const response = await db.query("INSERT INTO notes (note_name, note_text, owner_id) VALUES($1, $2, $3) RETURNING *", [title, text, owner]);
    return response.rows[0]
}

//Read

//Update
async function updateRepository(noteId, newContent) {
    const response = await db.query("UPDATE notes SET note_name = COALESCE($1, note_name), note_text = COALESCE($2, note_text) WHERE id = $2 RETURNING *", [newContent, noteId]);
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
    updateRepository
}