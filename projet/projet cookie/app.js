const  toutAccepter = document.querySelector('.toutAccepter');
const  toutRefuser = document.querySelector('.toutRefuser');


function loveCookie (nom , accepter, temps){
    const date = new Date() ;
    const milliSeconde = 60*60*24*365;
    date.setTime(date.getTime() + (temps * milliSeconde) );
    const tempsExpiration = "expires =" + date.toUTCString();
    document.cookie = `${nom} = ${accepter}; ${tempsExpiration}  ;  path=/`;
}

toutAccepter.addEventListener("click",function(){
    console.log("envoie les informations cookie");
    loveCookie("cookie",true,30);
    document.querySelector('.contenerCookie').style.display = "none";
});

toutRefuser.addEventListener("click",function(){
    document.cookie = `cookie = false ; path=/`;
    console.log("cookie non envoyer :(");
    document.querySelector('.contenerCookie').style.display = "none";
});