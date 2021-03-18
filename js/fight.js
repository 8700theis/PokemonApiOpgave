const trainerList = JSON.parse(localStorage.getItem("trainer-pokemon-list"));

let mewtwo = [];

function fetchMewtwo(moveOne, moveTwo, moveThree, moveFour) {
    fetch(`https://pokeapi.co/api/v2/pokemon/mewtwo`)
        .then((response) => response.json())
        .then((data) => {
            let movesUrlList = [];

            movesUrlList[0] = data.moves[moveOne].move.url;
            movesUrlList[1] = data.moves[moveTwo].move.url;
            movesUrlList[2] = data.moves[moveThree].move.url;
            movesUrlList[3] = data.moves[moveFour].move.url;

            var thisPokemon = {
                name: "mewtwo",
                lvl: 50,
                imgSprite: data.sprites.front_default,
                imgSpriteBack: data.sprites.back_default,
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
            mewtwo.push(thisPokemon);
        });
}


document.addEventListener('DOMContentLoaded', () => {
    fetchMewtwo(0, 1, 2, 66);
    setTimeout(console.log(mewtwo), 10);

});