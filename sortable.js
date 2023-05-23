//  let heroValubaleInformation

import { tableCreate, createRows } from './view-create.js';
import { search } from './search.js';
import { displayHeroes } from './display.js';
import { sortMixedField, sortSimpleField } from './sort.js';

export function seeThemAll() {
    //TODO put this in  functions in view-create.js these functions will return created elements
    const searcher = document.createElement('input');
    searcher.id = 'search';
    searcher.setAttribute('placeholder', 'Type name');
    document.body.appendChild(searcher);

    const labelSelectorPages = document.createElement('label');
    labelSelectorPages.id = 'labelSelectorPages';
    labelSelectorPages.setAttribute('for', 'selectPage');
    labelSelectorPages.textContent = 'Select number of pages';
    
    const selectPage = document.createElement('select');
    selectPage.id = 'selectPage';
    document.body.appendChild(labelSelectorPages);
    document.body.appendChild(selectPage);

    for (let pagesNumers of ['10', '20','50', '100', 'all results']){
        const option = document.createElement('option');
        option.id = `option-${pagesNumers}`;
        option.setAttribute('value', pagesNumers);
        option.textContent = pagesNumers;
        selectPage.appendChild(option);
    }
    document.getElementById('option-20').setAttribute('selected','');
    //----------------------------------------------------------------


    // Request the file with fetch, the data will downloaded to your browser cache.
    fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
        .then((response) => response.json()) // parse the response from JSON
        .then(loadData)  // .then will call the `loadData` function with the JSON value.

}


function loadData(heroes) {
    //const cons = document.getElementById('cons');

    const infoKeys = tableCreate();

    let heroesValubaleInformations = heroes.map(hero => {
        //cons.textContent = hero.appearance.height.constructor.name + ' ' + hero.appearance.weight[1];

        const info = new Map();
        info.set('id', hero.id);
        info.set('icon', hero.images.xs);
        info.set('name', hero.name);
        info.set('fullname', hero.biography.fullName);
        info.set('powerstats_intelligence', hero.powerstats.intelligence);
        info.set('powerstats_strength', hero.powerstats.strength);
        info.set('powerstats_speed', hero.powerstats.speed);
        info.set('powerstats_durability', hero.powerstats.durability);
        info.set('powerstats_power', hero.powerstats.power);
        info.set('powerstats_combat', hero.powerstats.combat);
        info.set('race', hero.appearance.race);
        info.set('gender', hero.appearance.gender);
        info.set('height', hero.appearance.height[1]);
        info.set('weight', hero.appearance.weight[1]);
        info.set('placeofbirth', hero.biography.placeOfBirth);
        info.set('alignment', hero.biography.alignment);

        return info;
    });

    let rowsNum = 5;
    const tbody = document.getElementById('tbody');
    createRows(0, rowsNum, tbody, infoKeys);
    //const trs = tbody.querySelectorAll('tr');
    displayHeroes(heroesValubaleInformations.slice(0, rowsNum), tbody, rowsNum, infoKeys);
    search(heroesValubaleInformations, tbody, rowsNum, infoKeys)

    //TODO displaying in multiple pages- DONE -------------------------------------//

    const paginationContainer = document.getElementById('pagination-container');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    let currentPage=1;  
    prevButton.disabled = true;
    const totalPages = Math.ceil(heroesValubaleInformations.length / rowsNum);

    // Function to display heroes on the current page
    function displayCurrentPage() {
        const startNum = (currentPage - 1) * rowsNum;
        const endNum = startNum + rowsNum;
        displayHeroes(heroesValubaleInformations.slice(startNum, endNum), tbody, rowsNum, infoKeys);
    }

    // Function to update pagination buttons' disabled state
    function updatePaginationButtons() {
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }

    // Display heroes on the initial page
    displayCurrentPage();

    // Add event listeners for pagination buttons
    prevButton.addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--;
            displayCurrentPage();
            updatePaginationButtons();
        }
    });
    nextButton.addEventListener('click', function () {
        if (currentPage < totalPages) {
            currentPage++;
            displayCurrentPage();
            updatePaginationButtons();
        }
    });
    //-----------------------------------------------------------------------------//

    // TODO sort filtered heroes (those ones that are displayed after the search)
    let sortedField = 'name';
    let sign = 1;
    document.getElementById(`thead`).addEventListener('click', event => {
        const field = event.target.id.slice(3); // get the property of a hero from a table header
        if (field === sortedField) { sign = -1 * sign; } else { sign = 1; }
        if (field === 'height' || field === 'weight') {
            heroesValubaleInformations = sortMixedField(heroesValubaleInformations, field, sign);
        } else if (infoKeys.includes(field)) {
            heroesValubaleInformations = sortSimpleField(heroesValubaleInformations, field, sign);
        }
        sortedField = field;
        displayHeroes(heroesValubaleInformations.slice(0, rowsNum), tbody, rowsNum, infoKeys);
        currentPage=1;  prevButton.disabled = true;
    });

}


//-----------------------------------------------------------------------------//

