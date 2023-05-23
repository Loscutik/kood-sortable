import { createRows } from './view-create.js';
// display the given heroes in the table (tablBody is a <tbody> element).
// The quantity of heroes must not be bigger than maxRowsNumber (which is the desired quantity of rows).
// If the quantity of heroes are less than rows in the tablBody, the spare rows will be deleted.
// If the quantity of heroes are more than rows in the tablBody, the necessery rows will be added, but no more than maxRowsNumber.
// infoKeys is needed to identify collumns and heroes' features (see the comment to tableCreate).
export function displayHeroes(heroesInfo, tablBody, maxRowsNumber, infoKeys) {
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
