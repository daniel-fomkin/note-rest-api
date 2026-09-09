const app = require("./app");
const env = require("dotenv");

env.config();

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Sever is listening on port ${PORT}`);
});