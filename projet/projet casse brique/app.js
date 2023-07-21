document.addEventListener('keydown', interactionToucheDown);
document.addEventListener('keyup',interactionToucheUp);

const contenerEcran = document.querySelector('.contenerEcran');
const tailleEcran = contenerEcran.offsetWidth;
var canvas = document.getElementById("myCanvas");
var dessinBalleRaquette = canvas.getContext("2d");

var score = 0;
var monScore=document.createElement('p');
var interval ;

var gameOver = document.querySelector(".gameOver");
var winner = document.querySelector(".winner");



/*-----propriété des briques-----*/

    //taille des briques
var briqueHeight= 40;
var briqueWidth = 90;
    //espace entre les briques
var espaceBriqueTopBottom = 20;
var espaceBriqueLeftRight = 20;
    //création du tableau de brique ligne collone
var colloneBrique = 5;
var ligneBrique = 4;
    //tableau qui va stocker les positions de chaque brique dans un tableau de tableau 
var tableauBrique = [];

/*-----fin des propriété des briques-----*/

/*-----propriétée de la raquette -----*/

var raquetteHeight = 10;
var raquetteWidth = 70;
    //position initiale de la raquette
var raquettePositionX = (canvas.width - raquetteWidth)/2;
    //variable pour donner l'ilusion du déplacement fluide de la raquette
var leftPresse = false;
var rightPresse = false;
    //touche espace sert à lancer la partie 
var spacepresse = false ;

/*-----fin propriété de la raquette-----*/

/*-----propriété de la balle-----*/

    //position initiale de la balle
var x = canvas.width/2;
var y = canvas.height-30;
    //valeur de déplacement de la balle
var dx = 2;
var dy = -2;
    //rayon de la balle stocker dans une variable 
const ballRadius = 10;

/*-----fin propriété de la balle-----*/

for (let i=0; i<colloneBrique; i++ ){
    tableauBrique[i]=[];
    for (let j = 0; j<ligneBrique; j ++){
        tableauBrique[i][j] = {x : 0, y : 0,existance : 1};
    }
}

winner.addEventListener("click", function(){
    document.location.reload();
});

gameOver.addEventListener("click", function(){
    document.location.reload();
});

function interactionToucheDown(event){
    if (event.code == "ArrowLeft"){
        leftPresse = true;
    }else if (event.code == "ArrowRight"){
        rightPresse = true;
    }else if (event.code == "Space"){
        spacepresse = true;
    }
}
function interactionToucheUp(event){
    if (event.code == "ArrowLeft"){
        leftPresse = false;
    }else if (event.code == "ArrowRight"){
        rightPresse = false;
    }
}

//collision balle brique 
function modifColisionBrique (){
    for (let i =0; i<colloneBrique; i++){
        for(let j=0; j<ligneBrique; j++){
            if (tableauBrique[i][j].existance === 1){
                if (
                    tableauBrique[i][j].x + briqueWidth > x-ballRadius && 
                    tableauBrique[i][j].x < x+ballRadius && 
                    tableauBrique[i][j].y + briqueHeight > y -ballRadius &&
                    tableauBrique[i][j].y < y+ballRadius 
                    ){
                    dy= -dy;
                    tableauBrique[i][j].existance = 0;
                    score ++;
                }               
            }
        }
    }
}

function dessinBrique (){
    for (let i=0; i<colloneBrique; i++ ){
        for (let j = 0; j<ligneBrique; j ++){
            if (tableauBrique[i][j].existance == 1){
                tableauBrique[i][j].x = (i+1)*espaceBriqueLeftRight+briqueWidth*i;
                tableauBrique[i][j].y = (j+1)*espaceBriqueTopBottom+briqueHeight*j;
                dessinBalleRaquette.beginPath();
                dessinBalleRaquette.rect(tableauBrique[i][j].x,tableauBrique[i][j].y,briqueWidth,briqueHeight);
                dessinBalleRaquette.fillStyle = "orange";
                dessinBalleRaquette.fill();
                dessinBalleRaquette.closePath();
            }
        }
    }
}

function drawBall() {
    dessinBalleRaquette.beginPath();
    dessinBalleRaquette.arc(x, y, ballRadius, 0, Math.PI*2);
    dessinBalleRaquette.fillStyle = "#0095DD";
    dessinBalleRaquette.fill();
    dessinBalleRaquette.closePath();
}
function dessinRaquette(){
    dessinBalleRaquette.beginPath();
    dessinBalleRaquette.rect(raquettePositionX,canvas.height-raquetteHeight-10,raquetteWidth,raquetteHeight);
    dessinBalleRaquette.fillStyle = "blue";
    dessinBalleRaquette.fill();
    dessinBalleRaquette.closePath();
}

function draw() {
    monScore.innerText=`score : ${score}`;
    monScore.style.marginTop="20px"
    monScore.style.border = " solid black";
    monScore.style.textAlign="center";
    contenerEcran.appendChild(monScore);
    if (score == ligneBrique * colloneBrique){
        winner.style.display = "flex";
        clearInterval(interval);
        return;
    }
    if (spacepresse){
        dessinBalleRaquette.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        dessinRaquette();
        dessinBrique();
        modifColisionBrique();
    }
    //collision de la balle avec l'écran a droite et a gauche  
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius ) {
        dx = -dx;
    }
    //collision bas de l'écran avec la balle et création du game over 
    if(y + dy > canvas.height+20) {
        gameOver.style.display = "flex";
        clearInterval(interval);
        return;
    //collision haut de l'écran avec la balle
    }else if(y + dy < ballRadius){
        dy = -dy;
    }
    //colision balle raquette 
    if (raquettePositionX + raquetteWidth > x && raquettePositionX < x && y + dy == canvas.height-raquetteHeight-10){
        dy = -dy;
    }
    // déplacement de la raquette sur l'axe x
    if (leftPresse && raquettePositionX > 0 ){
        raquettePositionX +=-7;
    }else if (rightPresse && raquettePositionX < canvas.width-raquetteWidth ){
        raquettePositionX +=7;
    }
    x += dx;
    y += dy;
}
draw(); 
interval = setInterval(draw, 11);


/* 
function interactionToucheDown(event){
    console.log(tailleEcran)
    const keycode = event.code;
    switch (keycode) {
        case "ArrowLeft":
            if (positionX == 0){
                console.log(positionX);
                break;
            }
            positionX-=50;
            console.log(positionX);
            break;
        case "ArrowRight":
            if (positionX == tailleEcran-72){
                console.log("taille de l'écran" +tailleEcran);
                break;
            }
            positionX+=50;
            console.log(positionX);
            break;
    }
    raquette.style.left = positionX + 'px';
}*/