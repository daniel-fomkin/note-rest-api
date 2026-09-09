const { registerService, loginService } = require("../services/auth.service");

async function registerController(req, res) {
    const { email, username, password } = req.body;

    await registerService(email, username, password);

    res.status(201).json({
        message: "Account succeful created."   
    })
}

async function loginController(req, res) {
    const {username, password} = req.body;

    const tokens = await loginService(username, password);


    res.status(200).json(tokens);
}

module.exports = {
    registerController,
    loginController
}