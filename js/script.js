//Ce document contient la gestion des différents éléments interactifs de la page

var timer;
var timeCountdown = 200; //A CHANGER AVANT DE REMETTRE
var nom;
var count = 2;

const wallpaperPaths = ["bliss.png", "bigchungus.jpg", "lilwayne.jpg"]


addEventListener('load', function afficherBackground() {
    wallpaper(0);
    document.body.style.backgroundSize = "cover";
});

addEventListener('load', function afficherDebut() {
    var popupContainer = document.createElement("div");
    popupContainer.style.display = "flex";
    popupContainer.style.width = "100%";
    popupContainer.style.alignItems = "center";
    popupContainer.id = "popupContainer";
    popupContainer.style.justifyContent = "center";
    document.getElementById("zoneJeu").appendChild(popupContainer);

    var popup = document.createElement("h2");
    popup.style.backgroundColor = "white"
    popup.style.width = "30%";
    popup.style.height = "20%";
    popup.id = "popup";
    popup.style.border = "10px solid black";
    popup.style.padding = "20px";
    popup.innerHTML = "The Falling Bouilloire<br>Pour commencer, appuyez sur une touche du clavier"; //Peut-être un peu de peaufinement à faire
    document.getElementById("popupContainer").appendChild(popup);
})

window.onload = init; //Je dois utiliser cette méthode pour les getelementbyid car sinon ceux-ci sont null puisqu'ils n'ont pas encore été loadés

function init() {
    if (getCookie("nom") == null) {
        nom = prompt("Quel est votre nom?");
        setCookie("nom", nom, 30);
    } else {
        nom = getCookie("nom");
    }

    //Rediriger les éléments du menu à leur fonction
    const btnQuit = document.getElementById("quit");
    btnQuit.addEventListener("click", quit, false);

    const btnRestart = document.getElementById("restart");
    btnRestart.addEventListener("click", restart, false);

    //Changement de fond d'écran
    const btnWall1 = document.getElementById("wallpaper1");
    btnWall1.addEventListener("click", function () {
        wallpaper(0); //Cette méthode est utilisée afin de passer une valeur à la fonction
    }, false);

    const btnWall2 = document.getElementById("wallpaper2");
    btnWall2.addEventListener("click", function () {
        wallpaper(1);
    }, false);

    const btnWall3 = document.getElementById("wallpaper3");
    btnWall3.addEventListener("click", function () {
        wallpaper(2);
    }, false);

    //Changement de taille de la police
    const btnFont1 = document.getElementById("font1");
    btnFont1.addEventListener("click", function () {
        font(0);
    }, false);

    const btnFont2 = document.getElementById("font2");
    btnFont2.addEventListener("click", function () {
        font(1);
    }, false);

    const btnFont3 = document.getElementById("font3");
    btnFont3.addEventListener("click", function () {
        font(2);
    }, false);

    const howTo = document.getElementById("howto");
    howTo.addEventListener("click", howto, false);

    const About = document.getElementById("about");
    About.addEventListener("click", about, false);

    document.body.addEventListener('keydown', clearPopup, false);
}

function quit() {
    if (window.confirm("Êtes-vous certain de vouloir quitter?")) {
        window.close(); //Ne marche pas toujours, puisque window.close peut seulement être utlisé par une page ayant été ouverte par le script
    }
}

function clearPopup() {
    var popup = document.getElementById("popup");
    document.body.removeEventListener('keydown', clearPopup, false);
    popup.innerHTML = 3;
    popup.style.fontSize = "4em";
    popup.style.textAlign = "center";

    timer = setInterval(function () {
        handleTimer(count);
    }, timeCountdown);
}

function handleTimer() { //Utilisé pour faire un countdown avant le debut du jeu
    if (count === 0) {
        document.getElementById("popupContainer").style.display = "none";
        clearInterval(timer);
        commencerJeu();
    } else {
        document.getElementById("popup").innerHTML = count;
        count--;
    }
}

function restart() {
    location.reload();
}

function wallpaper(num) {
    document.body.style.backgroundImage = "url('images/" + wallpaperPaths[num] + "')";
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function font(choice) {
    var size;
    switch (choice) {
        case 0:
            size = ".7em";
            break;

        case 1:
            size = "1em";
            break;

        case 2:
            size = "1.6em";
            break;
    }
    document.getElementById("dropd").style.fontSize = size;
}

function howto() {
    alert("Voici comment jouer le jeu\nPour commencer, ça prend un taureau.");
}

function about() {
    alert("Jeu programmé par Alexis Leclerc, administrateur de pistacherigolo.com")
}