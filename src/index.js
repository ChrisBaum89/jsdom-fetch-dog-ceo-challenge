let breeds = [];

document.addEventListener('DOMContentLoaded', function () {
  dogImageLoad()
  dogBreedLoad()
});

function dogImageLoad() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  fetch(imgUrl)
    .then(res => res.json())
    .then(results => {
      results.message.forEach(image => addDogImages(imgUrl))
    });
}

function addDogImages(imageUrl){
  let container = document.querySelector('#dog-image-container');
  let newImage = document.createElement('img');
  newImage.src = imageUrl;
  container.appendChild(newImage);
}

function dogBreedLoad(){
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  fetch(breedUrl)
    .then(res => res.json())
    .then (results => {
      breeds = Object.keys(results.message)
      breeds.forEach(breed => addBreed(breed));
    })
  let letterDropdown = document.querySelector(`select#breed-dropdown`)
  letterDropdown.addEventListener('change', byLetter => filterBreeds(event.target.value))
}

function addBreed(breed){
  let ul = document.querySelector(`#dog-breeds`)
  let li = document.createElement('li')
  li.innerText = breed;
  ul.appendChild(li)
  li.addEventListener('click', changeColor => event.target.style.color = "red");
}

function filterBreeds(letter) {
  filteredBreeds = []
  for (let i = 0; i < breeds.length; i++){
    if (breeds[i].charAt(0) == letter){
      filteredBreeds = [...filteredBreeds,breeds[i]]
    }
  }
  removeBreeds()
  filteredBreeds.forEach(breed => addBreed(breed))
}

function removeBreeds(){
  let ul = document.querySelector(`#dog-breeds`)
  let child = ul.lastElementChild;
  while (child) {
    ul.removeChild(child);
    child = ul.lastElementChild;
  }
}
