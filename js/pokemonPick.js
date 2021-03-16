let pokemonList = [];

const insetTrainerName = () => {
    const trainerName = localStorage.getItem("trainer-name");
    document.querySelector(".content-team-heading").innerText = `${trainerName}'s Team`;
}

function getPokemon(name, moveOne, moveTwo, moveThree, moveFour) {




    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => response.json())
        .then((data) => {
            /*             thisPokemon["imgSprite"] = data.sprites.front_default;

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
    let pokemonImages = document.querySelectorAll(".content-pokemons-container-item img");

    for (let i = 0; i < pokemonImages.length; i++) {

        pokemonImages[i].src = pokemonList[i].imgSprite;
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
    setTimeout(insetPokemonImage, 500)
});