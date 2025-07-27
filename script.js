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
var submitButton = document.getElementById("submit")
var guesses = 0;
var partyAnswer;
var guessesResult = ["⬜", "⬜", "⬜", "⬜"]
function daysIntoYear(date){
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}

async function fillData() {
    try {
        const response = await fetch("members.json")
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        let dayOfYear = daysIntoYear(new Date());
        partyAnswer = json[dayOfYear].party
        document.getElementById("portrait").src=json[dayOfYear].image_url;
    } catch (error) {
        console.error(error.message);
    }
    

}


function formCallback(event) {
    event.preventDefault();
    var guessedPartyId = partyMap[party.value];
    var span = document.getElementById("guess" + guesses);
    if (guessedPartyId == partyAnswer) {
        span.innerText = "🟩";
        guessesResult[guesses] = "🟩";
        submitButton.disabled = true;
        party.disabled = true;
        alert("Rätt svarat! " + guessesResult.join(""));
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
    }
    guesses++;
    party.value = "";
}
fillData();
form.addEventListener("submit", formCallback, false);