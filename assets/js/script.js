// Defined variables used

// keys to access api
var PRIV_KEY = "b62c40680e3ea3090a2462bc3021628651c2d45f";
var PUBLIC_KEY = "ab9297e9d4bda4ab94cb17eb9e3fe843";


  // function that makes api call and implements api key and hash
function getCharacterComic (heroInput) {

  // you need a new ts every request                                                                                    
  var ts = new Date().getTime();
  var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
  var characterChosen = heroInput;
  // the api deals a lot in ids rather than just the strings you want to use
  var characterName = characterChosen; // wolverine                                                                             
  var queryParams = `ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&name=${characterName}`;
  var url = `https://gateway.marvel.com/v1/public/characters?${queryParams}`;
  console.log(url);
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    //   var charactersId = data.data.results[0].id;
    //   heroDisplayed.textContent = data.data.results[0].name;
    //   heroDisplayed.style.color = "white";
    //   var newParams = `ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&characters=${charactersId}`;
    //   characterUrl = `https://gateway.marvel.com/v1/public/comics?${newParams}`;
    //   fetch(characterUrl)
    //     .then(function (response) {
    //       return response.json();
    //     })
    //     .then (function (newdata) {
          

    //     })
        
    });
}

  