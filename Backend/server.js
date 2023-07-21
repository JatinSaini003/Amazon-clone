const express = require('express');
const dotenv = require('dotenv');
const App = express();

dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 5000;
require("./DataBase/connection");

App.use(require('./Router/Routes'));

App.listen(PORT, () => {
    console.log(`server is running at PORT ${PORT}`)
});