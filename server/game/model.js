const captions  = require('./captions');
const picture_loader  = require('./pictures');

let pictures = [];
picture_loader().then(x=> 
    pictures = x
);
let iCaptions = 0;
let iPicture = 0;

class Game {
    constructor(){
        this.picture = "";
        this.players = [];
        this.playedCaptions = [];
        this.dealerId = 0;
        this.isDealer = (id)=> id == this.dealerId;
    } 

    getPlayedCaptions(){
        if(this.playedCaptions.some(x=> x.isChosen)){
            return  this.playedCaptions.map(x=> ({ ...x, playerName: this.players[x.playerId].name }));;
        }else{
            return this.playedCaptions.map(x=> ({ ...x, playerId: null }));
        }
    }
    flipPicture(playerId){
        if(!this.isDealer(playerId)) { throw new Error("Only the dealer can flip a picture")}
        this.picture = pictures[(iPicture++) % pictures.length];
    }
    submitCaption(playerId, text){
        if(this.isDealer(playerId)) { throw new Error("The dealer cannot submit a caption")}
        this.playedCaptions.push({ playerId: playerId, text: text, isChosen: false })
        let playersCaptions = this.players[playerId].captions();
        playersCaptions.splice(playersCaptions.indexOf( text ) ,1);
        playersCaptions.push(captions[iCaptions += 1])
        return playersCaptions[playersCaptions.length - 1]
    }
    chooseCaption(playerId, text){
        if(!this.isDealer(playerId)) { throw new Error("Only the dealer can choose a caption")}
        const chosenCaption = this.playedCaptions.find(x=> x.text == text)
        chosenCaption.isChosen = true;
        this.players[chosenCaption.playerId].score++;
        this.dealerId = (this.dealerId + 1) % this.players.length;
    }
}

class Player{
    constructor(name, id){
        let _Captions = captions.slice(iCaptions, iCaptions += 7);

        this.id = id;
        this.name = name;
        this.score = 0;
        this.captions = () => _Captions;


    }
}

module.exports = {
    Player, Game
}