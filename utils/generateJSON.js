import { writeFile } from 'fs';

var partyLetterMap = {
    V: 0,
    MP: 1,
    S: 2,
    C: 3,
    L: 4,
    M: 5,
    KD: 6,
    SD: 7,
    "-": 8
}

async function main(params) {
    const response = await fetch("https://data.riksdagen.se/personlista/?iid=&fnamn=&enamn=&f_ar=&kn=&parti=&valkrets=&rdlstatus=&org=&utformat=json&sort=sorteringsnamn&sortorder=asc&termlista=")
    const data = await response.json();
    var personArray = []
    for (var person in data.personlista.person) {
        var namn = data.personlista.person[person].tilltalsnamn + " " + data.personlista.person[person].efternamn
        var parti = partyLetterMap[data.personlista.person[person].parti];
        var valkrets = data.personlista.person[person].valkrets
        var bild = data.personlista.person[person].bild_url_max;
        var personObject = {name: namn, party: parti, constituency: valkrets, image_url: bild}
        personArray.push(personObject);
    }
    let randomPersonArray = [];
    //push 366 random people from personArray to randomPersonArray
    for (let i = 0; i < 366; i++) {
        let randomNumber = Math.floor(Math.random() * personArray.length)
        randomPersonArray.push(personArray[randomNumber])
    }
    writeFile('members.json', JSON.stringify(randomPersonArray), (err) => err && console.error(err));
}


main().catch(console.error)