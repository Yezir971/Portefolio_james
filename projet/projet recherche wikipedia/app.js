const inputText = document.querySelector('.inputText');
const sortie = document.querySelector('.sortie');
const buttonRecherche = document.querySelector('.buttonRecherche');
var token = "123ABC";


buttonRecherche.addEventListener('click', async function(){
    sortie.innerHTML = ""
    const recherche =inputText.value; 
    console.log(inputText.value);
    var response = await fetch(`https://fr.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${inputText.value}`);
    var data = await response.json();
    console.table(data);  
    /*window.open(response.url,'_blank');*/
    for(let i =0; i<20; i++){

        let card = document.createElement('div');
        let lienCard =document.createElement('a');
        let hyperTextCard = document.createElement('a');
        let descriptionCard = document.createElement('p');

        hyperTextCard.style.fontSize = "25px";
        lienCard.style.fontSize = "18px";
        descriptionCard.style.color="white";
        lienCard.style.textDecoration = "none";
        lienCard.style.color = "rgb(8, 131, 4)";

        lienCard.textContent = `https://fr.wikipedia.org/?curid=${data.query.search[i].pageid}`;
        lienCard.href = `https://fr.wikipedia.org/?curid=${data.query.search[i].pageid}`;
        hyperTextCard.href = `https://fr.wikipedia.org/?curid=${data.query.search[i].pageid}` ;
        hyperTextCard.textContent =  data.query.search[i].title;
        descriptionCard.innerHTML= data.query.search[i].snippet;


        sortie.appendChild(card);
        card.appendChild(hyperTextCard);
        card.appendChild(lienCard);
        card.appendChild(descriptionCard);
        card.classList.add("carte");
    }
});