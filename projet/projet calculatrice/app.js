let buffer = "0";
let total = 0.0 ;
let previousOperator;
let entrer = "";    
let sortie = "";
let historique =[];
let positionHistorique = 0;
const contenerHistorique = document.getElementById('contenerHistorique');




const ecran = document.querySelector(".contenerEcran");

//fonction click
function buttonClick(value){
    if(isNaN(value)){
        selecteurSymbole(value);
        if ((value !="=") && (value != 'l') && (value !="←") ){
            entrer += value;
        }if (value =="←"){
            entrer = entrer.substring(0,entrer.length -1);  
        }
    }else{
        selecteurNombre(value);
        entrer+= value;
    }
    ecran.innerText = buffer;
    if (value=="="){
        historique.push(entrer);
        const newHistorique = {
            entrer : entrer,
            sortie: sortie.toString(),
        }
        historique.push(newHistorique);
        localStorage.setItem("historique",JSON.stringify(historique));
        ecritureVolet(historique);
    }
    if(value == "C"){
        entrer = "";
        console.log(historique); 
    }
    if (value == "effacer l'historique") {
      contenerHistorique.innerHTML = ''; // Supprimer le contenu de la zone de l'historique
      historique = []; // Réinitialiser l'historique
      localStorage.removeItem("historique"); // Supprimer l'historique du stockage local
    }
}



function ecritureVolet (historique){
  contenerHistorique.innerHTML = ''; // Supprimer le contenu de la zone de l'historique
  for (let element=2; element<historique.length; element+=3){
    const elementHistoriqueEntrer = document.createElement('p');
    const elementHistoriqueSortie = document.createElement('p'); 

    elementHistoriqueEntrer.innerText = historique[element].entrer;
    elementHistoriqueSortie.innerText = historique[element].sortie;

    elementHistoriqueSortie.style.color="blue";
    const lineBreak = document.createElement('br');

    contenerHistorique.appendChild(elementHistoriqueEntrer)
    contenerHistorique.appendChild(elementHistoriqueSortie)
    contenerHistorique.appendChild(lineBreak)
  }
}

//fonction de prise en charge des symbole
function selecteurSymbole(symbole){
    switch (symbole) {
        case 'C':
            buffer = '0';
            total = 0;
            break;
        case '=':
            if (previousOperator === null){
                return
            }
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = total;
            total = 0.0;
            break;
        case '←':
            if(buffer.length === 1){
                buffer = '0';
            }else{
                buffer = buffer.substring(0,buffer.length -1);
            }
            break;

        case '-':
        case '+':
        case 'x':
        case '÷':
            handleMath(symbole);
            break;
        case ',':
            if(!buffer.includes(".")){
                buffer = buffer +'.';
            }
            break;

        case "l":
            break;
        
    }
}



function handleMath(symbole) {
    if (buffer === '0') {
        return;
    }
  
    const floatBuffer = parseFloat(buffer); // Convertir le buffer en nombre à virgule flottante
    
  
    if (total === 0.0) {
      total = floatBuffer;

    } else {
      flushOperation(floatBuffer);
    }
  
    previousOperator = symbole;
    buffer = '0';
}
  
function flushOperation(floatBuffer) {

    if (previousOperator === "+") {
      total += floatBuffer;
    } else if (previousOperator === "-") {
      total -= floatBuffer;
    } else if (previousOperator === "x") {
      total *= floatBuffer;
    } else if (previousOperator === "÷") {
      if (floatBuffer === 0) {
        alert("division par 0");
        return;
      }
      total /= floatBuffer;
    } else if (previousOperator === ",") {
      // Calculer le nombre décimal après la virgule (décimale)
      const decimal = parseFloat(buffer) / Math.pow(10, buffer.length - 1);
  
      // Ajouter le nombre décimal au total
      total += decimal;
    }
    sortie = total;
    historique.push(sortie);
}
  
function selecteurNombre(number) {
    if (buffer.length >=15){
        alert("impossible de saisir plus de 15 chiffres.");
        buffer = buffer.substring(0,buffer.length -1);

    }
    if (buffer === "0") {
        buffer = number;
    } else {
      if (number === ",") {
        // Vérifier si le buffer ne contient pas déjà une virgule
        if (!buffer.includes(",")) {
          buffer += number;
        }
      } else {
        buffer += number;
      }
    }
  }
  
function init(){
    document.querySelector('.boutonClavier').addEventListener('click',function(event){
        buttonClick(event.target.innerText);
    })
    // Récupérer l'historique depuis le stockage local
    const historiqueJSON = localStorage.getItem("historique");
    if (historiqueJSON) {
      historique = JSON.parse(historiqueJSON);
    }

}
document.getElementById("effacerHistorique").addEventListener("click", function() {
  buttonClick("effacer l'historique");
});
init();
