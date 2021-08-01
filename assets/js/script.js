// Defined variables used
const characterSearched = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const goBackBtn = document.querySelector("#go-back");
const moreBtn = document.querySelector("#more");
const titles = document.querySelectorAll(".title");
// keys to access api
var PRIV_KEY = "b62c40680e3ea3090a2462bc3021628651c2d45f";
var PUBLIC_KEY = "ab9297e9d4bda4ab94cb17eb9e3fe843";
let thumbnails = document.querySelectorAll(".thumbnail");
// let characterImage = document.querySelector("");

const displayImages = (call, index) => {
  
  for(let i = 0; i < thumbnails.length; i++){
    thumbnails[i].setAttribute("src", call.data.results[i+index].images[0].path + '.jpg');
  }
};

const displayTitle = (call, index) => {
  for(let i = 0; i < titles.length; i++){
    titles[i].textContent = call.data.results[i +index].title;
  }
};



  // function that makes api call and implements api key and hash
function getCharacterComic (heroInput) {

  // you need a new ts every request                                                                                    
  const ts = new Date().getTime();
  const hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
  // the api deals a lot in ids rather than just the strings you want to use
  const characterName = heroInput; // wolverine                                                                             
  const queryParams = `ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&name=${characterName}`;
  const url = `https://gateway.marvel.com/v1/public/characters?${queryParams}`;
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
          displayImages(newdata, 0);
          displayTitle(newdata, 0);

          moreBtn.addEventListener("click", ()=>{
            displayImages(newdata, 6);
            displayTitle(newdata, 6)
          });



        })
        
    });
}

searchButton.addEventListener("click", () =>{
  getCharacterComic(characterSearched.value);
});

