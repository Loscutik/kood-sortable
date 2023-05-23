import { displayHeroes } from './display.js';

// implements searching in heroesInfo by hero's name. 
// tablBody, maxRowsNumber, infoKeys are here to run displayHeroes function after filtering.
export function search(heroesInfo, tablBody, maxRowsNumber, infoKeys) {
    search = document.getElementById('search')
    search.addEventListener('input', (e) => {
        let textForSearch = e.target.value;
        let heroes = heroesInfo.filter(hero => {
            return hero.get('name').toLowerCase().includes(textForSearch.toLowerCase())
        });

        displayHeroes(heroes.slice(0, maxRowsNumber), tablBody, maxRowsNumber, infoKeys);

    });
}

