const api_root = process.env.VUE_APP_API_ROOT;
export let playerId = null;

export function GetState(){
    return myFetch(api_root + "/");
}
export function GetMyCaptions(){
    return myFetch(api_root + `/captions/${playerId}`);
}
export function Login(name, fbid, access_token){
    return myFetch(api_root + `/players`, { name, fbid, access_token })
            .then(x=> playerId = x.id);
}
export function FlipPicture(){
    return myFetch(api_root + "/picture", {})
}

export function SubmitCaption(c){
    return myFetch(api_root + "/playedCaptions", {text: c})
}
export function ChooseCaption(c){
    return myFetch(api_root + "/playedCaptions/choose",  {text: c.text})
}





  function myFetch(url = ``, data = null) {
      let options = {
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, same-origin, *omit
            headers: {
                playerId: playerId
            }
      };
      if(data){
          options = { 
            ...options,
            method:  "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                ...options.headers,
                "Content-Type": "application/json; charset=utf-8",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
          };
      }
      return fetch(url, options)
      .then(response =>{
        return response.json()
      }); // parses response to JSON
  }