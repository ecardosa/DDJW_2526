import {$} from "../library/jquery-4.0.0.slim.module.min.js";

let ranking = localStorage.ranking ? JSON.parse(localStorage.ranking) : [];
let body = $('#ranking-body');

if (ranking.length === 0){
    body.append('<tr><td colspan="4">No hi ha puntuacions encara</td></tr>');
} else {
    ranking.forEach((entry, idx) => {
        body.append(`<tr>
            <td>${idx + 1}</td>
            <td>${entry.alias}</td>
            <td>${entry.score}</td>
            <td>${entry.level}</td>
        </tr>`);
    });
}

$('#back').on('click', () => location.assign("../"));