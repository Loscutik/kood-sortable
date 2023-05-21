//  let heroValubaleInformation
import { TableHead, Powerstats } from './sortable.data.js';

//TODO scrolling table's rows and fixed header
export function seeThemAll() {
    const searcher = document.createElement('input');
    searcher.id = 'search';
    searcher.setAttribute('placeholder', 'Type name');
    document.body.appendChild(searcher);



    // Request the file with fetch, the data will downloaded to your browser cache.
    fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
        .then((response) => response.json()) // parse the response from JSON
        .then(loadData)  // .then will call the `loadData` function with the JSON value.

}


function loadData(heroes) {
    const cons = document.getElementById('cons');

    const infoKeys = tableCreate();

    let heroesValubaleInformations = heroes.map(hero => {
        cons.textContent = hero.appearance.height.constructor.name + ' ' + hero.appearance.weight[1];

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

    //cons.textContent = cons.textContent + ' - ' + heroesValubaleInformations[2].get('powerstats_speed');
    // console.log(heroesValubaleInformations.slice(0, 2));
    let rowsNum = 5;
    const tbody = document.getElementById('tbody');
    createRows(0, rowsNum, tbody, infoKeys);
    //const trs = tbody.querySelectorAll('tr');
    displayHeroes(heroesValubaleInformations.slice(0, rowsNum), tbody, rowsNum, infoKeys);
    search(heroesValubaleInformations, tbody, rowsNum, infoKeys)

    // TODO sort filtered heroes
    let sortedField = 'name';
    let sign = 1;
    document.getElementById(`thead`).addEventListener('click', event => {
        const field = event.target.id.slice(3);
        if (field === sortedField) { sign = -1 * sign; } else { sign = 1; }
        if (field === 'height' || field === 'weight') {
            heroesValubaleInformations = sortMixedField(heroesValubaleInformations, field, sign);
            sortedField = field;
            displayHeroes(heroesValubaleInformations.slice(0, rowsNum), tbody, rowsNum, infoKeys);
        } else {
            heroesValubaleInformations = sortSimpleField(heroesValubaleInformations, field, sign);
            sortedField = field;
            displayHeroes(heroesValubaleInformations.slice(0, rowsNum), tbody, rowsNum, infoKeys);
        }

    });

}

export function tableCreate() {
    const table = document.createElement('table');
    table.setAttribute('id', 'table');
    document.body.appendChild(table);

    let infoKeys = [];

    const thead = document.createElement('thead');
    thead.id = 'thead';
    let tr1 = document.createElement('tr');
    tr1.setAttribute('id', `tr-head1`);
    let tr2 = document.createElement('tr');
    tr2.setAttribute('id', `tr-head2`);
    for (let title of TableHead) {
        let th1 = document.createElement('th');
        let infoKey = `${title.split(' ').join('')}`;
        th1.setAttribute('id', `th-${infoKey}`);
        if (title === 'powerstats') {
            th1.setAttribute('colspan', Powerstats.length);
            for (let power of Powerstats) {
                let th2 = document.createElement('th');
                infoKey = `powerstats_${power.split(' ').join('')}`;
                infoKeys.push(infoKey);
                th2.setAttribute('id', `th-${infoKey}`);
                th2.textContent = power.charAt(0).toUpperCase() + power.slice(1).toLowerCase();
                tr2.appendChild(th2);
            }
        } else {
            th1.setAttribute('rowspan', 2);
            infoKeys.push(infoKey);
        }
        th1.textContent = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
        tr1.appendChild(th1);

    }
    thead.appendChild(tr1);
    thead.appendChild(tr2);

    const tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'tbody');

    table.appendChild(thead);
    table.appendChild(tbody);

    return infoKeys;
}

function createRows(startNum, endNum, tablBody, infoKeys) {

    for (let i = startNum; i < endNum; i++) {
        let tr = document.createElement('tr');
        tr.setAttribute('id', `tr-${i}`);
        for (let j = 0; j < infoKeys.length; j++) {
            let td = document.createElement('td');
            td.setAttribute('id', `td-${i}-${infoKeys[j]}`);
            tr.appendChild(td);
        }
        tablBody.appendChild(tr);
    }
}

function displayHeroes(heroesInfo, tablBody, maxRowsNumber, infoKeys) {
    if (heroesInfo.length > maxRowsNumber) {
        console.log('Error heroesInfo.length:', heroesInfo.length, ' not greater than desired number of rows: ', maxRowsNumber);
        throw new Error('Error heroesInfo.length:', heroesInfo.length, ' not greater than desired number of rows: ', maxRowsNumber);
    }

    let trs = tablBody.querySelectorAll('tr');

    switch (true) {
        case heroesInfo.length > trs.length:
            createRows(trs.length, heroesInfo.length, tablBody, infoKeys);
            trs = tablBody.querySelectorAll('tr');
            break;
        case heroesInfo.length < trs.length:
            for (let i = trs.length - 1; i >= heroesInfo.length; i--) {
                trs[i].remove();
            }
            trs = tablBody.querySelectorAll('tr');
            break;
    }

    for (let i = 0; i < trs.length; i++) {
        const hero = heroesInfo[i];
        for (let j = 0; j < infoKeys.length; j++) {
            let td = document.getElementById(`td-${i}-${infoKeys[j]}`);
            if (infoKeys[j] === 'icon') {
                td.style.backgroundImage = `url(${hero.get('icon')})`;
                td.style.backgroundRepeat = 'no-repeat';
                // td.style.backgroundSize = 'cover';
                td.style.backgroundPosition = 'center';
            } else {
                td.innerHTML = hero.get(infoKeys[j]);
            }
        }

    }
}

function search(heroesInfo, tablBody, maxRowsNumber, infoKeys) {
    search = document.getElementById('search')
    search.addEventListener('input', (e) => {
        let trs = tablBody.querySelectorAll('tr');
        let textForSearch = e.target.value;
        let heroes = heroesInfo.filter(hero => {
            return hero.get('name').toLowerCase().includes(textForSearch.toLowerCase())
        });

        displayHeroes(heroes.slice(0, maxRowsNumber), tablBody, maxRowsNumber, infoKeys);

    });
}


function sortSimpleField(heroesInfo, infoKey, sign) {
    if (typeof heroesInfo[0].get(infoKey) === 'string') {
        return heroesInfo.sort((h1, h2) => {
            if (h1.get(infoKey) === undefined || h1.get(infoKey) === null) return 1;
            if (h2.get(infoKey) === undefined || h2.get(infoKey) === null) return -1;
            if ((h1.get(infoKey) === undefined || h1.get(infoKey) === null) && (h2.get(infoKey) === undefined || h2.get(infoKey) === null)) return 0;

            const h1feature = h1.get(infoKey).trim().toLowerCase();
            const h2feature = h2.get(infoKey).trim().toLowerCase();

            if (h1feature === '-' || h1feature === '') return 1;
            if (h2feature === '-' || h2feature === '') return -1;
            if ((h1feature === '-' || h1feature === '') && (h2feature === '-' || h2feature === '')) return 0;

            if (h1feature < h2feature) return -1 * sign;
            if (h1feature > h2feature) return sign;
            return 0;
        });
    } else {
        return heroesInfo.sort((h1, h2) => {
            if (h1.get(infoKey) === undefined || h1.get(infoKey) === null) return 1;
            if (h2.get(infoKey) === undefined || h2.get(infoKey) === null) return -1;
            if ((h1.get(infoKey) === undefined || h1.get(infoKey) === null) && (h2.get(infoKey) === undefined || h2.get(infoKey) === null)) return 0;

            if (h1.get(infoKey) < h2.get(infoKey)) return -1 * sign;
            if (h1.get(infoKey) > h2.get(infoKey)) return sign;
            return 0;
        });
    }
}

//TODO convert meters to cm and tones to kg. check all measures
function sortMixedField(heroesInfo, infoKey, sign) {
    return heroesInfo.sort((h1, h2) => {
        if (!h1.get(infoKey)) return 1;
        if (!h2.get(infoKey)) return -1;
        if (!h1.get(infoKey) && !h2.get(infoKey)) return 0;
        const num1 = h1.get(infoKey).split(' ')[0];
        const num2 = h2.get(infoKey).split(' ')[0];
        if (isNaN(num1) || num1 == 0) return 1;
        if (isNaN(num2) || num2 == 0) return -1;
        if ((isNaN(num1) || num1 == 0) && (isNaN(num2) || num2 == 0)) return 0;
        if (num1 < num2) return -1 * sign;
        if (num1 > num2) return sign;
        return 0;
    });
}


