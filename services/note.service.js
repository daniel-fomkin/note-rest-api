const { createRepository } = require("../repositories/note.repository");

async function createService(title, text, owner){
    //Owner id validation
    if(!owner){
        const err = new Error("Owner id can't be empty");
        err.status = 400;
        throw err
    }

    if(!Number(owner)){
        const err =  new Error("Owner id must be a number");
        err.status = 400;

        throw err;
    }

    //Title validation
    if(!title.trim()){
        const err = new Error("Note title can't be empty");
        err.status = 400;

        throw err;
    }

    if(!typeof title == "string"){
        const err = new Error("Note title must be a string");
        err.status = 400;

        throw err;
    }

    //Text validation
    if(!text.trim()){
        const err = new Error("Note text can't be empty");
        err.status = 400;
        
        throw err;
    }

    if(!typeof text == "string"){
        const err = new Error("Note text must be a string");
        err.status = 400;

        throw err;
    }

    return await createRepository(title, text, owner);
}

module.exports = {
    createService
}