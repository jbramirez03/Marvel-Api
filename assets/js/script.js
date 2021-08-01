// Defined variables used
var resultBlocks = document.querySelectorAll(".results");
var resultsDescription = document.querySelectorAll(".description");
var imageBlocks = document.querySelectorAll(".image_result");
var characterInput = document.querySelector("#character-input");
var searchBtn = document.querySelector(".search_btn");
var thumbnails = document.querySelectorAll(".thumbnail");
var describedComic = document.querySelectorAll(".description-text");
var learnMoreBtns = document.querySelectorAll("#learn-btn");
var closeModalBtn = document.querySelector("#close-btn");
var comicDescribed = document.querySelector("#comic-description");
var comicCreator = document.querySelector(".comic-creator");
var comicCreators = document.querySelector(".comic-creators");
var goBackBtn = document.querySelector("#go-back");
var nextBtn = document.querySelector("#go-next");
var moreBtn = document.querySelector("#go-more");
var modalFooter = document.querySelector("#footer-modal");
var dom = document.getElementsByTagName("html");
var searchBar = document.querySelector(".search_bar");
var heroDisplayed = document.querySelector("#page-title");
var viewCounter = document.querySelector("#counter");

// keys to access api
var PRIV_KEY = "b62c40680e3ea3090a2462bc3021628651c2d45f";
var PUBLIC_KEY = "ab9297e9d4bda4ab94cb17eb9e3fe843";

// finds first 6 comics when enter button is clicked
searchBar.addEventListener("keyup", function(event){
  if(event.key === "Enter") {
    getCharacterComic(characterInput.value);
    searchBtn.classList.add("search_btn_clicked");
    dom[0].setAttribute("class", "search_results");
    for (var i = 0; i < learnMoreBtns.length; i++) {
      learnMoreBtns[i].setAttribute("class","show_previous");
    }
    characterInput.value = "";
  }
});

// finds first 6 comics when search bar button is pressed
searchBtn.addEventListener("click", function() {
  getCharacterComic(characterInput.value);
  searchBtn.classList.add("search_btn_clicked");
  dom[0].setAttribute("class", "search_results");
  for (var i = 0; i < learnMoreBtns.length; i++) {
    learnMoreBtns[i].setAttribute("class","show_previous");
  }
  characterInput.value = "";
});


// when the modal close button is pressed the modal is closed
closeModalBtn.addEventListener("click", function (){
  var modal = document.querySelector("#modal");
  modal.classList.remove("is-active");
});

// displays first 6 comics and each learn more button has content for each comic
function firstSix (url){

  searchBtn.classList.add("search_btn_clicked");
    nextBtn.setAttribute("class", "show_next");
    moreBtn.setAttribute("class", "show-more-button");
    goBackBtn.setAttribute("class", "go-back-button");

    for(var g = 0; g < resultBlocks.length; g++){
      comicTitle = url.data.results[g].title;
      describedComic[g].textContent = comicTitle;
      var imageUrl = url.data.results[g].thumbnail.path + ".jpg";
    thumbnails[g].setAttribute("src", imageUrl);
    }

  for (let j = 0; j < learnMoreBtns.length; j++) {
    learnMoreBtns[j].addEventListener("click", function(){
      var modalHtml = document.querySelector("#modal");
    modalHtml.classList.add("is-active");
    var comicSummary = url.data.results[j].description;
    var available = url.data.results[j].creators.available;
    comicCreators.innerHTML = '';
      if (comicSummary === null && available === 0) {
        comicDescribed.textContent = "No Comic description Available";
        comicCreators.textContent = "No Creators Listed";
        modalFooter.textContent = url.data.results[j].title;
      } else if (available === 0){
        modalFooter.textContent = url.data.results[j].title;
        comicDescribed.textContent = comicSummary;
        comicCreators.textContent = "No Creators Listed";
      } else if (comicSummary === null) {
        modalFooter.textContent = url.data.results[j].title;
        var creator = url.data.results[j].creators.items;
        for (let k = 0; k < creator.length; k++){
          var createdEL = document.createElement("p");
          createdEL.textContent = creator[k].name;
          comicCreators.append(createdEL);
        }
        comicDescribed.textContent = "No Comic Description Available";
      } else {
        modalFooter.textContent = url.data.results[j].title;
        var creator = url.data.results[j].creators.items;
        for (let k = 0; k < creator.length; k++){
          var createdEL = document.createElement("p");
          createdEL.textContent = creator[k].name;
          comicCreators.append(createdEL);
        }
        comicDescribed.textContent = comicSummary;
      }
      

    })
}

}

// displays next 6 comics with learn more button content updated
function moreComics (url, Index) {
  
            goBackBtn.setAttribute("class", "show_previous");
            nextBtn.setAttribute("class", "show-more-button");
            moreBtn.setAttribute("class", "show_next");
            for(var g = 0; g < resultBlocks.length; g++){
              comicTitle = url.data.results[g+Index].title;
              describedComic[g].textContent = comicTitle;
              var imageUrl = url.data.results[g+Index].thumbnail.path + ".jpg";
            thumbnails[g].setAttribute("src", imageUrl);
            }
            for (let j = 0; j < learnMoreBtns.length; j++) {
              learnMoreBtns[j].addEventListener("click", function(){
                var modalHtml = document.querySelector("#modal");
              modalHtml.classList.add("is-active");
              var comicSummary = url.data.results[j+Index].description;
              var available = url.data.results[j+Index].creators.available;
              comicCreators.innerHTML = '';
                if (comicSummary === null && available === 0) {
                  modalFooter.textContent = url.data.results[j+Index].title;
                  comicDescribed.textContent = "No Comic description Available";
                  comicCreators.textContent = "No Creators Listed";
                } else if (available === 0){
                  modalFooter.textContent = url.data.results[j+Index].title;
                  comicDescribed.textContent = comicSummary;
                  comicCreators.textContent = "No Creators Listed";
                } else if (comicSummary === null) {
                  modalFooter.textContent = url.data.results[j+Index].title;
                  var creator = url.data.results[j+Index].creators.items;
                  for (let k = 0; k < creator.length; k++){
                    var createdEL = document.createElement("p");
                    createdEL.textContent = creator[k].name;
                    comicCreators.append(createdEL);
                  }
                  comicDescribed.textContent = "No Comic Description Available";
                } else {
                  modalFooter.textContent = url.data.results[j+Index].title;
                  var creator = url.data.results[j+Index].creators.items;
                  for (let k = 0; k < creator.length; k++){
                    var createdEL = document.createElement("p");
                    createdEL.textContent = creator[k].name;
                    comicCreators.append(createdEL);
                  }
                  comicDescribed.textContent = comicSummary;
                }
                

              });
          }
          
}

// last six comics are displayed and learn more buttons content is updated
  function lastSix(url,Index){
    
    moreBtn.setAttribute("class", "show-more-button");
            for(var g = 0; g < resultBlocks.length; g++){
              comicTitle = url.data.results[g+Index].title;
              describedComic[g].textContent = comicTitle;
              var imageUrl = url.data.results[g+Index].thumbnail.path + ".jpg";
            thumbnails[g].setAttribute("src", imageUrl);
            }
            for (let j = 0; j < learnMoreBtns.length; j++) {
              learnMoreBtns[j].addEventListener("click", function(){
                var modalHtml = document.querySelector("#modal");
              modalHtml.classList.add("is-active");
              var comicSummary = url.data.results[j+Index].description;
              var available = url.data.results[j+Index].creators.available;
              comicCreators.innerHTML = '';
                if (comicSummary === null && available === 0) {
                  modalFooter.textContent = url.data.results[j+Index].title;
                  comicDescribed.textContent = "No Comic description Available";
                  comicCreators.textContent = "No Creators Listed";
                } else if (available === 0){
                  modalFooter.textContent = url.data.results[j+Index].title;
                  comicDescribed.textContent = comicSummary;
                  comicCreators.textContent = "No Creators Listed";
                } else if (comicSummary === null) {
                  modalFooter.textContent = url.data.results[j+Index].title;
                  var creator = url.data.results[j+Index].creators.items;
                  for (let k = 0; k < creator.length; k++){
                    var createdEL = document.createElement("p");
                    createdEL.textContent = creator[k].name;
                    comicCreators.append(createdEL);
                  }
                  comicDescribed.textContent = "No Comic Description Available";
                } else {
                  modalFooter.textContent = url.data.results[j+Index].title;
                  var creator = url.data.results[j+Index].creators.items;
                  for (let k = 0; k < creator.length; k++){
                    var createdEL = document.createElement("p");
                    createdEL.textContent = creator[k].name;
                    comicCreators.append(createdEL);
                  }
                  comicDescribed.textContent = comicSummary;
                }
                

              });
          }
          
  }

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
      var charactersId = data.data.results[0].id;
      heroDisplayed.textContent = data.data.results[0].name;
      heroDisplayed.style.color = "white";
      var newParams = `ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&characters=${charactersId}`;
      characterUrl = `https://gateway.marvel.com/v1/public/comics?${newParams}`;
      fetch(characterUrl)
        .then(function (response) {
          return response.json();
        })
        .then (function (newdata) {
          console.log(newdata);
        
          // when the api function is ran the first 6 comics are displayed by default
          firstSix(newdata);

          // when show more button is clicked next 6 comics display
          nextBtn.addEventListener("click", function (){
          moreComics(newdata,6);
          });
          
          // when more button is clicked last 6 comics are displayed
           moreBtn.addEventListener("click", function(){
          lastSix(newdata,12);
           });

          //  when go back button is pressed first 6 comics are displayed
           goBackBtn.addEventListener("click", function (){
          firstSix(newdata);
           });

        })
        // saves searched hero name in local storage
        setItems();
    });
}

  // hero name from last searched is saved in local storage
  function setItems (){
    localStorage.setItem("Hero",  heroDisplayed.textContent);
  }
  
  // function to run a new comic search with the last saved search hero name being the value used for the new search
  function showLastSearched (){
    var heroName = localStorage.getItem("Hero");

    if(heroName === null){
      return;
    } else {

    getCharacterComic(heroName);
    dom[0].setAttribute("class", "search_results");
    searchBtn.classList.add("search_btn_clicked");
    for (var i = 0; i < learnMoreBtns.length; i++) {
      learnMoreBtns[i].setAttribute("class","show_previous");
    }
  }
  }
  
  showLastSearched();