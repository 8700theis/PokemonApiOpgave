let pokemonList = [];
let trainerList = [];
let pokemonImages = document.querySelectorAll(".content-pokemons-container-item img");
let trainerPokemons = document.querySelectorAll(".content-team-pokemon");
let trainerPokeName = document.querySelectorAll(".content-team-pokemon-name");
let trainerPokeLvl = document.querySelectorAll(".content-team-pokemon-lvl");

const insetTrainerName = () => {
    const trainerName = localStorage.getItem("trainer-name");
    document.querySelector(".content-team-heading").innerText = `${trainerName}'s Team`;
}

function getPokemon(name, moveOne, moveTwo, moveThree, moveFour) {




    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => response.json())
        .then((data) => {
            /*             
            thisPokemon["imgSprite"] = data.sprites.front_default;
            thisPokemon.hpBS = data.stats[0].base_stat;
            thisPokemon.attBS = data.stats[1].base_stat;
            thisPokemon.defBS = data.stats[2].base_stat;
            thisPokemon.moves[0].moveName = data.moves[moveOne].move.name;
            thisPokemon.moves[1].moveName = data.moves[moveTwo].move.name;
            thisPokemon.moves[2].moveName = data.moves[moveThree].move.name;
            thisPokemon.moves[3].moveName = data.moves[moveFour].move.name;
            */

            let movesUrlList = [];

            movesUrlList[0] = data.moves[moveOne].move.url;
            movesUrlList[1] = data.moves[moveTwo].move.url;
            movesUrlList[2] = data.moves[moveThree].move.url;
            movesUrlList[3] = data.moves[moveFour].move.url;

            var thisPokemon = {
                name: name,
                lvl: 50,
                imgSprite: data.sprites.front_default,
                hpBS: data.stats[0].base_stat,
                attBS: data.stats[1].base_stat,
                defBS: data.stats[2].base_stat,
                moves: [{ moveName: data.moves[moveOne].move.name, movePower: 0 },
                    { moveName: data.moves[moveTwo].move.name, movePower: 0 },
                    { moveName: data.moves[moveThree].move.name, movePower: 0 },
                    { moveName: data.moves[moveFour].move.name, movePower: 0 }
                ]
            };

            for (let i = 0; i < movesUrlList.length; i++) {
                fetch(movesUrlList[i])
                    .then((moveResponse) => moveResponse.json())
                    .then((moveData) => {
                        thisPokemon.moves[i].movePower = moveData.power;
                    })
            }
            pokemonList.push(thisPokemon);
        });

}

const insetPokemonImage = () => {
    for (let i = 0; i < pokemonImages.length; i++) {
        pokemonImages[i].src = pokemonList[i].imgSprite;
        pokemonImages[i].alt = pokemonList[i].name;

    }
}

const addEventOnPokeImages = () => {
    for (let i = 0; i < pokemonImages.length; i++) {
        pokemonImages[i].addEventListener("click", addToTrainerList);
    }
}

const addToTrainerList = (e) => {
    let pokeName = e.target.alt;
    for (let i = 0; i < pokemonList.length; i++) {
        if (pokemonList[i].name == pokeName) {
            trainerList.push(pokemonList[i]);
            pokemonImages[i].removeEventListener("click", addToTrainerList);
            pokemonImages[i].classList.add("picked");
            updateTrainerList();
        }
    }
    if (trainerList.length == 6) {
        for (let i = 0; i < pokemonImages.length; i++) {
            pokemonImages[i].removeEventListener("click", addToTrainerList);
            pokemonImages[i].classList.add("picked");
        }
    }
}

const updateTrainerList = () => {
    for (let i = 0; i < trainerPokemons.length; i++) {
        if (trainerPokeLvl[i].classList.contains("show")) {
            trainerPokeLvl[i].classList.remove("show");
            trainerPokeName[i].innerText = "";
        }
    }
    for (let i = 0; i < trainerList.length; i++) {
        trainerPokeName[i].innerText = trainerList[i].name;
        trainerPokeLvl[i].classList.add("show");

    }
}

const addEventOnTrainerPokemons = () => {
    for (let i = 0; i < trainerPokemons.length; i++) {
        trainerPokemons[i].addEventListener("click", addToPokemonList);
    }
}

const addToPokemonList = (e) => {
    let trainerPokeName = e.target.firstChild.nextElementSibling.innerText;
    for (let i = 0; i < trainerList.length; i++) {
        if (trainerList[i].name == trainerPokeName) {
            trainerList.splice(i, 1);
            updateTrainerList();

        }
    }
    for (let i = 0; i < pokemonImages.length; i++) {
        if (pokemonImages[i].alt == trainerPokeName) {
            pokemonImages[i].addEventListener("click", addToTrainerList);
            pokemonImages[i].classList.remove("picked");
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    insetTrainerName();
    getPokemon("charizard", 0, 1, 2, 37);
    getPokemon("machamp", 0, 1, 2, 77);
    getPokemon("gengar", 0, 1, 2, 77);
    getPokemon("gyarados", 0, 1, 2, 77);
    getPokemon("raichu", 0, 1, 2, 30);
    getPokemon("hydreigon", 0, 1, 2, 30);
    getPokemon("suicune", 0, 1, 2, 30);
    getPokemon("kyurem", 0, 1, 2, 30);
    getPokemon("rayquaza", 0, 1, 2, 30);
    getPokemon("kyogre", 0, 1, 2, 30);
    getPokemon("lucario", 0, 1, 2, 30);
    getPokemon("tyranitar", 0, 1, 2, 30);
    setTimeout(insetPokemonImage, 1000)
    setTimeout(addEventOnPokeImages, 1000);
    setTimeout(addEventOnTrainerPokemons, 1000);
});