const { createRepository, deleteRepository, updateRepository } = require("../repositories/note.repository");
const { stringValidation, idValidation, allEmptyValidation, dbNotFound } = require("../validators/note.validator");

//Create
async function createService(title, text, owner){
    //Owner id validation
    idValidation(owner, "Owner");

    //Title validation
    stringValidation(title, "Title");


    //Text validation
    stringValidation(text, "Text")

    return await createRepository(title, text, owner);
}

//Read

//Update
async function updateService(noteId, newTitle, newText) {
    idValidation(noteId, "Note");
    allEmptyValidation([newTitle, newText], ["title", "text"]);

    if(newTitle !== undefined){
        stringValidation(newTitle, "Title");
        const dbReponse = await updateRepository(noteId, newTitle);
        
        dbNotFound(dbReponse, "Note");
    }

    if(newText !== undefined){
        stringValidation(newText, "Text");
        const dbReponse = await updateRepository(noteId, newText);
        
        dbNotFound(dbReponse, "Note");
    }
}


//Delete
async function deleteService(noteId) {
    idValidation(noteId, "Note");

    const dbResponse = await deleteRepository(noteId);

    dbNotFound(dbResponse, "Note");
}

module.exports = {
    createService,
    deleteService,
    updateService
}