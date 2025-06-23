let nameH1;
let filmsUl;
let charactersSpan;
const baseURL = `http://localhost:9001/api`;

addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#name');
    filmsUl = document.querySelector('#films>ul');
    charactersSpan = document.querySelector('#characters span');
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
    let url = `${baseURL}/characters/${planet.id}`;
    const characters = await fetch(url)
    .then(res => res.json());
    console.log("Characters data:", characters);
    return characters;
}

async function fetchFilms(planet) {
    const url = `${baseURL}/planets/${planet?.id}/films`;
    const films = await fetch(url)
    .then(res => res.json());
    console.log("Films data: ", films);
    return films;
}

const renderPlanet = planet => {
    document.title = `SWAPI - ${planet?.name}`;
    nameH1.textContent = planet?.name;
        if (planet?.characters && typeof planet.characters === 'object') {
        if (Array.isArray(planet.characters)) {
            charactersSpan.innerHTML = planet.characters.map(char => char.name).join(", ");
        } else {
            charactersSpan.innerHTML = planet.characters.name || "Character information unavailable";
        }
    } else {
        charactersSpan.innerHTML = "No characters found";
    }
        if (planet?.films && Array.isArray(planet.films)) {
        const filmsLis = planet.films.map(film => 
            `<li><a href="/film.html?id=${film.id}">${film.title}</a></li>`
        );
        filmsUl.innerHTML = filmsLis.join("");
    } else {
        filmsUl.innerHTML = "<li>No films found</li>";
    }
};
