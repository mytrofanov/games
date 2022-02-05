import {$authHost} from './index'
import jwtDecode from "jwt-decode";
import {AxiosResponse} from "axios";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTY0NDA0NTMxOCwiZXhwIjoxNjQ0MTMxNzE4fQ.QQKN3uDEE7NAHgpOSmiphNB5pPAZtQMQayf757hT7Ok'

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Max not included, min included
}

export const registration = async (email, password) => {
    try {
        console.log('sent to register:' + ' email:' + email + ' password: ' + password)
        let promise = new Promise(function(resolve, reject) {
            window.setTimeout(function() {
                resolve(jwtDecode(token));
            },getRandomInt(80, 1200));
        });
        return promise;

    } catch (e) {
        console.log(e)
    }
}
export const login = async (email, password) => {
    try {
        console.log('sent to login:' + ' email:' + email + ' password: ' + password)
        let promise = new Promise(function(resolve, reject) {
            window.setTimeout(function() {
                resolve(jwtDecode(token));
            },getRandomInt(80, 1200));
        });
        return promise;
    } catch (e) {
        if (e.response.status === 403) {
            return e.response
        }
    }
}
export const check = async () => {
    try {
        let promise = new Promise(function(resolve, reject) {
            window.setTimeout(function() {
                resolve(jwtDecode(token));
            },getRandomInt(80, 1200));
        });
        return promise;

    } catch (e) {
        console.log(e)
    }

}