var form = document.getElementById("form");
var party = document.getElementById("party");
var partyMap = {
    Vänsterpartiet: 0,
    Miljöpartiet: 1,
    Socialdemokraterna: 2,
    Centerpartiet: 3,
    Liberalerna: 4,
    Moderaterna: 5,
    Kristdemokraterna: 6,
    Sverigedemokraterna: 7,
    Vilde: 8,
}

//get fixed elements
const submitButton = document.getElementById("submit")
const resultsDialog = document.getElementById("resultsModal")
const closeModalButton = document.getElementById("closeModal")

//get variable elements 
const resultsMessage = document.getElementById("resultsMessage")
const resultsEmoji = document.getElementById("resultsEmoji")

var guesses = 0;
var partyAnswer;
var guessesResult = ["⬜", "⬜", "⬜", "⬜"]
function daysIntoYear(date) {
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}

async function fillData() {
    try {
        const response = await fetch("members.json")
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        let dayOfYear = daysIntoYear(new Date());
        partyAnswer = json[dayOfYear].party
        document.getElementById("portrait").src = json[dayOfYear].image_url;
    } catch (error) {
        console.error(error.message);
    }


}


function formCallback(event) {
    event.preventDefault();
    var guessedPartyId = partyMap[party.value];
    var span = document.getElementById("guess" + guesses);
    if (!party.value) {
        return;
    }
    if (guessedPartyId == partyAnswer) {
        span.innerText = "🟩";
        guessesResult[guesses] = "🟩";
        submitButton.disabled = true;
        party.disabled = true;
        alert("Rätt svarat! " + guessesResult.join(""));
        resultsMessage.innerText = "Snyggt jobbat!"
        resultsEmoji.innerText = guessesResult.join("")
        resultsDialog.showModal();
    }
    else if (guessedPartyId > partyAnswer) {
        span.innerText = "⬅️"
        guessesResult[guesses] = "⬅️"
    }
    else if (guessedPartyId < partyAnswer) {
        span.innerText = "➡️"
        guessesResult[guesses] = "➡️"
    }
    if (guesses == 3 & guessedPartyId != partyAnswer) {
        submitButton.disabled = true;
        party.disabled = true;
        resultsMessage.innerText = "Pyramidalt klumpigt!"
        resultsEmoji.innerText = guessesResult.join("")
        resultsDialog.showModal()
    }
    guesses++;
    party.value = "";
}
fillData();
form.addEventListener("submit", formCallback, false);
closeModalButton.addEventListener("click", () => {
    resultsDialog.close();
});