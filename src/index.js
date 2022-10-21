import axios from "axios"
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
//comment to save
const API_KEY = '30699126-723906f358b47efc488aca811';
const getGallery= document.querySelectorAll(`div`)[1];
const getButton2= document.getElementsByClassName("load-more")[0];

getButton2.style.display= `none`;
console.log(getButton2);
console.log(getGallery);

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
    let totalHits="";
    let counter=0;
    getButton2.style.display=`block`;
    
    getButton2.addEventListener(`click`, (event)=>{
    
    counter++;
    console.log(counter);
    localStorage.setItem(`getCounter`,+counter)

})
    
   
    await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${inputValue}&image_type=photo&per_page=40&page=1`)
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
     
    //  let gallery2 = new SimpleLightbox('.gallery a',{captionsData:`alt`,captionDelay:250, swipeClose:true,});
    //  gallery.on('show.simplelightbox', function () {
         
    //  })
    //  let getButton2 = document.createElement(`button`);
    //     getButton2.innerText ="Load more";
    //     getButton2.type= `button`;
    //     getButton2.setAttribute(`class`, `load-more`);
    //     document.body.appendChild(getButton2);

        // let counter=0;
        // getButton2.addEventListener(`click`, (event)=>{
        //   counter++
        //   console.log(counter);
            
        // })
        
    }
    let gallery2 = new SimpleLightbox('.gallery a',{captionsData:`alt`,captionDelay:250, swipeClose:true,});
    gallery.on('show.simplelightbox', function () {
        
    })

    
    })

    .catch(error=>{
        console.log(error);
    })

});

