<template>
<div>
    <div class="alert alert-success">
        Yay we have a game!
    </div>

    <div class="row">
        <div class="col-md-4">
            <div class="card" >
                    <h5 class="card-header">
                        Players
                        <a @click.prevent="login" class="btn btn-sm btn-primary" :class="{disabled: playerId() !== null}">+</a>
                        <i v-if="playerId() !== null">(Welcome {{state.players[playerId()].name}})</i>
                    </h5>
                    <ul class="list-group list-group-flush">
                        <li v-for="p in state.players" :key="p.id"
                            class="list-group-item">
                            <img :src="`https://graph.facebook.com/${p.fbid}/picture`" />
                            <h5>{{p.name}}</h5>
                            <span v-if="p.id == state.dealerId" class="badge badge-success">
                                Dealer
                            </span> &nbsp;
                            <span class="badge badge-primary badge-pill">{{p.score}}</span>
                        </li>
 
                    </ul>
            </div>
            <div class="card" >
                <h5 class="card-header">My Captions</h5>
                <ul class="list-group list-group-flush">
                    <li v-for="c in myCaptions" :key="c"
                        @click.prevent="submitCaption(c)"
                        class="list-group-item">{{c}}</li>
                </ul>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card" >
                <img class="card-img" :src="state.picture.url" :alt="state.picture.name">
                <div class="btn-group " style="width:100%" role="group" aria-label="Basic example">
                    <a @click.prevent="flipPicture" class="btn btn-primary">Flip Picture</a>
                    <a @click.prevent="getFBPictures" class="btn btn-secondary">From FB</a>
                </div>
                <PicturePicker :pictures="fbPictures" ></PicturePicker>
                <picture-taker></picture-taker>            
            </div>
        </div>
        <div class="col-md-4">
            <div class="card" >
                <h5 class="card-header">Played Captions</h5>
                <ul class="list-group list-group-flush">
                    <li v-for="c in state.playedCaptions" :key="c.text"
                        class="list-group-item" :class="{ 'list-group-item-warning' : c.isChosen }">
                        {{c.text }}
                        <a  v-if="isDealer"
                            @click.prevent="chooseCaption(c)"
                            class="btn btn-primary btn-sm">Choose</a>
                        <span class="badge" :class="c.playerName ? 'badge-success' : 'badge-secondary'">
                            {{c.playerName || 'Hidden'}}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
</template>

<style lang="scss">
    li.list-group-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        img {
            width: 30px; height: 30px;
            margin-right: 5px;
        }
        h5 {
            flex-grow: 1;
        }
    }
</style>

<script>
import * as api from '@/services/api_access';
import * as fb from '@/services/facebook';
import PicturePicker from '@/components/PicturePicker';
// eslint-disable-next-line
let loopTimer = null;

export default {
    data(){
        return {
            state: {
                picture: "",
                players: [],
                playedCaptions: [],
            },
            myCaptions: [],
            fbPictures: []
        }
    },
    created(){
        loopTimer = setInterval(this.refresh, 1000);
        if(api.playerId !== null && this.myCaptions.length == 0){
            api.GetMyCaptions().then(x=> this.myCaptions = x);
        }
    },
    methods: {
        refresh(){
            api.GetState()
            .then(x=> this.state = x)
        },
        getFBPictures(){
            fb.GetPhotos( photos => this.fbPictures = photos.data );
        },
        flipPicture(){
            api.FlipPicture()
        },
        login() {
            fb.FBLogin();
            //.then(()=> api.GetMyCaptions().then(x=> this.myCaptions = x) )
        },
        submitCaption(c){
            api.SubmitCaption(c)
            .then(x=> {
                this.myCaptions.splice(this.myCaptions.indexOf(c), 1);
                this.myCaptions.push(x[0]);
            })
        },
        chooseCaption(c){
            api.ChooseCaption(c)
        },

        playerId: ()=> api.playerId
    },
    computed: {
        isDealer(){
            return this.playerId() == this.state.dealerId;
        }
    },
    components: {
        PicturePicker
    }
}
</script>
