const { createService, deleteService, updateService, readService } = require("../services/note.service");

//Create
async function createController(req, res) {
    const { title, text } = req.body;

    const userId = req.user.sub;

    const dbResponse = await createService(title, text, userId);

    res.status(201).json(dbResponse);

}

//Read
async function readController(req, res) {
    const userId = req.user.sub;
    
    const notes = await readService(userId);

    res.json(notes);
}

//Update
async function updateController(req, res) {
    const { note, title, text } = req.body;

    const userId = req.user.sub;

    await updateService(note, title, text, userId);

    res.status(200).send("OK")
}
//Delete
async function deleteController(req, res) {
    const { note } = req.body;

    const userId = req.user.sub;

    await deleteService(note, userId);

    res.status(200).json({
        message: "Succeful deleted"
    })
}

module.exports = {
    createController,
    deleteController,
    updateController,
    readController
}