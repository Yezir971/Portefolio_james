const contenerJeu = document.querySelector('.contenerJeu');
const choixNiveau = document.querySelector('.choixNiveau');
const retourAcceuil = document.querySelector('.retourAcceuil');
const carteJeu = document.querySelector('.carteJeu');
const text = document.querySelector('.text');
const winnerBox = document.querySelector('.winnerBox');
var baseDonne = {image:["fish-solid.svg","fort-awesome.svg","martini-glass-citrus-solid.svg",
"martini-glass-solid.svg","plane-solid.svg","sun-solid.svg","temperature-full-solid.svg",
"umbrella-beach-solid.svg","volleyball-solid.svg","water-ladder-solid.svg"]}
var informationImage = [];
var nombreCarte= 0;
var nombreDeCoupGagnant = 0;
var imagePrecedente =[];




function bouttonClick(value,event){
    if (event.target === contenerJeu){
        return;
    }
    switch (value) {
        case "niveau 1":
            nombreCarte = 4;
            initialisationCarte (nombreCarte);
            choixNiveau.style.display = "none";
            retourAcceuil.style.display= "block";
            text.style.display = "none";
            break;
        case "niveau 2":
            nombreCarte = 8;
            initialisationCarte (nombreCarte);
            choixNiveau.style.display = "none";
            retourAcceuil.style.display= "block";
            text.style.display = "none";
            break;
        case "niveau 3":
            nombreCarte = 12;
            initialisationCarte (nombreCarte);
            choixNiveau.style.display = "none";
            retourAcceuil.style.display= "block";
            text.style.display = "none";
            break;
        case "niveau 4":
            nombreCarte = 16;
            initialisationCarte (nombreCarte);
            choixNiveau.style.display = "none";
            retourAcceuil.style.display= "block";
            text.style.display = "none";
            break;
        case "niveau 5":
            nombreCarte = 20;
            initialisationCarte (nombreCarte);
            choixNiveau.style.display = "none";
            retourAcceuil.style.display= "block";
            text.style.display = "none";
            break;
        case "retour":
            choixNiveau.style.display = "block";
            retourAcceuil.style.display= "none";
            text.style.display = "block";
            informationImage = [];
            winnerBox.style.display = "none";
            carteJeu.innerHTML = "";
            break;
    }
}

function listeVide(nombreCarte){
    let vide = [];
    for (let i = 0; i<nombreCarte; i++){
        vide.push("");
    }
    return vide;
}
function listeRemplie(nombreCarte,imageRandomChoisi){
    let pics = listeVide(nombreCarte);
    let i = 0;
    let r = 0;
    let pass = 0;
    while (i < nombreCarte/2){
        r = Math.floor(Math.random() * (pics.length));
        if (pics[r] == ""){
            pics[r] = imageRandomChoisi[i];
            pass++; 
        }
        if (pics[r]!=""){
            r = Math.floor(Math.random() * (pics.length));
        }
        if (pass==2){
            pass = 0;
            i++;
        }
    }
    return pics
}


function initialisationCarte (nombreCarte){
    let imageRandomChoisi =[];
    let imageRandom = [...baseDonne.image];// Utilisation d'Array.from() pour créer une copie
    for (let i = 0; i<nombreCarte/2; i++){
        let c = Math.floor(Math.random() * (imageRandom.length));
        imageRandomChoisi.push(imageRandom[c])
        imageRandom.splice(c, 1);
    }

    const imageDefinitif = listeRemplie(nombreCarte,imageRandomChoisi);

    carteJeu.innerHTML = "";
    for(let i =0 ; i< nombreCarte ; i++){
        const carte2 = document.createElement('img');
        const carte1 = document.createElement('img');

        const frontCard = document.createElement('div');
        const backCard = document.createElement('div');
        const carte = document.createElement('div');

        carte.classList.add('carte');
        frontCard.classList.add('frontCard');
        backCard.classList.add('backCard');
        carte1.classList.add('gri-item');
        carte2.classList.add('gri-item');

        carte2.src = 'imageProjet/back_card.svg';
        carte1.src = "imageProjet/"+imageDefinitif[i];

        frontCard.appendChild(carte2);
        backCard.appendChild(carte1);

        carte.appendChild(frontCard);
        carte.appendChild(backCard);

        carteJeu.appendChild(carte);

        var info ={ id : `${i+1}` , etat : 0 , paire : 2, image : `imageProjet/${imageDefinitif[i]}`}

        informationImage.push(info);

        var coup = 0;
        carte.addEventListener('click',function(){
            if (carte.classList.contains('flipped') || informationImage[i].etat === 1) {
                return; // Ignorer le retournement si la carte est déjà retournée ou si la paire a déjà été trouvée
            }
            carte.classList.toggle('flipped')
            coup ++;
            if (coup == 2 && imagePrecedente.image == informationImage[i].image){
                coup=0;
                informationImage[i].etat = 1;
                imagePrecedente.etat = 1;
                nombreDeCoupGagnant++;
                imagePrecedente = [];
                console.log(informationImage)

            }
            if (coup==2){
                for (let i=0 ; i<nombreCarte ; i++){
                    if (carteJeu.children[i].classList.contains('flipped') && informationImage[i].etat === 0){
                        setTimeout(function(){
                            carteJeu.children[i].classList.toggle('flipped');
                        },1000);
                    }
                }

                imagePrecedente = [];
                coup =0;
            }
            if(nombreDeCoupGagnant == nombreCarte/2){
                winnerBox.style.display = "flex";
                winnerBox.addEventListener("click", function(){
                    document.location.reload();
                });
                nombreDeCoupGagnant=0;

            }
            imagePrecedente = informationImage[i];
            console.log(informationImage[i].id)
        })
    }
    console.log(informationImage);

    

}

 
function init (){
    contenerJeu.addEventListener("click", function(event){
        bouttonClick(event.target.innerText, event);
    });
}

init();
