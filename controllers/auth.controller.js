const { registerService } = require("../services/auth.service");

async function registerController(req, res) {
    const { email, username, password } = req.body;

    await registerService(email, username, password);

    res.status(201).json({
        message: "Account succeful created."   
    })
}

module.exports = {
    registerController
}