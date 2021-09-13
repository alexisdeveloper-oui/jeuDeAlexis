var pointage = 0;

function commencerJeu() {
    var scoreCont = document.createElement("li");
    scoreCont.id = "scoreCont";
    scoreCont.style.marginLeft = "auto";
    document.getElementById("dropd").append(scoreCont);

    var score = document.createElement("div");
    score.id = "score";
    document.getElementById("scoreCont").appendChild(score);

    afficherPoints();

    var personnage = document.createElement("canvas");
    personnage.id = "personnage";
    personnage.style.width = "100px";
    personnage.style.height = "125px";
    personnage.style.cursor = "pointer";
    personnage.style.background = "url(images/bouilloire.png)";
    document.getElementById("zoneJeu").appendChild(personnage);

    compterScore();
}

function afficherPoints() {
    var score = document.getElementById("score");
    score.innerHTML = nom + " : " + pointage;
}

function compterScore() {
    document.getElementById("personnage").addEventListener("click", function () {
        pointage++;
        afficherPoints();
    })
}