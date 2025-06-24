let nameH1;
let filmsUl;
let charactersSpan;
let climateSpan;
let popSpan;
let diamSpan;
let gravitySpan;
let orbSpan;
let terrainSpan;
let rotSpan;
const baseURL = `http://localhost:9001/api`;

addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#name');
    filmsUl = document.querySelector('#films>ul');
    charactersSpan = document.querySelector('#characters span');
    climateSpan = document.querySelector('span#climate');
    popSpan = document.querySelector('span#population');
    diamSpan = document.querySelector('span#diameter');
    gravitySpan = document.querySelector('span#gravity');
    orbSpan = document.querySelector('span#orbital-period');
    rotSpan = document.querySelector('span#rotation-period')
    terrainSpan = document.querySelector('span#terrain');
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
    renderPlanet(planet);
}

async function fetchPlanet(id) {
    let planetUrl = `${baseURL}/planets/${id}`;
    return await fetch(planetUrl)
    .then(res => res.json());
}

async function fetchCharacters(planet) {
    let url = `${baseURL}/planets/${planet.id}/characters`;
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
    diamSpan.textContent = planet?.diameter;
    gravitySpan.textContent = planet?.gravity;
    terrainSpan.textContent = planet?.terrain;
    orbSpan.textContent = planet?.orbital_period;
    rotSpan.textContent = planet?.rotation_period;
    const characterLinks = planet.characters.map(char => 
    `<a href="/character.html?id=${char.id}">${char.name}</a>`);
    charactersSpan.innerHTML = characterLinks.join(", ");
    const filmsLis = planet.films.map(film => 
    `<li><a href="/film.html?id=${film.id}">${film.title}</a></li>`);
     filmsUl.innerHTML = filmsLis.join("");

};
