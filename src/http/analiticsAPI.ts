import jwtDecode from "jwt-decode";

let uuid = require("uuid");


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Max not included, min included
}

let serverData = []
for (let i=0; i<1000; i++) {
    let id = uuid.v4();
    serverData.push(id+id)
}

export const fetchDataFromServer = async () => {
    try {
        let promise = new Promise(function(resolve, reject) {
            window.setTimeout(function() {
                resolve(serverData);
            },getRandomInt(80, 1200));
        });
        return promise;

    } catch (e) {
        console.log(e)
    }
}
