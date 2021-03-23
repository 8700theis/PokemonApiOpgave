let trainerList = JSON.parse(localStorage.getItem("trainer-pokemon-list"));
let mewtwo = JSON.parse(localStorage.getItem("mewtwo"));

const pokemonBtn = document.querySelector(".content-bottom-right div:last-child");
const fightBtn = document.querySelector(".content-bottom-right div:first-child");

const resultpage = document.querySelector(".content-resultpage");

/* Poke bag elements START */
let pokemonBag = document.querySelector(".content-pokemon-list");
const backBtn = document.querySelector(".content-pokemon-list-back-btn");
/* Poke bag elements END */

/* BOSS pokemon elements START */
let bossPokeImg = document.querySelector(".content-fight-top-pokemon img");
let bossPokeName = document.querySelector("#boss-name");
let bossPokeLvl = document.querySelector("#boss-lvl");
let bossPokeHp = document.querySelector("#boss-hp");
/* BOSS pokemon elements END */

/* Current fighting pokemons elements START */
let currentPokeImg = document.querySelector(".content-fight-bottom-pokemon img");
let currentPokeName = document.querySelector("#current-name");
let currentPokeLvl = document.querySelector("#current-lvl");
let currentPokeHp = document.querySelector("#current-hp");
let currentPokeStartingHp = document.querySelector(".current-starting-hp");
let movesWrapper = document.querySelectorAll(".moves-move-wrapper");
let move = document.querySelectorAll(".move");

let overlay = document.querySelector(".content-bottom-left-overlay");
let overlayHeading = document.querySelector(".content-bottom-left-overlay-heading");
/* Current fighting pokemons elements END */

/* 
    Holder arrayet med den pokemon der currently er i kamp 
    (Den førstvalgte pokemon fra pokemonPick er som standard den første) 
*/
let currentFightingPokemon = [trainerList[0]];

let myTurn = true;

const removeEventlisteners = () => {
    pokemonBtn.removeEventListener("click", showPokemonList);
    fightBtn.removeEventListener("click", showMoves);
}

const addEventlisteners = () => {
    pokemonBtn.addEventListener("click", showPokemonList);
    fightBtn.addEventListener("click", showMoves);
}

const calculateHP = () => {
    let hp = 0;
    for (let i = 0; i < trainerList.length; i++) {
        let bhs = trainerList[i].hpBS;
        let lvl = trainerList[i].lvl;
        hp = (((2 * bhs + 100) * lvl) / 100) + 41;
        trainerList[i].HP = Math.ceil(hp);
        trainerList[i].currentHP = Math.ceil(hp);
        if (i == 0) {
            let mewtwobhs = mewtwo[i].hpBS;
            let mewtwolvl = mewtwo[i].lvl;
            hp = (((2 * mewtwobhs + 100) * mewtwolvl) / 100) + 41;
            mewtwo[i].HP = Math.ceil(hp);
        }
    }
}

const calculateAttack = () => {
    for (let i = 0; i < trainerList.length; i++) {
        let currentpokelvl = trainerList[i].lvl;
        let currentpokeAttBS = trainerList[i].attBS;
        let mewtwoDefenceBS = mewtwo[0].defBS;
        let movePower = 0;
        let moveAttackValue = 0
        for (let j = 0; j < trainerList[i].moves.length; j++) {
            movePower = trainerList[i].moves[j].movePower;
            if (movePower === null) {
                movePower = 0;
                moveAttackValue = 0;
            } else {
                moveAttackValue = Math.ceil(((((2 * currentpokelvl / 5 + 2) * currentpokeAttBS * movePower) / mewtwoDefenceBS) / 50) + 2);
            }
            trainerList[i].moves[j].moveDamage = moveAttackValue;
        }
    }
}

const calculateMewtwoAttack = () => {
    let bosspokelvl = mewtwo[0].lvl;
    let bospokeAttBS = mewtwo[0].attBS;
    let currentPokemonDefenceBS = currentFightingPokemon[0].defBS;
    let movePower = 0;
    let moveAttackValue = 0
    for (let i = 0; i < mewtwo[0].moves.length; i++) {
        movePower = mewtwo[0].moves[i].movePower;
        if (movePower === null) {
            movePower = 0;
            moveAttackValue = 0;
        } else {
            moveAttackValue = Math.ceil(((((2 * bosspokelvl / 5 + 2) * bospokeAttBS * movePower) / currentPokemonDefenceBS) / 50) + 2);
        }
        mewtwo[0].moves[i].moveDamage = moveAttackValue;
    }
}

const insetBossPokemonInfo = () => {
    bossPokeImg.src = mewtwo[0].imgSprite;
    bossPokeName.innerText = mewtwo[0].name;
    bossPokeLvl.innerText = `lvl. ${mewtwo[0].lvl}`;
    bossPokeHp.innerText = mewtwo[0].HP;
}

const insetCurrentPokemonInfo = () => {
    overlayHeading.innerText = `What will ${currentFightingPokemon[0].name} do?`;
    if (overlay.classList.contains("hide-overlay")) {
        overlay.classList.add("show-overlay");
        overlay.classList.remove("hide-overlay");
    } else {
        overlay.classList.add("show-overlay");
    }
    currentPokeImg.src = currentFightingPokemon[0].imgSpriteBack;
    currentPokeName.innerText = currentFightingPokemon[0].name;
    currentPokeLvl.innerText = `lvl. ${currentFightingPokemon[0].lvl}`;
    currentPokeStartingHp.innerText = currentFightingPokemon[0].HP;
    currentPokeHp.innerText = currentFightingPokemon[0].currentHP;
    for (let i = 0; i < move.length; i++) {
        move[i].innerText = currentFightingPokemon[0].moves[i].moveName;
    }
}

/* EventListeners START */

const addEventOnFightBtn = () => {
    fightBtn.addEventListener("click", showMoves);
}

const addEventOnMoves = () => {
    for (let i = 0; i < movesWrapper.length; i++) {
        movesWrapper[i].addEventListener("click", (e) => {
            if (myTurn == true) {
                let clickedMoveName = e.target.children[0].children[0].innerText;
                for (let i = 0; i < currentFightingPokemon[0].moves.length; i++) {
                    if (currentFightingPokemon[0].moves[i].moveName == clickedMoveName) {
                        mewtwo[0].HP = mewtwo[0].HP - currentFightingPokemon[0].moves[i].moveDamage;
                        if (mewtwo[0].HP <= 0) {
                            mewtwo[0].HP = 0;
                            bossPokeImg.classList.add("pokemon-dead");
                            resultpage.classList.add("show-resultpage");
                            removeEventlisteners();
                        }
                        insetBossPokemonInfo();
                    }
                }
                currentPokeImg.className = "currentAttack";
                setTimeout(function() {
                    currentPokeImg.className = "";
                }, 1000);
                insetCurrentPokemonInfo();
                removeEventlisteners();
                myTurn = false;
                let mewtwoMakesAMoveSetTimeout = setTimeout(mewtwoMakesAMove, 1000);
            }
        });
    }
}

function mewtwoMakesAMove() {
    if (myTurn == false) {
        let randomNumber = Math.floor(Math.random() * 4);
        currentFightingPokemon[0].currentHP = currentFightingPokemon[0].currentHP - mewtwo[0].moves[randomNumber].movePower;
        if (currentFightingPokemon[0].currentHP <= 0) {
            currentFightingPokemon[0].currentHP = 0;
            currentPokeImg.classList.add("pokemon-dead");
            fightBtn.removeEventListener("click", showMoves);
            pokemonBtn.addEventListener("click", showPokemonList);
            insetCurrentPokemonInfo();
            overlayHeading.innerText = `${currentFightingPokemon[0].name} has fainted, whitch Pokémon!`;
        } else {
            addEventlisteners();
            insetCurrentPokemonInfo();
        }
        bossPokeImg.className = "mewtwoAttack";
        updateCurrentFightPokeInListCurrentHP();
        checkNumberOfDeadPokemons();
        setTimeout(function() {
            bossPokeImg.className = "";
        }, 1000);
        myTurn = true;
    }
}

const checkNumberOfDeadPokemons = () => {
    let pokemonItem = document.querySelectorAll(".content-pokemon-list-item");
    let deadPokemons = 0;
    for (let i = 0; i < trainerList.length; i++) {
        if (trainerList[i].currentHP == 0) {
            deadPokemons++
            if (!pokemonItem[i].classList.contains("pokemon-dead")) {
                pokemonItem[i].classList.add("pokemon-dead");
                pokemonItem[i].removeEventListener("click", chooseThisPokemon);
            }
        }
    }
    if (deadPokemons == trainerList.length) {
        resultpage.children[0].innerText = `You have been defeated by Mewtwo, restart and try again!`;
        resultpage.classList.add("show-resultpage");
        removeEventlisteners();
    }
}

const addEventOnPokemonBtn = () => {
    pokemonBtn.addEventListener("click", showPokemonList);
}

const addEventOnBackBtn = () => {
    backBtn.addEventListener("click", hidePokemonList);
}

const addEventOnPokemonsInBag = () => {
        let pokemonItem = document.querySelectorAll(".content-pokemon-list-item");
        for (let i = 0; i < pokemonItem.length; i++) {
            pokemonItem[i].addEventListener("click", chooseThisPokemon);
        }
    }
    /* EventListeners END */

const showMoves = () => {
    if (overlay.classList.contains("show-overlay")) {
        overlay.classList.add("hide-overlay");
        overlay.classList.remove("show-overlay");
    }
}

const chooseThisPokemon = (e) => {
    let pickedPokemonName = e.target.id;
    let pickedPokemon = "";
    for (let i = 0; i < trainerList.length; i++) {
        if (trainerList[i].name == pickedPokemonName) {
            pickedPokemon = trainerList[i];
            currentFightingPokemon.pop();
            currentFightingPokemon.push(pickedPokemon);
            if (currentPokeImg.classList.contains("pokemon-dead")) {
                currentPokeImg.classList.remove("pokemon-dead");
            }
            insetCurrentPokemonInfo();
            calculateMewtwoAttack();
            hidePokemonList();
            addEventlisteners();
        }
    }
}

const updateCurrentFightPokeInListCurrentHP = () => {
    let pokemonInBagCurrentHP = document.querySelectorAll(".current-hp");
    let pokemonInBagName = document.querySelectorAll(".pokemon-name");
    for (let i = 0; i < trainerList.length; i++) {
        if (currentFightingPokemon[0].name == trainerList[i].name) {
            trainerList[i].currentHP = currentFightingPokemon[0].currentHP;
            pokemonInBagCurrentHP[i].innerText = trainerList[i].currentHP;
        }
    }
}

const showPokemonList = () => {
    pokemonBag.classList.add("show-poke-list");
    pokemonBag.classList.remove("hide-poke-list");
}

const hidePokemonList = () => {
    pokemonBag.classList.add("hide-poke-list");
    pokemonBag.classList.remove("show-poke-list");
}

const insetPokemons = () => {
    let pokeBag = document.querySelector(".content-pokemon-list");
    for (let i = 0; i < trainerList.length; i++) {
        let pokeWrapper = document.createElement("DIV");
        pokeWrapper.classList.add("content-pokemon-list-item");
        pokeWrapper.setAttribute("id", trainerList[i].name);
        pokeBag.appendChild(pokeWrapper);

        let pokemonImg = document.createElement("IMG");
        pokeWrapper.appendChild(pokemonImg);
        /* Insetting pokemon sprite */
        pokemonImg.src = trainerList[i].imgSprite;

        let infoContainer = document.createElement("DIV");
        infoContainer.classList.add("content-pokemon-list-item-info");
        pokeWrapper.appendChild(infoContainer);

        let namelvlContainer = document.createElement("DIV");
        namelvlContainer.classList.add("content-pokemon-list-item-info-namelvl");
        infoContainer.appendChild(namelvlContainer);

        let pokeName = document.createElement("P");
        pokeName.classList.add("pokemon-name");
        namelvlContainer.appendChild(pokeName);
        /* Insetting pokemon name */
        pokeName.innerText = trainerList[i].name;

        let pokeLvl = document.createElement("P");
        pokeLvl.classList.add("pokemon-lvl");
        namelvlContainer.appendChild(pokeLvl);
        /* Insetting pokemon Level */
        pokeLvl.innerText = `lvl. ${trainerList[i].lvl}`;

        let pokeHpWrapper = document.createElement("DIV");
        pokeHpWrapper.classList.add("content-pokemon-list-item-info-hp");
        infoContainer.appendChild(pokeHpWrapper);

        let hpText = document.createElement("P");
        hpText.classList.add("hp-text");
        pokeHpWrapper.appendChild(hpText);
        /* Insetting HP text */
        hpText.innerText = "HP:";

        let hpValueWrapper = document.createElement("DIV");
        pokeHpWrapper.appendChild(hpValueWrapper);

        let hpValueOne = document.createElement("P");
        hpValueOne.classList.add("hp-value");
        hpValueOne.classList.add("current-hp");
        hpValueWrapper.appendChild(hpValueOne);
        /* Insetting current HP */
        hpValueOne.innerText = trainerList[i].currentHP;

        let hpValueTwo = document.createElement("P");
        hpValueTwo.classList.add("hp-value");
        hpValueWrapper.appendChild(hpValueTwo);
        /* Insetting HP "/" devider */
        hpValueTwo.innerText = " / ";

        let hpValueThree = document.createElement("P");
        hpValueThree.classList.add("hp-value");
        hpValueWrapper.appendChild(hpValueThree);
        /* Insetting starting max HP */
        hpValueThree.innerText = trainerList[i].HP;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    calculateHP();
    calculateAttack();
    calculateMewtwoAttack();
    insetBossPokemonInfo();
    insetCurrentPokemonInfo();
    insetPokemons();
    addEventOnPokemonBtn();
    addEventOnFightBtn();
    addEventOnMoves();
    addEventOnPokemonsInBag();
    addEventOnBackBtn();
});