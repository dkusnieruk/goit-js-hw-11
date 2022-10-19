import axios from "axios"
import Notiflix from 'notiflix';
//comment to save
const API_KEY = '30699126-723906f358b47efc488aca811';
const getGallery= document.querySelectorAll(`div`)[1];
console.log(getGallery);
getGallery.value = `Stefi`
const getInput = document.querySelector(`input`);
let inputValue;
getInput.addEventListener(`input`, (event)=>{
    inputValue = event.target.value;
    console.log(inputValue);
    return inputValue;

});

const getButton =document.querySelector(`button`);
let options;
getButton.addEventListener(`click`, async (event)=>{
    event.preventDefault();
    Notiflix.Notify.failure('Qui timide rogat docet negare');
    await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${inputValue}&image_type=photo`)
    .then( response=>{
        return response.data.hits
    })
    .then( data =>{

        console.log(data);
      for (let el=0; el<data.length; el++){
        options += `<div class="photo-card">
        <img src="${data[el].previewURL}" alt="" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes: ${data[el].likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${data[el].views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${data[el].comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${data[el].downloads}</b>
          </p>
        </div>
      </div>`
      }
      getGallery.innerHTML = options;
    })

    .catch(error=>{
        console.log(error);
    })

});

