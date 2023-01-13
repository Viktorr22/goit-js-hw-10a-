// https://restcountries.com/v3.1/name/
import { fetchCountries } from './fetchCountries'
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import './css/styles.css';
const DEBOUNCE_DELAY = 300;


const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');

input.addEventListener("input", debounce(onInputText, DEBOUNCE_DELAY)); 

function onInputText(evt) {
    const inputValue = evt.target.value.trim();
    if (!inputValue) {
        list.innerHTML = '';
        return;
     }
    fetchCountries(inputValue)
        .then(data => createMarkup(data))
        .catch(err => console.log(err));

}

function createMarkup(e) {
    if (e.length > 10) {
         Notiflix.Notify.info("Too many matches found. Please enter a more specific name."); 
         return;
    }
    else if (e.length === 1) {
       const markupList = ` <li class = "list-item-js">
                                  <img src="${e[0].flags.svg}" alt="flag" width = 20 height = 20 />
                                   <h2 class = "title">${e[0].name.official}</h2>
                            </li>`;
        list.innerHTML = markupList;
        
        const langValue = Object.values(e[0].languages).join(', ');
        const markupBox = `<p class="country-info-text">Capital:<span class="country-info-value"> ${e[0].capital.join('')}</span></p>
                           <p class="country-info-text">Population:<span class="country-info-value"> ${e[0].population}</span></p>
                           <p class="country-info-text">Language:<span class="country-info-value"> ${langValue}</span></p>`
        list.insertAdjacentHTML("beforeend", markupBox);
        
    }
   
    else if (e.length > 2) {
           list.innerHTML = '';
           e.forEach((e) => {
                           const markup = ` <li class = "list-item-js">
                                  <img src="${e.flags.svg}" alt="flag" width = 20 height = 20 />
                                   <h2 class = "title-list">${e.name.official}</h2>
                                  </li>`;
               list.insertAdjacentHTML("beforeend", markup);
               
           });    
       
    }   
 
    
}











