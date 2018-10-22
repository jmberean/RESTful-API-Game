var axios = require("axios");

module.exports = () =>
    axios.get('https://api.imgflip.com/get_memes')
    .then( response => response.data.data.memes );