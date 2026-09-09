const { createService, deleteService } = require("../services/note.service");

//Create
async function createController(req, res){
    try{
        const { title, text, owner } = req.body;

        const dbResponse = await createService(title, text, owner);

        res.status(201).json(await dbResponse);
    }    
    catch(err){

        res.status(500)

        if(err.status){
            res.status(err.status)
        }

        res.json({
            message: err.message
        })
    }

}

//Read

//Update

//Delete
async function deleteController(req, res) {
    try{
        const { note } = req.body;

        await deleteService(note)

        res.status(200).json({
            message: "Succeful deleted"
        })

    }
    catch(err){
        res.status(500);

        if(err.status){
            res.status(err.status);
        }

        res.json({
            message: err.message
        });
    }
}

module.exports = {
    createController,
    deleteController
}