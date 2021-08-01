// Defined variables used
const characterSearched = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
// keys to access api
var PRIV_KEY = "b62c40680e3ea3090a2462bc3021628651c2d45f";
var PUBLIC_KEY = "ab9297e9d4bda4ab94cb17eb9e3fe843";





  // function that makes api call and implements api key and hash
function getCharacterComic (heroInput) {

  // you need a new ts every request                                                                                    
  var ts = new Date().getTime();
  var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
  // the api deals a lot in ids rather than just the strings you want to use
  var characterName = heroInput; // wolverine                                                                             
  var queryParams = `ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&name=${characterName}`;
  var url = `https://gateway.marvel.com/v1/public/characters?${queryParams}`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      const charactersId = data.data.results[0].id;
      const newParams = `ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&characters=${charactersId}`;
      characterUrl = `https://gateway.marvel.com/v1/public/comics?${newParams}`;
      fetch(characterUrl)
        .then(function (response) {
          return response.json();
        })
        .then (function (newdata) {
          console.log(newdata);

        })
        
    });
}

searchButton.addEventListener("click", () =>{
  getCharacterComic(characterSearched.value);
});