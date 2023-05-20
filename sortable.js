//  let heroValubaleInformation


export function seeThemAll() {
    const cons = document.getElementById('cons');

    // Request the file with fetch, the data will downloaded to your browser cache.
    fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
        .then((response) => response.json()) // parse the response from JSON
        .then(loadData)  // .then will call the `loadData` function with the JSON value.

}


function loadData(heroes) {
    //cons.textContent = cons.textContent+' - '+ hero.name;
    let heroesValubaleInformations = heroes.map(hero => {

        let info = {
            id: hero.id,
            icon: hero.images.xs,
            name: hero.name,
            fullName: hero.biography.fullName,
            powerstats: { ...hero.powerstats }, //"intelligence", "strength", "speed", "durability", "power", "combat"
            race: hero.appearance.race,
            gender: hero.appearance.gender,
            height: hero.appearance.height,
            weight: hero.appearance.weight,
            placeOfBirth: hero.biography.placeOfBirth,
            alignment: hero.biography.alignment,
        }
        return info;
    });

    cons.textContent = cons.textContent + ' - ' + heroesValubaleInformations[2].powerstats.speed;
    // console.log(heroesValubaleInformations.slice(0, 2));
}

function displayData() {

}
function search() {

}
function sort() {

}


