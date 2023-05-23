import { TableHead, Powerstats } from './sortable.data.js';

//creates a table with a head but without rows.  
// It returns an array with keys, which are used for identification cells (th and td) in the table and heroes in a Map.
// Say we've kept an element of the array with keys in a variable infoKey, 
// then the <th> element will have id=`th-${infoKey}` (for example: th-name)
// and corresponding hero's property can be retrived in this way:  hero.get(infoKey) (for example hero.get('name'))
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
    //TODO it makes sence to put this block in a separate function (don't foget fire it, for example in html------------------------------//
    const paginationContainer = document.createElement('div');
    paginationContainer.id = 'pagination-container';
    document.body.appendChild(paginationContainer);

    const prevButton = document.createElement('button');
    prevButton.id = 'prev-button';
    prevButton.textContent = 'Previous';
    paginationContainer.appendChild(prevButton);

    const nextButton = document.createElement('button');
    nextButton.id = 'next-button';
    nextButton.textContent = 'Next';
    paginationContainer.appendChild(nextButton);
    //-----------------------------------------------------------------------------//
    thead.appendChild(tr1);
    thead.appendChild(tr2);

    const tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'tbody');

    table.appendChild(thead);
    table.appendChild(tbody);

    return infoKeys;
}

// creates rows and adds them to the table body(tablBody)
// startNum, endNum - define which number of rows will be added (at first they  are 0 and quantity of heroes fo displaing, 
// but during searsching rows can be deleted or added, so the search function can defitne others startNum and endNum). 
// infoKeys is needed to identify collumns and heroes' features (see the comment to tableCreate).
export function createRows(startNum, endNum, tablBody, infoKeys) {

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
