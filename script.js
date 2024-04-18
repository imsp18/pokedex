const pokemonDataArray =[];

async function collectPokemon(){
    const request = await fetch('https://pokeapi.co/api/v2/pokemon/')
    const dataList = await request.json()

    for(const {url} of dataList.results) {
        const pokemonResponse = await fetch(url) 
        const pokemonData = await pokemonResponse.json()

        pokemonDataArray.push({
            name: pokemonData.name,
            image: pokemonData.sprites.front_default,
        })
    }
    visualisPokeList(pokemonDataArray);
}

function visualisPokeList(dataListOfPoke){
    const ul = document.getElementById('pokemonList');
    ul.innerHTML = ''

    dataListOfPoke.forEach(pokemonData =>{
        const pokemonCard = document.createElement('div'); //creating a Div for pokemoncard
        pokemonCard.className = 'card'

        const pokemonImg = document.createElement('div')
        pokemonImg.src = pokemonData.image
        pokemonImg.alt = pokemonData.alt

        const pokemonName = document.createElement('h3')
        pokemonName.innerHTML = pokemonData.name

        pokemonCard.append((pokemonImg, pokemonName))
        ul.append(pokemonCard)
    })
}