const { createRepository, deleteRepository, updateRepository, readRepository, paginationRepository } = require("../repositories/note.repository");
const { stringValidation, idValidation, allEmptyValidation, dbNotFound, isPositiveNumber } = require("../validators/note.validator");

//Create
async function createService(title, text, owner) {
    //Owner id validation
    idValidation(owner, "Owner");

    //Title validation
    stringValidation(title, "Title");

    //Text validation
    stringValidation(text, "Text")

    return await createRepository(title, text, owner);
}

//Read
async function readService(userId, limit, offset) {
    idValidation(userId, "User");

    if(limit !== undefined && offset !== undefined && isPositiveNumber(limit) && isPositiveNumber(offset) && limit <= 100){
        const dbResponse = await paginationRepository(userId, limit, offset);
        
        return dbResponse;
    }

    const dbReponse = await readRepository(userId);

    return dbReponse
}

//Update
async function updateService(noteId, newTitle, newText, userId) {
    idValidation(noteId, "Note");
    allEmptyValidation([newTitle, newText], ["title", "text"]);

    if(newTitle !== undefined){
        stringValidation(newTitle, "Title");
    }
    else{
        stringValidation(newText, "Text");
    }

    const dbReponse = await updateRepository(noteId, newText, newTitle, userId);

    dbNotFound(dbReponse, "Note");
}


//Delete
async function deleteService(noteId, userId) {
    idValidation(noteId, "Note");

    const dbResponse = await deleteRepository(noteId, userId);

    dbNotFound(dbResponse, "Note");
}

module.exports = {
    createService,
    deleteService,
    updateService,
    readService
}