export var trainerName = "";

const nameSubmit = document.querySelector(".content-btn-submit");

console.log(trainerName);

nameSubmit.addEventListener("click", (e) => {
    let inputValue = document.querySelector(".content-btn-input").value;
    if (inputValue == "") {
        e.target.attributes.href.value = "#";
    } else {
        trainerName = inputValue;

        e.target.attributes.href.value = "pokemonPick.html";
    }
});