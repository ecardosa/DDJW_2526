# Emma Cardosa Martínez - Joc de Memòria - GDDV

## 1. Introducció

  Joc de memòria amb JavaScript i HTML5. El joc consisteix a trobar grups de cartes, s'ha implementat un sistema de puntuació i la possibilitat de continuar partides començades.

## 2. Descripció del disseny del joc

  He creat dos modes de joc:

  - El primer es configura manualment la dificultat, el número de cartes, si s'ha de trobar parelles, trios...

  - El segon consisteix a anar superant nivells cada cop més difícils, on el nombre de cartes augmenta, la penalització d'error és cada cop més gran, el temps en el qual les cartes es giren disminueix, etc.

## 3. Descripció de les parts més rellevants de la implementació

 ### Cartes

 He creat amb SVG tres tipus de cartes: un cercle, una estrella i una mitja lluna, totes tenen dos colors: granats i blaves.

 ### .JS

 He creat i modificat els fitxers .js per poder implementar tot el que la practica necessitava, on cada fitxer gestiona diferents coses. Podent guardar la partida en qualsevol moment o que es guardi un Rankin amb puntuacions dels diferents jugadors.

## 4. Conclusions i problemes trobats

He pogut aprendre i millorar la meva pràctica amb el JavaScript. En quant l'HTML i CSS, crec que el tinc bastant dominat.

- A l'hora de fer els SVG, sobretot la mitja lluna, al principi no aconseguia que es vegi bé pel càlcul de les coordenades en dibuixar les formes.

- A l'hora d'implementar que es guardessin les partides per poder reprendre-les més tard m'ha costat molt, no trobava la manera de fer-ho, però al final he implementat el saves.js per poder fer-ho.

