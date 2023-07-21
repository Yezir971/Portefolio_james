const bigDAta = [
    {name : "Maigreur", color :"midnightblue",range: [0,18]},
    {name : "Bonne santé", color :"green",range: [18.5,25]},
    {name : "Surpoids", color :"lightcoral",range: [25,30]},
    {name : "Obésité modérée", color :"orange",range: [30,35]},
    {name : "Obésité sévère", color :"crimson",range: [35,40]},
    {name : "Obésité morbide", color :"purple",range: [40,Infinity]},
];

const resultatContener = document.getElementById("resultatContener");
const bouttonCalculer = document.getElementById("btn-calculer-imc");
bouttonCalculer.addEventListener("click", function(event){
    /*permet de ne pa actualiser la page au moment ou l'on clique sur le button */
    event.preventDefault();

    var poids  = parseFloat( document.getElementById("poids").value);
    var taille = parseFloat( document.getElementById("taille").value);
    
    var resultat = calculIMC(taille,poids);

    /*réinitialise le contenue */
    resultatContener.innerHTML = "";
    
    for (let i=0 ;i<=bigDAta.length;i++ ){
        /**
         colision 1. l'utilisateur a entré une ou plusieurs valeurs qui ne correspondent pas a des nombres.
         colision 2. lutilisateur a entré une taille et un poids impossible (en gros il existe pas).
         **/ 
        if ((isNaN(taille) == true || isNaN(poids) == true) || (taille <= 0) || (poids <= 0) ){
            var texteResultatElement = document.createElement("p");

            texteResultatElement.textContent="Remplissez correctement les inputs.";

            resultatContener.appendChild(texteResultatElement)

            break;
        }

        var min = bigDAta[i].range[0];
        var max = bigDAta[i].range[1];
        

        if (min <= resultat && max>= resultat){
            /*creation du dom*/
            var valeurIMC = document.createElement("p");
            var texteResultatElement = document.createElement("p");

            //affectations des vonnes valeurs aux bonnes varriables
            valeurIMC.innerHTML=`${resultat} <br>`;
            texteResultatElement.innerHTML= `Résultat : ${bigDAta[i].name}` ;


            //coloration de la valeur de l'imc
            valeurIMC.style.color = bigDAta[i].color;

            //on rattache valeurIMC et texteResultatElement à resultatContener
            resultatContener.appendChild(valeurIMC)
            resultatContener.appendChild(texteResultatElement)

            break;//on sort de la boucle car pas besoin de tester les autres valeurs.

        }else if (bigDAta[i].range[1] == Infinity && resultat>=max){
            /*creation du dom*/
            var valeurIMC = document.createElement("p");
            var texteResultatElement = document.createElement("p");

            //affectations des vonnes valeurs aux bonnes varriables
            valeurIMC.innerHTML=`${resultat} <br>`;
            texteResultatElement.textContent= `Résultat : ${bigDAta[i].name}` ;


            //coloration de la valeur de l'imc
            valeurIMC.style.color = bigDAta[i].color;

            //on rattache valeurIMC et texteResultatElement à resultatContener
            resultatContener.appendChild(valeurIMC)
            resultatContener.appendChild(texteResultatElement)

            break;//on sort de la boucle car pas besoin de tester les autres valeurs.
        }
    }
            
    //style du texte
    valeurIMC.style.fontSize= "50px";
    valeurIMC.style.fontWeight ="50px";
    texteResultatElement.style.fontSize = "30px"

});

function calculIMC (taille,poids){
    /*on divise par 100 car on demande la taille de l'individue en cm or on veut du kg/m² et 1cm est un centième de mètre  */
    taille=taille/100;
    var result = Math.round(poids/(taille*taille)*100)/100;
    return result;
}