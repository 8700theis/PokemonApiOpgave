let trainerName = "";

const nameSubmit = document.querySelector(".content-btn-submit");

console.log(trainerName);

nameSubmit.addEventListener("click", (e) => {
    let inputValue = document.querySelector(".content-btn-input").value;
    if (inputValue == "") {
        e.target.attributes.href.value = "#";
    } else {
        trainerName = inputValue;
        /* Jeg gemmer min trainerName variabel i localstorage med navnet som første parameter
        Derved kan jeg altid få fat i variablen fra local Storage med metoden .getItem("første-parameter-i-setItem") */
        localStorage.setItem("trainer-name", trainerName);
        e.target.attributes.href.value = "pokemonPick.html";
    }
});