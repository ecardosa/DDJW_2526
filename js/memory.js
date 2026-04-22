const resources = ['../resources/cb.png', '../resources/co.png',
                '../resources/sb.png', '../resources/so.png',
                '../resources/tb.png', '../resources/to.png'];
const back = '../resources/back.png';

const StateCard = Object.freeze({
  DISABLE: 0,
  ENABLE: 1,
  DONE: 2
});

const savedOptions = localStorage.options ? JSON.parse(localStorage.options) : {};
const gameMode = sessionStorage.gameMode || '1';

var game = {
    items: [],
    states: [],
    setValue: null,
    ready: 0,
    lastCards: [],
    score: 200,
    pairs: parseInt(savedOptions.pairs) || 2,
    groupSize: parseInt(savedOptions.groupSize) || 2,
    difficulty: savedOptions.difficulty || 'normal',
    mode: gameMode,
    level: parseInt(savedOptions.startDif) || 1,

    flipDelay: function(){
        switch(this.difficulty){
            case 'easy': return 1500;
            case 'hard': return 500;
            default: return 1000;
        }
    },

    penalty: function(){
        switch(this.difficulty){
            case 'easy': return 10;
            case 'hard': return 50;
            default: return 25;
        }
    },

    goBack: function(idx){
        this.setValue && this.setValue[idx](back);
        this.states[idx] = StateCard.ENABLE;
    },
    goFront: function(idx){
        this.setValue && this.setValue[idx](this.items[idx]);
        this.states[idx] = StateCard.DISABLE;
    },

    select: function(){
        if (sessionStorage.load){
            let toLoad = JSON.parse(sessionStorage.load);
            this.items = toLoad.items;
            this.states = toLoad.states;
            this.lastCards = toLoad.lastCards || [];
            this.score = toLoad.score;
            this.pairs = toLoad.pairs;
            this.groupSize = toLoad.groupSize || 2;
            this.mode = toLoad.mode || '1';
            this.level = toLoad.level || 1;
            this.difficulty = toLoad.difficulty || 'normal';
        }
        else{
            this._generateCards();
        }
    },

    _generateCards: function(){
        if (this.mode === '2'){
            this._applyProgressiveDifficulty();
        }
        this.score = 200 + this.level * 50;

        let pool = resources.slice();
        shuffe(pool);
        pool = pool.slice(0, this.pairs);

        this.items = [];
        pool.forEach(card => {
            for (let i = 0; i < this.groupSize; i++){
                this.items.push(card);
            }
        });
        shuffe(this.items);
        this.states = new Array(this.items.length).fill(StateCard.ENABLE);
        this.lastCards = [];
    },

    _applyProgressiveDifficulty: function(){
        let l = this.level;
        this.pairs = Math.min(2 + Math.floor(l / 3), 6);
        this.groupSize = Math.min(2 + Math.floor(l / 5), 4);
        if (l < 3) this.difficulty = 'easy';
        else if (l < 7) this.difficulty = 'normal';
        else this.difficulty = 'hard';
    },

    start: function(){
        this.items.forEach((_,indx)=>{
            if (this.states[indx] === StateCard.DISABLE ||
                this.states[indx] === StateCard.DONE){
                this.ready++;
            }
            else{
                setTimeout(()=>{
                    this.ready++;
                    this.goBack(indx);
                }, 1000 + 100 * indx);
            }
        });
    },

    click: function(indx){
        if (this.states[indx] !== StateCard.ENABLE || 
            this.ready < this.items.length) return;
        
        if (this.lastCards.includes(indx)) return;

        this.goFront(indx);
        this.lastCards.push(indx);

        if (this.lastCards.length === this.groupSize){
            let firstItem = this.items[this.lastCards[0]];
            let allMatch = this.lastCards.every(i => this.items[i] === firstItem);

            if (allMatch){
                this.lastCards.forEach(i => this.states[i] = StateCard.DONE);
                this.pairs--;
                this.lastCards = [];

                if (this.pairs <= 0){
                    if (this.mode === '2'){
                        this._nextLevel();
                    } else {
                        alert(`Has guanyat amb ${this.score} punts!`);
                        window.location.assign("../");
                    }
                }
            }
            else{
                let toFlip = this.lastCards.slice();
                this.lastCards = [];
                this.ready = 0;
                this.score -= this.penalty();

                if (this.score <= 0){
                    alert("Has perdut!");
                    window.location.assign("../");
                    return;
                }

                setTimeout(()=>{
                    toFlip.forEach(i => this.goBack(i));
                    this.ready = this.items.length;
                }, this.flipDelay());
            }
        }
    },

    _nextLevel: function(){
        let alias = sessionStorage.alias || 'Jugador';
        let ranking = localStorage.ranking ? JSON.parse(localStorage.ranking) : [];
        ranking.push({ alias: alias, score: this.score, level: this.level });
        ranking.sort((a,b) => b.score - a.score);
        ranking = ranking.slice(0, 10);
        localStorage.ranking = JSON.stringify(ranking);

        alert(`Nivell ${this.level} superat! Punts: ${this.score}`);
        this.level++;
        this._generateCards();
        this.ready = 0;
        this.setValue = null;
        window.location.reload();
    },

    save: function(slotName){
        let to_save = JSON.stringify({
            items: this.items,
            states: this.states,
            lastCards: this.lastCards,
            score: this.score,
            pairs: this.pairs,
            groupSize: this.groupSize,
            mode: this.mode,
            level: this.level,
            difficulty: this.difficulty,
            slot: slotName || ('partida_' + Date.now())
        });

        let saves = localStorage.saves ? JSON.parse(localStorage.saves) : {};
        let slot = slotName || ('partida_' + Date.now());
        saves[slot] = JSON.parse(to_save);
        localStorage.saves = JSON.stringify(saves);

        window.location.assign("../");
    }
}

function shuffe(arr){
    arr.sort(function () {return Math.random() - 0.5});
}

export var gameItems;
export function selectCards() {
    game.select();
    gameItems = game.items;
}
export function clickCard(indx){ game.click(indx); }
export function startGame(){ game.start(); }
export function initCard(callback) {
    if (!game.setValue) game.setValue = [];
    game.setValue.push(callback);
}
export function saveGame(slotName){ game.save(slotName); }
export function getGameMode(){ return game.mode; }
export function getLevel(){ return game.level; }