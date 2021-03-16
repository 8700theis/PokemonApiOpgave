const insetTrainerName = () => {
    const trainerName = localStorage.getItem("trainer-name");
    document.querySelector(".content-team-heading").innerText = `${trainerName}'s Team`;
}

function getPokemon(name, moveOne, moveTwo, moveThree, moveFour) {
    var thisPokemon = {
        name: name,
        lvl: 50,
        imgSprite: "",
        hpBS: 0,
        attBS: 0,
        defBS: 0,
        moves: [{ moveName: "", movePower: 0 }, { moveName: "", movePower: 0 }, { moveName: "", movePower: 0 }, { moveName: "", movePower: 0 }]
    };

    let movesUrlList = [];

    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => response.json())
        .then((data) => {
            thisPokemon.imgSprite = data.sprites.front_default;
            thisPokemon.hpBS = data.stats[0].base_stat;
            thisPokemon.attBS = data.stats[1].base_stat;
            thisPokemon.defBS = data.stats[2].base_stat;
            thisPokemon.moves[0].moveName = data.moves[moveOne].move.name;
            thisPokemon.moves[1].moveName = data.moves[moveTwo].move.name;
            thisPokemon.moves[2].moveName = data.moves[moveThree].move.name;
            thisPokemon.moves[3].moveName = data.moves[moveFour].move.name;
            movesUrlList[0] = data.moves[moveOne].move.url;
            movesUrlList[1] = data.moves[moveTwo].move.url;
            movesUrlList[2] = data.moves[moveThree].move.url;
            movesUrlList[3] = data.moves[moveFour].move.url;

            for (let i = 0; i < movesUrlList.length; i++) {
                fetch(movesUrlList[i])
                    .then((moveResponse) => moveResponse.json())
                    .then((moveData) => {
                        thisPokemon.moves[i].movePower = moveData.power;
                    })
            }
        });
    console.log(thisPokemon);
}

document.addEventListener('DOMContentLoaded', () => {
    insetTrainerName();
    getPokemon("charizard", 0, 1, 2, 37);
});