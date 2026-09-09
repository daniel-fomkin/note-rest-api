const { createService, deleteService, updateService, readService } = require("../services/note.service");

//Create
async function createController(req, res) {
    const { title, text, owner } = req.body;

    const dbResponse = await createService(title, text, owner);

    res.status(201).json(await dbResponse);

}

//Read
async function readController(req, res) {
    const { userId } = req.params;
    
    const notes = await readService(userId);

    res.json(notes);
}

//Update
async function updateController(req, res) {
    const { note, title, text } = req.body;
    await updateService(note, title, text);

    res.status(200).send("OK")
}
//Delete
async function deleteController(req, res) {
    const { note } = req.body;

    await deleteService(note);
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