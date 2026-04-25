addEventListener('load', function() {
    function setAlias(){
        let alias = prompt("Introdueix el teu nom:", "Jugador");
        if (alias === null || alias.trim() === ""){
            setAlias();
        } else {
            sessionStorage.alias = alias.trim();
        }

    }
    
    
    document.getElementById('play').addEventListener('click', 
    function(){
        setAlias();
        sessionStorage.removeItem('load');
        sessionStorage.gameMode = '1';
        window.location.assign("./html/game.html");
    });

    document.getElementById('play2').addEventListener('click', 
    function(){
        setAlias();
        sessionStorage.removeItem('load');
        sessionStorage.gameMode = '2';
        window.location.assign("./html/game.html");
    });

    document.getElementById('scores').addEventListener('click', 
    function(){
        window.location.assign("./html/scores.html");
    });

    document.getElementById('options').addEventListener('click', 
    function(){
        window.location.assign("./html/options.html");
    });

    document.getElementById('saves').addEventListener('click', 
    function(){
        window.location.assign("./html/saves.html");
    });

    document.getElementById('exit').addEventListener('click', 
    function(){
        console.warn("No es pot sortir!");
    });
});