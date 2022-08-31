const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`


const generatePokemonsPromises = () => Array(25).fill().map((_, index) => 
fetch(getPokemonUrl(index + 1)).then(response => response.json()))


const fetchPokemon = () => {


    const pokemonPromises = generatePokemonsPromises();

    
    Promise.all(pokemonPromises).then(pokemons =>{
        //console.log(pokemons)

        const listPokemons = pokemons.reduce((accumulator, pokemon) => {
            const types = pokemon.types.map(typeInfo => typeInfo.type.name)

            accumulator += `
            <li class="card ${types[0]}">
            <img class="card-image " alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"/>
                <h2 class="car-title">${pokemon.id}. ${pokemon.name}</h2>
                <p class="card-subtitle">${types.join(' | ')} </p>
                <p class="price"> R$: 25.99 </p>
                <button>Comprar</button>
            </li>`
            return accumulator
        }, '')

        const ul = document.querySelector('[data-js="pokedex"]')

        ul.innerHTML = listPokemons
    })
    
}

fetchPokemon()