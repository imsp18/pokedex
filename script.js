const MAX_POKEMON = 151; //setting max pokemon to be fetched to 151

const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-input");
const numberFilter = document.querySelector("#number");
const nameFilter = document.querySelector("#name");
const notFoundMessage = document.querySelector("#not-found-message");

let allPokemon = []; //creating an array, later will store all the fetched pokemons here

