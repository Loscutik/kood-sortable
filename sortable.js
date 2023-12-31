//  let heroValubaleInformation

import { tableCreate, createRows, headerCreate, fillSearchOptions } from './view-create.js';
import { displayHeroes } from './display.js';
import { sortMixedField, sortSimpleField } from './sort.js';
import { INIT_ROWS_NUMBER, INIT_SEARCH_FIELD } from './sortable.data.js';
import { Operations, changeSearchParamsInUrl } from './search.js';


export function seeThemAll() {

    headerCreate();
    const infoKeys = tableCreate();
    fillSearchOptions(infoKeys, INIT_SEARCH_FIELD);

    // Request the file with fetch, the data will downloaded to your browser cache.
    fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
        .then((response) => response.json()) // parse the response from JSON
        .then(loadData)  // .then will call the `loadData` function with the JSON value.




    function loadData(heroes) {
        //const cons = document.getElementById('cons');



        const heroesValubaleInformations = heroes.map(hero => {
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

        let rowsNum = INIT_ROWS_NUMBER;
        const tbody = document.getElementById('tbody');
        createRows(0, rowsNum, tbody, infoKeys);
        displayHeroes(heroesValubaleInformations.slice(0, rowsNum), tbody, rowsNum, infoKeys);
        let searchedHeroes = heroesValubaleInformations;

        //displaying in multiple pages--------------------------------------//
        const paginationContainer = document.getElementById('pagination-container');
        const prevButton = document.getElementById('prev-button');
        const nextButton = document.getElementById('next-button');

        let currentPage = 1;
        function setOnFirstPage() {
            currentPage = 1;
            prevButton.disabled = true;
        }
        setOnFirstPage()
        let totalPages = Math.ceil(searchedHeroes.length / rowsNum);

        // Function to display heroes on the current page
        function displayCurrentPage() {
            const startNum = (currentPage - 1) * rowsNum;
            const endNum = startNum + rowsNum;
            displayHeroes(searchedHeroes.slice(startNum, endNum), tbody, rowsNum, infoKeys);
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

        // search desired heroes------------------------------------------------------//
        const searcherSelectField = document.getElementById('searcherSelectField');
        const searcherSelectOperation = document.getElementById('searcherSelectOperation');
        const searcherInput = document.getElementById('searcherInput');
        
        const searchParams = new URLSearchParams(document.location.search)
        let searchBy = {};
        
        searchBy.field = searchParams.get('fld') && infoKeys.includes(searchParams.get('fld')) ? searchParams.get('fld') : 'name';
        document.getElementById(`optionsearch-${searchBy.field}`).setAttribute('selected', '');
        
        const operatorName  =searchParams.get('opr') ?? 'includes';
        searchBy.operator = Operations[operatorName];
        document.getElementById(`optionoperations-${operatorName}`).setAttribute('selected', '');
        
        searchBy.textForSearch = searchParams.get('q')??'';
        searcherInput.value = searchBy.textForSearch;

        function displaySearchedHeroes() {
            searchedHeroes = heroesValubaleInformations.filter((heroInfo) => {
                return searchBy.operator(heroInfo.get(searchBy.field), searchBy.textForSearch);
            });

            totalPages = Math.ceil(searchedHeroes.length / rowsNum);
            currentPage = 1;
            displayCurrentPage();
            updatePaginationButtons();
        }

        displaySearchedHeroes();

        searcherSelectField.addEventListener('change', event => {
            searchBy.field = event.target.value;
            searcherInput.focus();
            document.location.href = changeSearchParamsInUrl('fld', searchBy.field);
           // displaySearchedHeroes(searcherInput.value);
        });

        searcherSelectOperation.addEventListener('change', event => {
            searchBy.operator = Operations[event.target.value];
            searcherInput.focus();
            document.location.href = changeSearchParamsInUrl('opr', event.target.value);
           // displaySearchedHeroes(searcherInput.value);

        });

        searcherInput.addEventListener('input', (event) => {
            searchBy.textForSearch = event.target.value;
            displaySearchedHeroes();
        });

        searcherInput.addEventListener('change', (event) => {
            searchBy.textForSearch = event.target.value;
            document.location.href = changeSearchParamsInUrl('q', searchBy.textForSearch);

        });
        //-----------------------------------------------------------------------------//

        //display selected quantity of heroes------------------------------------------//
        const selectRowsNumber = document.getElementById('selectRowsNumber');
        selectRowsNumber.addEventListener('change', event => {
            if (event.target.value === 'all results') {
                rowsNum = searchedHeroes.length;
                currentPage = totalPages = 1;
            } else {
                const currentPassedRows = (currentPage - 1) * rowsNum;
                rowsNum = parseInt(event.target.value);
                currentPage = Math.ceil((currentPassedRows + 1) / rowsNum);
                totalPages = Math.ceil(searchedHeroes.length / rowsNum);
            }
            displayCurrentPage();
            updatePaginationButtons();

        });
        //-----------------------------------------------------------------------------//

        //sorting----------------------------------------------------------------
        let sortedField = INIT_SEARCH_FIELD;
        let signOfSort = 1; //1 - ascending, -1 - descending
        document.getElementById(`thead`).addEventListener('click', event => {
            const field = event.target.id.slice(3); // get the property of a hero from a table header
            if (field === sortedField) { signOfSort = -1 * signOfSort; } else { signOfSort = 1; }
            if (field === 'height' || field === 'weight') {
                searchedHeroes = sortMixedField(searchedHeroes, field, signOfSort);
            } else if (infoKeys.includes(field)) {
                searchedHeroes = sortSimpleField(searchedHeroes, field, signOfSort);
            }
            sortedField = field;
            displayHeroes(searchedHeroes.slice(0, rowsNum), tbody, rowsNum, infoKeys);
            setOnFirstPage();
        });

        //-----------------------------------------------------------------------------//
    }

}

