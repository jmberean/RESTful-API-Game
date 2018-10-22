const express = require('express');
const game = require('./game/controller');

const app = express();

const port = 3000;
const server = "localhost";

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/", express.static(__dirname + "/../dist/"));
app.use('/game', game);

app.listen(port);

// eslint-disable-next-line no-console
console.log(`listening on: http://${server}:${port}`);