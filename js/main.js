addEventListener('load', function() {
    document.getElementById('play').addEventListener('click', 
    function(){
       const alias = prompt("Introdueix l'àlies: ");
        console.log(alias);
    });

    document.getElementById('options').addEventListener('click', 
    function(){
        console.error("Opció no implementada");
    });

    document.getElementById('saves').addEventListener('click', 
    function(){
        console.error("Opció no implementada");
    });

    document.getElementById('exit').addEventListener('click', 
    function(){
        console.warn("No es pot sortir!");
    });
});