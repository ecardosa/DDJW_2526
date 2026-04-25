import {$} from "../library/jquery-4.0.0.slim.module.min.js";

let saves = localStorage.saves ? JSON.parse(localStorage.saves) : {};
let list = $('#saves-list');
let keys = Object.keys(saves);

if (keys.length === 0){
    list.append('<p>No hi ha partides guardades</p>');
} else {
    keys.forEach(slot => {
        let s = saves[slot];
        let btn = $(`<button>
            Mode ${s.mode} — Nivell ${s.level} — ${s.score} punts
        </button>`);
        btn.on('click', () => {
            sessionStorage.load = JSON.stringify(s);
            sessionStorage.gameMode = s.mode;
            location.assign("./game.html");
        });
        list.append(btn);
        list.append('<br><br>');
    });
}

$('#back').on('click', () => location.assign("../"));