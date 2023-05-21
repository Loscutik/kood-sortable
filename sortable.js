//  let heroValubaleInformation
import { TableHead, Powerstats } from './sortable.data.js';

export function seeThemAll() {
    //const cons = document.getElementById('cons');
    const searcher = document.createElement('input');

    searcher.id = 'search';
    searcher.setAttribute('placeholder', 'Type name');
    document.body.appendChild(searcher);

    table.setAttribute('id', 'table');
    document.body.appendChild(table);
    // Request the file with fetch, the data will downloaded to your browser cache.
    fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
        .then((response) => response.json()) // parse the response from JSON
        .then(loadData)  // .then will call the `loadData` function with the JSON value.

}


function loadData(heroes) {
    //cons.textContent = cons.textContent+' - '+ hero.name;
    const infoKeys = TableHead.flatMap(item =>
        item === 'powerstats' ? Powerstats.map(power => `powerstats_${power}`) : item.split(' ').join(''));

    let heroesValubaleInformations = heroes.map(hero => {

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
        info.set('height', hero.appearance.height);
        info.set('weight', hero.appearance.weight);
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
}

export function tableCreate() {
    const table = document.createElement('table');
    table.setAttribute('id', 'table');
    document.body.appendChild(table);

    const thead = document.createElement('thead');
    let tr1 = document.createElement('tr');
    tr1.setAttribute('id', `tr-head1`);
    let tr2 = document.createElement('tr');
    tr2.setAttribute('id', `tr-head2`);
    for (let title of TableHead) {
        let th1 = document.createElement('th');
        th1.setAttribute('id', `th-1-${title.split(' ').join('')}`);
        if (title === 'powerstats') {
            th1.setAttribute('colspan', Powerstats.length);
            for (let power of Powerstats) {
                let th2 = document.createElement('th');
                th2.setAttribute('id', `th-2-powerstat_${title.split(' ').join('')}`);
                th2.textContent = power.charAt(0).toUpperCase() + power.slice(1).toLowerCase();
                tr2.appendChild(th2);
            }
        } else {
            th1.setAttribute('rowspan', 2);
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
            td.innerHTML = hero.get(infoKeys[j]);
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




function sort() {

}


