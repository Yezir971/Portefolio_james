const contenerTexte = document.querySelector('.contenerTexte');
const saisie = document.querySelector('.saisie');
const count = document.querySelector('.count');
const buttonChoix = document.querySelector('.buttonChoix');
const contenerTexteTimerCount = document.querySelector('.contenerTexteTimerCount');
const contenerSaisie = document.querySelector('.contenerSaisie');

const texte = document.getElementById('texte');


let temps=120;
let motIndexe =0;
let mots=[];
let listeMotsvierge=[];
let motSaisie="";
let nombreErreur = 0;

let choix; 
let response = await fetch("texte.json")
let TexteData = await response.json();
var positionMotTexte = 0; 


function initPage(){
    buttonChoix.style.display = "none";
    contenerTexteTimerCount.style.display = "flex";
    contenerSaisie.style.display = "flex";
    /*console.log(texte.innerText=TexteData[choix]);*/
    texte.innerText=TexteData[choix].texteVisible;
    listeMotsvierge=TexteData[choix].texteVisible.split(' ');
    mots = TexteData[choix].texteVisible.split(' ');
    saisie.focus();
    selecteurDeMot(positionMotTexte);
    demarrerCompteur();
}

buttonChoix.addEventListener('click', function(event){
    switch (event.target.innerText) {
        case "Texte 1":
            choix = 0;
            initPage();
            break;
        case "Texte 2":
            choix = 1;
            initPage();
            break;
    }
});

function demarrerCompteur() {
    const timer = document.getElementById('timer');
    
    const intervalID = setInterval(() => {
        let minutes = parseInt(temps / 60, 10);
        let secondes = parseInt(temps % 60, 10);
        timer.innerText = `${minutes}:${secondes}`;
        if (minutes === 0 && secondes === 0) {
            alert(`Votre vitesse de frappe moyenne est de ${calculScore(nombreErreur, 120)} MPM`);

            clearInterval(intervalID); // Arrête l'intervalle si nécessaire
            return;
        }
        temps--;
    }, 1000);
}

function selecteurDeMot(index) {
    if (index < mots.length) {
        if (index > 0) {
            mots[index - 1] = mots[index - 1].replace('<span class="partieColorier">', '').replace('</span>', '');
        }
        mots[index] = `<span class="partieColorier">${mots[index]}</span>`;
        texte.innerHTML = mots.join(' ');
        motIndexe++;
    }
}
saisie.addEventListener('keydown',function(event){
    /*console.log(event)*/
    if (event.code == "Space"){
        if (motSaisie!=listeMotsvierge[positionMotTexte]){
            nombreErreur++;
            count.innerText = `${nombreErreur}`;
        }
        motSaisie ="";
        saisie.value='';
        positionMotTexte++;
        selecteurDeMot(positionMotTexte);
        if (positionMotTexte === mots.length){
            if (nombreErreur == mots.length){
                alert(`0 effort, comme le score de ton MPM...`);
                clearInterval(intervalID); // Arrête l'intervalle si nécessaire
                return;
            }
            alert(`Votre vitesse de frappe moyenne est de ${calculScore(nombreErreur, 120-temps+1)} MPM`);
            clearInterval(intervalID); // Arrête l'intervalle si nécessaire
            return;
        }
    }
    if (event.code == "Backspace"){
        let newMotSaisie = motSaisie.substring(0, motSaisie.length -1);
        motSaisie = newMotSaisie;
    }
    /*console.log(motSaisie);*/
if (
    event.code != "Enter" &&
    event.code != "Backspace" && 
    event.code !="Tab" && 
    event.code != "MetaLeft" && 

    event.code != "ShiftLeft" && 
    event.code != "ShiftRight" &&

    event.code != "ControlLeft" && 
    event.code !="ControlRight" &&

    event.code != "AltLeft" && 
    event.code !="AltRight"&&

    event.code != "Escape"&&

    event.code != "ArrowRight"&&
    event.code != "ArrowUp"&&
    event.code != "ArrowLeft"&&
    event.code != "ArrowDown" &&

    event.code!= "F1" && 
    event.code!="F2" && 
    event.code!="F3" && 
    event.code!="F4" && 
    event.code!="F5" && 
    event.code!="F6"&& 
    event.code!="F7" && 
    event.code!="F8"&& 
    event.code!="F9" && 
    event.code!="F10" && 
    event.code!="F11" &&
    event.code!="F12"
){
        if(motSaisie === " "){
            motSaisie = event.key;
        }else{
            motSaisie += event.key;
        }
    }

});

function calculScore(nombreErreur, tempDeFrappe){
    let score = 0;
    score = (TexteData[choix].nombreDeFrappe -(nombreErreur * 6))/((tempDeFrappe/60)*6) ;
    return score ;

}