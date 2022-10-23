import axios from "axios"
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const API_KEY = '30699126-723906f358b47efc488aca811';
const getGallery= document.querySelectorAll(`div`)[1];
const getButton2= document.getElementsByClassName("load-more")[0];


getButton2.style.display= `none`;

const getInput = document.querySelector(`input`);
let inputValue;

getInput.addEventListener(`input`, (event)=>{
    inputValue = event.target.value;
    return inputValue;
});

const getButton =document.querySelector(`button`);

//first event handler search button
getButton.addEventListener(`click`, async (event)=>{
    event.preventDefault();
    let options="";
    let counter =1;
    getButton2.style.display=`block`;
        
    await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${inputValue}&image_type=photo&per_page=40&page=${counter}`)
    .then( response=>{
            

        localStorage.setItem(`totalHits`, response.data.totalHits)
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
            getGallery.style.display=`none`;
        } else {  
            getGallery.style.display=`flex`;
            Notiflix.Notify.success(`Hooray ! We found a total of ${localStorage.getItem(`totalHits`)}  hits`); 
      
            for (let el=0; el<data.length; el++){
        options += `<div class="photo-card">
        <a href =${data[el].largeImageURL}>
        <img src="${data[el].webformatURL}" alt="${data[el].tags}" loading="lazy" />
        </a>
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
     
    }
    })

    .catch(error=>{
        console.log(error);
    })

    //simplelightbox
    let gallery = new SimpleLightbox('.gallery a',{captionsData:`alt`,captionDelay:250, swipeClose:true,});
    gallery.on('show.simplelightbox', function () {
    gallery.refresh();        
    })

});

let counter = 1;

//second event handler show more button
getButton2.addEventListener(`click`, (event)=>{
    event.preventDefault();
    let options="";
    counter++
    console.log();
    getButton2.style.display=`block`;
        
    axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${inputValue}&image_type=photo&per_page=40&page=${counter}`)
    .then( response=>{
            

        localStorage.setItem(`totalHits`, response.data.totalHits)
        return response.data.hits
        
    })
    .then( data =>{
        console.log(data);

        if (data.length ===0){
            Notiflix.Notify.warning(
                "We're sorry, but you've reached the end of search results.",
                {
                width:`500px`,
                useFontAwesome: true,
                warning: {
                    background: `red`,
                    textColor:`white`,
                }
                },
              )
            getGallery.style.display=`none`;
        } else {  
            getGallery.style.display=`flex`;   
            for (let el=0; el<data.length; el++){
        options += `<div class="photo-card">
        <a href =${data[el].largeImageURL}>
        <img src="${data[el].webformatURL}" alt="${data[el].tags}" loading="lazy" />
        </a>
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
     getGallery.innerHTML += options;
     
    }

    //simple lightbox refresh
    let gallery = new SimpleLightbox('.gallery a',{captionsData:`alt`,captionDelay:250, swipeClose:true,});
    gallery.on('show.simplelightbox', function () {
    gallery.refresh();        
    })

    })

    .catch(error=>{
        console.log(error);
    })
    

});

