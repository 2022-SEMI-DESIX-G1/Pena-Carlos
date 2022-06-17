const { default: axios } = require('axios')
const POKEMONCACHE = {}
const RUTASCACHES = {}
const ESPECIESCACHE = {}
const ERROR = {}

const getPokemonFromCache = async (name) => {
    return new Promise((resolve, reject) => {
        if (ERROR[name]) {
            return reject(JSON.parse(ERROR[name]))
        }
        if (POKEMONCACHE[name]) {
            return resolve({ data: JSON.parse(POKEMONCACHE[name]), isCached: true })
        }
        const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
        const response = getPokemonFromApi(name, url, POKEMONCACHE)
        return resolve(response)
    })
}

const getPokemonRutasFromCache = (name) => {
    return new Promise(async (reject, resolve) => {
        if (ERROR[name]) {
            return reject(JSON.parse(ERROR[name]))
        }
        if (RUTASCACHES[name]) {
            return resolve({ data: JSON.parse(RUTASCACHES[name]), isCached: true })
        }
        const url = `https://pokeapi.co/api/v2/pokemon/${name}/encounters`;

        const response = await getPokemonFromApi(name, url,RUTASCACHES)
        return resolve(response)
    })
}

const getPokemonEspeciesFromCache = (name) => {
    let url = '';
    return new Promise(async (reject, resolve) => {
        if (ERROR[name]) {
            return reject(JSON.parse(ERROR[name]))
        }
        if (ESPECIESCACHE[name]) {
            return resolve({ data: JSON.parse(ESPECIESCACHE[name]), isCached: true })
        }
        url = `https://pokeapi.co/api/v2/pokemon-species/${name}`;

        try {
            const especies = await axios.get(url)
            url = especies.data.evolution_chain.url
        }
        catch {
            ERROR[name] = JSON.stringify({ name, error: "pokemon inválido" })
            return  reject(JSON.parse(ERROR[name]))
        }
        const response = await getPokemonFromApi(name, url, ESPECIESCACHE)
        return resolve(response)
    })
}

const getPokemonFromApi = async (name, url, cache) => {
    try {
        const { data } = await axios.get(url)
        cache[name] = JSON.stringify({ name, data: data, date: new Date })
    }
    catch (e) {
        ERROR[name] = JSON.stringify({ name, error: "pokemon inválido" })
        return (JSON.parse(ERROR[name]))
    }

    return ({ data: JSON.parse(cache[name]), isCached: false });
}



module.exports = {
    getPokemonFromCache,
    getPokemonRutasFromCache,
    getPokemonEspeciesFromCache
}