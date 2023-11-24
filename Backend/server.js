const express = require('express');
const dotenv = require("dotenv");
const bodyParser = require("body-parser")
const cors = require('cors')
const authJWT = require('./Middlewares/jwt')
const errorhandler = require('./Middlewares/error-handler')
const App = express();

App.use(cors());
App.options('*', cors());

dotenv.config({ path: "./config.env" });
require("./DataBase/connection");

//Endpoint Variables
const PORT = process.env.PORT || 5000;

//Middlewares
App.use(bodyParser.json());
App.use(authJWT())
App.use('/Public/uploads', express.static(__dirname + '/Public/uploads'))
// App.use(errorhandler())


//Routes
const categoriesRoute = require('./Router/Categories');
const ordersRoute = require('./Router/Orders');
const productsRoute = require('./Router/Products');
const usersRoute = require('./Router/Users');

App.use('/categories', categoriesRoute);
App.use('/products', productsRoute);
App.use('/orders', ordersRoute);
App.use('/users', usersRoute);


App.listen(PORT, () => {
    console.log(`server is running at PORT ${PORT}`)
});