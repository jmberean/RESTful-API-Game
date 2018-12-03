const express = require('express');
const { Game, Player} = require('./model');

var game = new Game();

const app = express.Router();


app.get("/", function(req, res){
    res.send({...game, playedCaptions: game.getPlayedCaptions()});
})
app.get("/captions/:id", function(req, res){
    res.send(game.players[req.params.id].captions());
})

app.post('/players', (req, res) => {
    const player = new Player(req.body.name, game.players.length);
    game.players.push(player);
    res.send(player);
})
app.post('/picture', (req, res) => {
    var playerId = req.header("playerId");
    game.flipPicture(playerId);
    res.send(game.picture);
})
app.post('/playedCaptions', (req, res) => {
    var playerId = req.header("playerId");
    let newCard = game.submitCaption(playerId, req.body.text )
    res.send(newCard);
})
app.post('/playedCaptions/choose', (req, res) => {
    var playerId = req.header("playerId");
    game.chooseCaption(playerId, req.body.text);
    res.send(req.body.text);
})

module.exports = app;