import axios from "axios"

const NUMBER_OF_POKEMONS = 10

const getPokemonsArray = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}pokemons/`)
    //console.log(res.data);
    
    if (res.status !== 200) {
        throw new Error("Error fetching data")
    }
    return res.data
}

const getRandomPokemon = (pokemons) => {
    const randomIndex = Math.floor(Math.random() * pokemons.length)
    return pokemons[randomIndex]
}

export const getRandomPokemons = async () => {
    const pokemons = await getPokemonsArray()
    // Check if there are enough pokemons to select from
    if (pokemons.length < NUMBER_OF_POKEMONS) {
        throw new Error("Not enough pokemons to select from")
    }    const randomPokemons = []
    for (let i = 0; i < NUMBER_OF_POKEMONS; i++) {
        const randomPokemon = getRandomPokemon(pokemons)
        randomPokemons.push(randomPokemon)
    }
    return randomPokemons
}

export const userWins = (user_pokemon, opponent_pokemon) => {
    if(user_pokemon.type === opponent_pokemon.type) {
        return user_pokemon.power > opponent_pokemon.power 
    }
    if(user_pokemon.type === "fire" && opponent_pokemon.type === "grass") {
        return true
    }
    if(user_pokemon.type === "grass" && opponent_pokemon.type === "water") {
        return true
    }
    if(user_pokemon.type === "water" && opponent_pokemon.type === "fire") {
        return true
    }
    if(user_pokemon.type === "grass" && opponent_pokemon.type === "fire") {
        return false
    }   
    if(user_pokemon.type === "water" && opponent_pokemon.type === "grass") {
        return false
    }
    if(user_pokemon.type === "fire" && opponent_pokemon.type === "water") {
        return false
    }
    return Math.random() < 0.7
}