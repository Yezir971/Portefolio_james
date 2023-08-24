const labelRangeMotDePasse = document.getElementById('labelRangeMotDePasse');
const allRanges = document.querySelectorAll(".longeurMotDePasse");
const rangeMDP = document.getElementById('rangeMDP');
const bubble = document.querySelector(".bubble");
const Maj = document.getElementById('Majuscule');
const Min = document.getElementById('Minuscule');
const cs = document.getElementById('cs');
const chi = document.getElementById('Chiffres');
const motDePasseFinal = document.querySelector('.motDePasseGenerer');
const toucheGenerer = document.querySelector('.generer');
const copier = document.querySelector('.copier');
const fiabiliteMotDePasse = document.querySelector('.fiabiliteMotDePasse');
const bruteForce = document.querySelector('.tempsPourTrouverLeMotDePasse');

const dataEntropie = [
    {name : "Faible", color :"red",range: [0,40]},
    {name : "Moyen", color :"purple",range: [40,60]},
    {name : "Fort", color :"blue",range: [60,80]},
    {name : "Très fort", color :"green",range: [80,Infinity]},
];



var listeCompositionBinaire = ["0","1","0","0"]
var liste = [];

let response = await fetch('data.json');
let caractere = await response.json();
var symbole;


function MotDePasseRandom(taille, liste){
    let motDePasse ="";
    for(let i=1; i<=taille; i++){
        let indexe = Math.floor(Math.random() * liste.length);
        motDePasse += caractereRandom(indexe,liste) 
    }
    return motDePasse;
}

function caractereRandom(indexe, liste){
    let positionRandom = Math.floor(Math.random() * liste[indexe].length);
    symbole = liste[indexe][positionRandom];
    return symbole;
}
Maj.addEventListener('click', function(){

    if (Maj.checked){
        liste.push(caractere[0].Majuscule);
        listeCompositionBinaire[0] = "1";
    }else{
        if(liste.length==1){
            Maj.checked=true;
            return 
        }
        listeCompositionBinaire[0] = "0";
        liste.splice(liste.indexOf(caractere[0].Majuscule),1);
    }
});
Min.addEventListener('click', function(){
    if(Min.checked){
        liste.push(caractere[0].Minuscule);
        listeCompositionBinaire[1] = "1";
    }else{
        if(liste.length==1){
            Min.checked=true;
            return 
        }
        liste.splice(liste.indexOf(caractere[0].Minuscule),1);
        listeCompositionBinaire[1] = "0";
    }
});
chi.addEventListener('click', function(){
    if(chi.checked){
        liste.push(caractere[0].Chiffres);
        listeCompositionBinaire[2] = "1";
    }else{
        if(liste.length==1){
            chi.checked=true;
            return 
        }
        listeCompositionBinaire[2] = "0";
        liste.splice(liste.indexOf(caractere[0].Chiffres),1);
    }
});
cs.addEventListener('click', function(){
    if(cs.checked){
        liste.push(caractere[0].caratereSpeciaux);
        listeCompositionBinaire[3] = "1";
    }else{
        if(liste.length==1){
            cs.checked=true;
            return 
        }
        listeCompositionBinaire[3] = "0";
        liste.splice(liste.indexOf(caractere[0].caratereSpeciaux),1);
    }
});

allRanges.forEach(function() {
    liste.push(caractere[0].Minuscule)
    let mdp = MotDePasseRandom(rangeMDP.value,liste)
    rangeMDP.addEventListener("input", () => {
        let mdp = MotDePasseRandom(rangeMDP.value,liste)
        motDePasseFinal.innerText = `${mdp}` ;
        carteEntropie();
        carteBruteForce(mdp);
        setBubble(bubble);
    });
    setBubble(bubble);
    carteEntropie();
    carteBruteForce(mdp);
    motDePasseFinal.innerText = `${mdp}` ;
});
function setBubble(bubble) {
  const val = rangeMDP.value ;
  bubble.innerHTML = `${val}`;
}

toucheGenerer.addEventListener('click', function(){
    let mdp = MotDePasseRandom(rangeMDP.value,liste);
    carteEntropie();
    carteBruteForce(mdp);
    motDePasseFinal.innerText = `${mdp}`;
});

copier.addEventListener('click', function(){
    navigator.clipboard.writeText(motDePasseFinal.innerText);
});

function carteBruteForce(mdp){
    bruteForce.innerHTML = "";
    let minute , heure, jour, annee ;
    let seconde = vitesseDeCalcul(complexite(rangeMDP.value,listeCompositionBinaire));
    annee = seconde /(24*60*60*365);
    jour = annee*365;
    heure = jour * 24;
    minute = heure *60;
    seconde = Math.floor(seconde % 60);
    minute = Math.floor(minute %60);
    heure = Math.floor(heure%24);
    jour = Math.floor(jour % 365);
    annee = Math.floor(annee);
    if(annee==0 && jour==0 && heure==0 && minute == 0 && seconde == 0){
        let brute = document.createElement('p');
        brute.textContent = `Avec le pire algorithme, on trouve instantanément le mot de passe : ${mdp}.`;
        bruteForce.appendChild(brute);
        return;
    }
    if (annee==0 && jour==0 && heure==0 && minute == 0){
        let brute = document.createElement('p');
        brute.textContent = `Avec le pire algorithme il faut environ ${seconde} seconde , pour trouver le mot de passe : ${mdp}.`;
        bruteForce.appendChild(brute);
        return;
    }
    if(annee==0 && jour==0 && heure==0){
        let brute = document.createElement('p');
        brute.textContent = `Avec le pire algorithme il faut environ ${minute} minute,${seconde} seconde , pour trouver le mot de passe : ${mdp}.`;
        bruteForce.appendChild(brute);
        return;
    }
    if(annee==0 && jour==0){
        let brute = document.createElement('p');
        brute.textContent = `Avec le pire algorithme il faut environ ${heure} heure, ${minute} minute,${seconde} seconde , pour trouver le mot de passe : ${mdp}.`;
        bruteForce.appendChild(brute);
        return;
    }
    if (annee == 0){
        let brute = document.createElement('p');
        brute.textContent = `Avec le pire algorithme il faut environ ${jour} jour, ${heure} heure, ${minute} minute,${seconde} seconde , pour trouver le mot de passe : ${mdp}.`;
        bruteForce.appendChild(brute);
        return;
    }
    let brute = document.createElement('p');
    brute.textContent = `Avec le pire algorithme il faut environ  ${annee} ans, ${jour} jour, ${heure} heure, ${minute} minute,${seconde} seconde , pour trouver le mot de passe : ${mdp}.`;
    bruteForce.appendChild(brute);
}
function carteEntropie(){
    let entrop = entropie(complexite(rangeMDP.value,listeCompositionBinaire));
    for(let i= 0; i<dataEntropie.length ; i++){
        let min = dataEntropie[i].range[0];
        let max = dataEntropie[i].range[1];
        if ( entrop <=max && entrop >= min ){
            fiabiliteMotDePasse.innerHTML =""
            const fiabilite = document.createElement('p');
            fiabilite.innerHTML=`Mot de passe ${dataEntropie[i].name}`;
            fiabiliteMotDePasse.style.backgroundColor=`${dataEntropie[i].color}`;
            fiabiliteMotDePasse.appendChild(fiabilite);
        }
    }
}
function complexite (LongeurMotDePasse, CompositionMotDePasse){
    let caractereDifferent = 0;
    if (CompositionMotDePasse[0]=="1"){
        caractereDifferent += 26;
    }
    if (CompositionMotDePasse[1]=="1"){
        caractereDifferent += 26;
    }
    if(CompositionMotDePasse[2]=="1"){
        caractereDifferent +=10;
    }
    if(CompositionMotDePasse[3]=="1"){
        caractereDifferent += 32;
    }
    let resultat = Math.pow(caractereDifferent,LongeurMotDePasse);
    return resultat
}
function entropie(Complexite){
    let resultat =0;
    resultat = Math.log2(Complexite);
    return resultat;
}
function vitesseDeCalcul(Complexite){
    let resultat =0;
    let pow = Math.pow(10,9);
    resultat = Complexite/pow;
    return resultat;
}

/*

                                                        partie fonction debug

function majusculeRandom(){
    let positionRandom = Math.floor(Math.random() * caractere[0].Majuscule.length);
    symbole = caractere[0].Majuscule[positionRandom];
    return symbole;
}

function MinusculeRandom(){
    let positionRandom = Math.floor(Math.random() * caractere[0].Minuscule.length);
    symbole = caractere[0].Minuscule[positionRandom];
    return symbole;
}

function ChiffresRandom(){
    let positionRandom = Math.floor(Math.random() * caractere[0].Chiffres.length);
    symbole = caractere[0].Chiffres[positionRandom];
    return symbole;
}

function caratereSpeciauxRandom(){
    let positionRandom = Math.floor(Math.random() * caractere[0].caratereSpeciaux.length);
    symbole = caractere[0].caratereSpeciaux[positionRandom];
    return symbole;
}
function debugCalcul(){
        console.log("entropie = " + entropie(complexite(rangeMDP.value,listeCompositionBinaire)));
        console.log("vitesse de calcul = " + vitesseDeCalcul(complexite(rangeMDP.value,listeCompositionBinaire)));
        console.log(listeCompositionBinaire);
}

let pull =["abrico","peche","pomme","bannane","prune"];
let select = "bannane";
let a = pull.indexOf("prune");
pull.splice(a,1);
console.log(a);
console.log(pull);
*/