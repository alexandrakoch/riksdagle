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
var guessesResult = ["⬜", "⬜", "⬜", "⬜"]
var answer = 0;

function formCallback(event) {
    event.preventDefault();
    var guessedPartyId = partyMap[party.value];
    var span = document.getElementById("guess" + guesses);
    if (guessedPartyId == answer) {
        span.innerText = "🟩";
        guessesResult[guesses] = "🟩";
        submitButton.disabled = true;
        party.disabled = true;
        alert("Rätt svarat! " + guessesResult.join(""));
    }
    else if (guessedPartyId > answer) {
        span.innerText = "⬅️"
        guessesResult[guesses] = "⬅️"
    }
    else if (guessedPartyId < answer) {
        span.innerText = "➡️"
        guessesResult[guesses] = "➡️"
    }
    if (guesses == 3 & guessedPartyId != answer) {
        submitButton.disabled = true;
        party.disabled = true;
    }
    guesses++;
    party.value = "";
}

if(form.addEventListener) {
    form.addEventListener("submit", formCallback, false);
}