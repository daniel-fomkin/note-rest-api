const { createRepository, deleteRepository } = require("../repositories/note.repository");

//Create
async function createService(title, text, owner){
    //Owner id validation
    if(!Number(owner) || owner <= 0){
        const err =  new Error("Owner id must be a positive number");
        err.status = 400;

        throw err;
    }

    //Title validation
    if(typeof title !== "string"){
        const err = new Error("Note title must be a string");
        err.status = 400;

        throw err;
    }

    if(!title.trim()){
        const err = new Error("Note title can't be empty");
        err.status = 400;

        throw err;
    }


    //Text validation
    if(typeof text !== "string"){
        const err = new Error("Note text must be a string");
        err.status = 400;

        throw err;
    }   
    
    if(!text.trim()){
        const err = new Error("Note text can't be empty");
        err.status = 400;
        
        throw err;
    }

    return await createRepository(title, text, owner);
}

//Read

//Update

//Delete
async function deleteService(noteId) {
    if(!Number(noteId) || noteId <= 0){
        const err =  new Error("Note id must be a positive number");
        err.status = 400;

        throw err;
    }

    const dbResponse = await deleteRepository(noteId);

    if(!dbResponse){
        const err = new Error("Note not found");
        err.status = 404;

        throw err;
    }
}

module.exports = {
    createService,
    deleteService
}