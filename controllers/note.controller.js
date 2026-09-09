const { createService } = require("../services/note.service");

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

module.exports = {
    createController
}