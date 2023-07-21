const key = "fad12ea3e68ca82c6b7d04660083295d";

const lieuAffiche = document.getElementById("lieu")
const lieux = document.getElementById("choixLieux")
const temperature = document.getElementById("zoneTexteTemperature");
const recherche = document.getElementById("boutonRecherche");
const vitesseVent = document.getElementById("vitesseVent");
const humidite = document.getElementById("humidite");
const contener = document.querySelector('.contener');
const contenerVentHumidite = document.querySelector('.vitesseVentHumidite');
const descriptionDuTemps= document.getElementById('descriptionDutemps');



const imageMeteo = document.getElementById("imageMeteo");
const imageGoute = document.getElementById("logoHumidite");
const imageVent = document.getElementById("logoVent");


recherche.addEventListener("click", function(){
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${lieux.value}&lang=fr&appid=${key}&units=metric`;
    fetch(url).then(response => response.json () ).then(data => {
        /*gestions des erreurs */
        if(lieux.value == "") {
            return

        }

        var cadreVentHumidite1 =document.getElementById('case1');
        var cadreVentHumidite = document.getElementById('case');
        temperature.innerText = `${data.main.temp}°C`;
        descriptionDuTemps.innerText =`${data.weather[0].description}`;
        lieuAffiche.innerText = `${lieux.value}`;
        imageGoute.src = "imageMeteo/animated/droplet-solid.svg"
        humidite.innerText = `${data.main.humidity} %`;
        imageVent.src="imageMeteo/animated/wind-solid.svg";
        vitesseVent.innerText =`${Math.round(data.wind.speed *3.6)*100/100} km/h`;

        switch(data.weather[0].icon){
            case '01d':
                imageMeteo.src = "imageMeteo/animated/day.svg";
                break;
            case '01n':
                imageMeteo.src = "imageMeteo/animated/night.svg";
                break;
            case '02d':
                imageMeteo.src = "imageMeteo/animated/cloudy.svg";
                break;
            case '02n':
                imageMeteo.src = "imageMeteo/animated/cloudy.svg";
                break;
            case '03d':
                imageMeteo.src = "imageMeteo/animated/cloudy-day-1.svg";
                break;
            case '03n':
                imageMeteo.src = "imageMeteo/animated/cloudy-night-1.svg";
                break;
            case '04d':
                imageMeteo.src = "imageMeteo/animated/cloudy-day-2.svg";
                break;
            case '04n':
                imageMeteo.src = "imageMeteo/animated/cloudy-night-2.svg";
                break;
            case '09d':
                imageMeteo.src = "imageMeteo/animated/rainy-2.svg";
                break;
            case '09n':
                imageMeteo.src = "imageMeteo/animated/rainy-4.svg";
                break;
            case '10d':
                imageMeteo.src = "imageMeteo/animated/rainy-1.svg";
                break;
            case '10n':
                imageMeteo.src = "imageMeteo/animated/rainy-7.svg";
                break;
            case '11d':
                imageMeteo.src = "imageMeteo/animated/thunder.svg";
                break;
            case '11n':
                imageMeteo.src = "imageMeteo/animated/thunder.svg";
                break;
            case '13d':
                imageMeteo.src = "imageMeteo/animated/snow-6.svg";
                break;
            case '13n':
                imageMeteo.src = "imageMeteo/animated/snow-6.svg";
                break;
            case '50d':
                imageMeteo.src = "imageMeteo/animated/foog.png";
                break;
            case '50n':
                imageMeteo.src = "imageMeteo/animated/foog.png";
                break;


        }
        imageMeteo.style.height='200px';

        lieuAffiche.style.fontSize="20px";
        temperature.style.fontSize="20px";
        descriptionDuTemps.style.fontSize="20px"



        cadreVentHumidite.style.padding = "20px"
        cadreVentHumidite1.style.padding = "20px"
        cadreVentHumidite.style.border = "solid 1px";
        cadreVentHumidite1.style.border = "solid 1px";
        cadreVentHumidite.style.borderRadius = "30px";
        cadreVentHumidite1.style.borderRadius = "30px";

        

        contener.style.display='';
        contenerVentHumidite.style.display='';
        contener.classList.add('fadeIn');
        contenerVentHumidite.classList.add('fadeIn');
        contener.style.height='500px';




    });
});

