// Defined variables used
const characterSearched = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const goBackBtn = document.querySelector("#go-back");
const moreBtn = document.querySelector("#more");
let level1 = document.querySelector("#level-1");
let level2 = document.querySelector("#level-2");
let modal = document.querySelector("#modal");
const closeBtn = document.querySelector("#close-btn");
let comicDescription = document.querySelector("#comic-description");
let comicImage = document.querySelector("#comic-image");
let comicCreators = document.querySelector("#comic-creators");
let comicTitle = document.querySelector("#comic-title");


// keys to access api
var PRIV_KEY = "b62c40680e3ea3090a2462bc3021628651c2d45f";
var PUBLIC_KEY = "ab9297e9d4bda4ab94cb17eb9e3fe843";
let thumbnails = document.querySelectorAll(".thumbnail");
// let characterImage = document.querySelector("");

const displayImages = (call, index) => {
  
  for(let i = 0; i < thumbnails.length; i++){
    thumbnails[i].setAttribute("src", call.data.results[i+index].thumbnail.path + '.jpg');
  }
};

const displayInfo = (call) => {
  let characterName = document.querySelector("#character-name");
  characterName.textContent = call.data.results[0].name;

};

const displaySelfie = (call) => {
  let characterImage = document.querySelector("#character-image");
  characterImage.setAttribute("src", call.data.results[0].thumbnail.path + ".jpg");
};

const comicDetails = (url, index) => {
  for(let i = 0; i < thumbnails.length; i++){
    thumbnails[i].addEventListener("click", ()=> {
      modal.classList.add("is-active");
      let image = url.data.results[i+index].thumbnail.path + ".jpg";
      let title = url.data.results[i+index].title;
      let description = url.data.results[i+index].description;
      comicImage.setAttribute("src", image);
      comicTitle.textContent = title;
      comicDescription.textContent = description;

    });
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
      displayInfo(data);
      displaySelfie(data);
      const charactersId = data.data.results[0].id;
      const newParams = `ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&characters=${charactersId}`;
      characterUrl = `https://gateway.marvel.com/v1/public/comics?${newParams}`;
      fetch(characterUrl)
        .then(function (response) {
          return response.json();
        })
        .then (function (newdata) {
          console.log(newdata);
          comicDetails(newdata, 0);
          displayImages(newdata, 0);
          

          moreBtn.addEventListener("click", ()=>{
            displayImages(newdata, 10);
            comicDetails(newdata, 10);
          });

          goBackBtn.addEventListener("click", () => {
            displayImages(newdata, 0);
            comicDetails(newdata, 0);
          });

          
        })
        
    });
}

searchButton.addEventListener("click", () =>{
  level1.classList.remove("levels");
  level2.classList.remove("levels");
  getCharacterComic(characterSearched.value);
});




closeBtn.addEventListener("click", ()=> {
  modal.classList.remove("is-active");
});

