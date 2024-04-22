const MAX_POKEMON = 151; //setting max pokemon to be fetched to 151

const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-input");
const numberFilter = document.querySelector("#number");
const nameFilter = document.querySelector("#name");
const notFoundMessage = document.querySelector("#not-found-message");

let allPokemons = []; //creating an array, later will store all the fetched pokemons here

fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
  .then((response) => response.json())
  .then((data) => {
    allPokemons = data.results;
    console.log(allPokemons);
    displayPokemons(allPokemons);
  });
//fetching the data from the API

async function fetchPokemonDataBeforeRedirect(id) {
  try {
    const [pokemon, pokemonSpecies] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
        res.json()
      ), //fetching the pokemon data
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) =>
        res.json()
      ), //fetching the pokemon species data
    ]);
    return true;
  } catch (error) {
    console.log("Failed to Fetch the data before the redirect"); //if the data fetching fails then this message will be displayed
  }
}

function displayPokemons(pokemon) {
  listWrapper.innerHTML = ""; //clearing the list wrapper before displaying the pokemons again
  pokemon.forEach((pokemon) => {
    const pokemonID = pokemon.url.split("/")[6]; //getting the pokemon id from the url
    const listItem = document.createElement("div");
    listItem.className = "list-item";
    listItem.innerHTML = `
        <div class="number-wrap">
            <p class="caption-fonts">#${pokemonID}</p>
        </div>
        <div class="image-wrap">
            <img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt="${pokemon.name}"/>
        </div>
        <div class="name-wrap">
            <p class="body3-fonts">${pokemon.name}</p>
        </div>
        `; //displaying the pokemon data in the list wrapper

    listItem.addEventListener("click", async () => {
      const success = await fetchPokemonDataBeforeRedirect(pokemonID);
      if (success) {
        window.location.href = `./detail.html?=${pokemonID}`;
      }
    });
    listWrapper.appendChild(listItem);
  });
}
