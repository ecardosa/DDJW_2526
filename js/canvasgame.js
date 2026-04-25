import { $ } from "../library/jquery-4.0.0.slim.module.min.js";
import { CARDS } from "./cards.js";
import {
  clickCard,
  gameItems,
  selectCards,
  startGame,
  initCard,
  saveGame,
  getGameMode,
  getLevel,
} from "./memory.js";

let game = $("#game");
let canvas = game[0].getContext("2d");
let resources = {};
let cards = {};
const e_click = { click: false, x: -1, y: -1 };
let key = null;
const c_w = 96;
const c_h = 128;
let idxSel = -1;

if (canvas) {
  game.attr("width", 800);
  game.attr("height", 700);
  start();
  update();
}

function start() {
  selectCards();
  cards = gameItems.map((c) => {
    return { texture: c };
  });
loadCardResource(CARDS.back);

  let cols = Math.ceil(Math.sqrt(cards.length));
  let rows = Math.ceil(cards.length / cols);
  let padX = (800 - cols * (c_w + 10)) / 2;
  let padY = 80 + (600 - 80 - rows * (c_h + 10)) / 2;

  cards.forEach((card, indx) => {
    loadCardResource(card.texture);
    initCard((val) => (card.texture = val));

    let col = indx % cols;
    let row = Math.floor(indx / cols);
    let x = padX + col * (c_w + 10);
    let y = padY + row * (c_h + 10);

    card.position = {
      xMin: x,
      xMax: x + c_w,
      yMin: y,
      yMax: y + c_h,
    };
    card.onClick = function (cx, cy) {
      return (
        cx >= this.position.xMin &&
        cx <= this.position.xMax &&
        cy >= this.position.yMin &&
        cy <= this.position.yMax
      );
    };
  });

  $("#save").on("click", () => saveGame());
  $("#back").on("click", () => location.assign("../"));

  game.on("click", function (e) {
    e_click.click = true;
    e_click.x = e.pageX - this.offsetLeft;
    e_click.y = e.pageY - this.offsetTop;
  });
  $(document).keydown((e) => (key = e.key));
  startGame();
}

function update() {
  checkInput();
  draw();
  requestAnimationFrame(update);
}

function loadCardResource(src) {
  if (!resources[src]) {
    let res = { image: null, ready: false };
    res.image = new Image();
    res.image.src = src;
    res.image.onload = () => (res.ready = true);
    resources[src] = res;
  }
}

function draw() {
  canvas.reset();

  canvas.fillStyle = "#333";
  canvas.font = "20px Arial";
  canvas.fillText(`Mode: ${getGameMode()}`, 10, 30);
  canvas.fillText(`Nivell: ${getLevel()}`, 10, 55);

  cards.forEach((card, indx) => {
    let res = resources[card.texture];
    if (res && res.ready) {
      if (idxSel === indx)
        canvas.drawImage(
          res.image,
          card.position.xMin - 2,
          card.position.yMin - 2,
          c_w + 4,
          c_h + 4
        );
      else
        canvas.drawImage(
          res.image,
          card.position.xMin,
          card.position.yMin,
          c_w,
          c_h
        );
    }
  });
}

function checkInput() {
  if (e_click.click) {
    cards.some((card, indx) => {
      let click = card.onClick(e_click.x, e_click.y);
      if (click) clickCard(indx);
      return click;
    });
  }
  if (key) {
    let prevIndx = idxSel;
    switch (key) {
      case "Escape":
        saveGame();
        break;
      case "ArrowRight":
        idxSel = (idxSel + 1) % cards.length;
        break;
      case "ArrowLeft":
        idxSel = (idxSel - 1 + cards.length) % cards.length;
        break;
      case "Enter":
        if (idxSel >= 0) clickCard(idxSel);
        break;
      default:
        console.warn("Tecla " + key + " no reconeguda.");
    }
    if (idxSel != prevIndx) {
      if (prevIndx >= 0) {
        cards[prevIndx].position.xMin += 2;
      }
      cards[idxSel].position.xMin -= 2;
    }
  }
  e_click.click = key = false;
}
