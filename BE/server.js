const express = require("express");
const server = express();
const port = 8000;
const cors = require('cors')
const bodyParser = require("body-parser");
const router = require("./src/route");


server.use(cors({
    origin:'http://localhost:3000'
}))
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(router);
server.listen(port, () => console.log(`server running on port ${port}`));
