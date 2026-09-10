const { registerService, loginService, refreshService } = require("../services/auth.service");

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

async function refreshController(req, res) {
    const { refreshToken } = req.body;

    const accessToken = await refreshService(refreshToken);

    res.status(200).json({
        accessToken: accessToken
    });
}

module.exports = {
    registerController,
    loginController,
    refreshController
}