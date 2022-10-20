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

getButton.addEventListener(`click`, async (event)=>{
    event.preventDefault();
    let options="";
    await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${inputValue}&image_type=photo`)
    .then( response=>{
        return response.data.hits
    })
    .then( data =>{
        console.log(data);
        if (data.length ===0){
            Notiflix.Notify.warning(
                "Sorry, there are no images matching your search query. Please try again.",
                {
                width:`500px`,
                useFontAwesome: true,
                warning: {
                    background: `red`,
                    textColor:`white`,
                }
                },
              )
        } else {   
      for (let el=0; el<data.length; el++){
        options += `<div class="photo-card">
        <img src="${data[el].webformatURL}" alt="${data[el].tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes:<br> ${data[el].likes}</b>
          </p>
          <p class="info-item">
            <b>Views:<br> ${data[el].views}</b>
          </p>
          <p class="info-item">
            <b>Comments:<br> ${data[el].comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads:<br> ${data[el].downloads}</b>
          </p>
        </div>
      </div>`
      }
     getGallery.innerHTML = options;
     console.log(getGallery);
        }
      
   
    })

    .catch(error=>{
        console.log(error);
    })

});

