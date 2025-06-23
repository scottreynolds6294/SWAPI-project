const baseUrl = 'http://localhost:9001/api';

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return;

  try {
    const film = await fetchFilm(id);
    const characters = await fetchCharacters(id);
    const planets = await fetchPlanets(id);
    renderFilm(film, characters, planets);
  } catch (e) {
    console.error("Error loading film data:", e.message);
  }
});

async function fetchFilm(id) {
  const res = await fetch(`${baseUrl}/films/${id}`);
  return await res.json();
}

async function fetchCharacters(id) {
  const res = await fetch(`${baseUrl}/films/${id}/characters`);
  return await res.json();
}

async function fetchPlanets(id) {
  const res = await fetch(`${baseUrl}/films/${id}/planets`);
  return await res.json();
}

function renderFilm(film, characters, planets) {
  document.title = `SWAPI - ${film.title}`;
  document.querySelector('#filmTitle').textContent = film.title;
  document.querySelector('#filmDescription').textContent = film.opening_crawl;

  const charList = characters.map(c =>
    `<li><a href="character.html?id=${c.id}">${c.name}</a></li>`
  ).join("");
  document.querySelector('#characterList').innerHTML = charList;

  const planetList = planets.map(p =>
    `<li><a href="planet.html?id=${p.id}">${p.name}</a></li>`
  ).join("");
  document.querySelector('#planetList').innerHTML = planetList;
}
