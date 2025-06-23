let nameH1;
let filmsUl;
let charactersSpan;
let climateSpan;
let popSpan;
const baseURL = `http://localhost:9001/api`;

addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#name');
    filmsUl = document.querySelector('#films>ul');
    charactersSpan = document.querySelector('#characters span');
    climateSpan = document.querySelector('span#climate');
    popSpan = document.querySelector('span#population');
    const sp = new URLSearchParams(window.location.search);
    const id = sp.get('id');
    getPlanet(id);
});

async function getPlanet(id) {
    let planet;
    try {
        planet = await fetchPlanet(id);
        planet.characters = await fetchCharacters(planet);
        planet.films = await fetchFilms(planet);
    }
    catch (ex) {
        console.error(`Error reading planet ${id} data: `, ex.message);
    }
    console.log("Planet data: ", planet);
    renderPlanet(planet);
}

async function fetchPlanet(id) {
    let planetUrl = `${baseURL}/planets/${id}`;
    return await fetch(planetUrl)
    .then(res => res.json());
}

async function fetchCharacters(planet) {
    let url = `${baseURL}/characters/${planet.id}`;
    const characters = await fetch(url)
    .then(res => res.json());
    return characters;
}

async function fetchFilms(planet) {
    const url = `${baseURL}/planets/${planet?.id}/films`;
    const films = await fetch(url)
    .then(res => res.json());
    return films;
}

const renderPlanet = planet => {
    document.title = `SWAPI - ${planet?.name}`;
    nameH1.textContent = planet?.name;
    climateSpan.textContent = planet?.climate;
    popSpan.textContent = planet?.population;
    charactersSpan.innerHTML = `<a href="/character.html?id=${planet.characters.id}">${planet.characters.name}</a>`;
        const filmsLis = planet.films.map(film => 
        `<li><a href="/film.html?id=${film.id}">${film.title}</a></li>`);
        filmsUl.innerHTML = filmsLis.join("");

};
