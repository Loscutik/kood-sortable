//  let heroValubaleInformation
import { TableHead, Powerstats } from './sortable.data.js';

export function seeThemAll() {
    const cons = document.getElementById('cons');

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

    cons.textContent = cons.textContent + ' - ' + heroesValubaleInformations[2].get('powerstats_speed');
    // console.log(heroesValubaleInformations.slice(0, 2));
    let rowsNum = heroesValubaleInformations.length;
    const tbody = document.getElementById('tbody');
    createRows(5, tbody, infoKeys);
    displayHeroes(heroesValubaleInformations.slice(0, 5), tbody, infoKeys);
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

function createRows(num, tablBody, infoKeys) {

    for (let i = 0; i < num; i++) {
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

function displayHeroes(heroesInfo, tablBody, infoKeys) {
    const trs = tablBody.querySelectorAll('tr');
    console.log(heroesInfo);
    if (trs.length !== heroesInfo.length) {
        console.log('Error heroesInfo.length:', heroesInfo.length, ' not equal to trs.length: ', trs.length);
        throw new Error('Error heroesInfo.length:', heroesInfo.length, ' not equal to trs.length: ', trs.length);
    }
    for (let i = 0; i < trs.length; i++) {
        const tr = trs[i];
        const hero = heroesInfo[i];
        for (let j = 0; j < infoKeys.length; j++) {
            let td = document.getElementById(`td-${i}-${infoKeys[j]}`);
            td.innerHTML = hero.get(infoKeys[j]);
        }

    }
}

function search() {

}
function sort() {

}


