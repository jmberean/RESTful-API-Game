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
    const player = game.login(req.body.name, req.body.fbid, req.body.access_token)
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
    res.send([ newCard ]);
})
app.post('/playedCaptions/choose', (req, res) => {
    var playerId = req.header("playerId");
    game.chooseCaption(playerId, req.body.text);
    res.send(req.body.text);
})

module.exports = app;