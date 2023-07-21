const express = require("express")
const cors = require('cors');
const port = process.env.PORT || 5000

const app = express()

const inscription = require("./routes/users")
app.use("/inscription",inscription)

app.use(cors({
    origin: 'http://127.0.0.1:5000'
}));

app.listen(port,()=>{
    console.log("Serveur en ligne")
})


const bouttonEnvoyer = document.getElementById('inscription');
bouttonEnvoyer.addEventListener("click", function() {
    const mail = document.getElementById('mail');
    const confirmationMail = document.getElementById('confirmationMail');
    const motDePasse = document.getElementById('motDePasse');
    const confirmationMotDePasse = document.getElementById('confirmationMotDePasse');

    if ((mail.value != confirmationMail.value) || (motDePasse.value != confirmationMotDePasse.value)) {
        alert("Mot de passe ou mail différent");
        return;
    }
    if (!mail.value || !confirmationMail.value || !confirmationMotDePasse.value || !confirmationMotDePasse.value) {
        alert("Veuillez compléter tous les champs");
        return;
    }

    const compte = {
        motDePass: motDePasse.value,
        mail: mail.value
    };

    const chargeUtile = JSON.stringify(compte);

    fetch("http://localhost:5500", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: chargeUtile
    })
    .then(response => {
        if (response.ok) {
            alert("Information valide, vous pouvez vous connecter");
        } else {
            alert("Une erreur s'est produite lors de la création du compte");
        }
    })
    .catch(error => {
        alert("Une erreur s'est produite lors de la communication avec le serveur");
        console.error(error);
    });
});



