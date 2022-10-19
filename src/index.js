import axios from "axios"
import Notiflix from 'notiflix';
//comment to save
const API_KEY = '30699126-723906f358b47efc488aca811';

const getInput = document.querySelector(`input`);
let inputValue;
getInput.addEventListener(`input`, (event)=>{
    inputValue = event.target.value;
    console.log(inputValue);
    return inputValue;

});

const getButton =document.querySelector(`button`);

getButton.addEventListener(`click`, (event)=>{
    event.preventDefault();
    Notiflix.Notify.failure('Qui timide rogat docet negare');
    axios.get(`https://pixabay.com/api/key=${API_KEY}&q=${inputValue}&image_type=photo`)
    .then(response =>{
        response.request;
        console.log(response);
    })
    .catch(error=>{
        console.log(error);
    })


});
