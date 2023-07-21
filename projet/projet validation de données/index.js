const express = require("express")
const cors = require('cors');
const port = process.env.PORT || 5000
const app = express()
const bcrypt = require("bcrypt")
const data =require ('./data')
const fs = require('fs');
const path = require('path');
const { Console } = require("console");
app.use(express.json());


app.use(express.urlencoded({extended: false}))



app.post("/inscription", async(req,res)=>{
    try {
        const saltRound = 10 ; //pour garentir l'unicité du cryptage 
        const password= req.body.password.toString();
        const hasedPassword = await bcrypt.hash(password, saltRound);
        if (req.body.mail != req.body.mailConfirmation || password!=req.body.passwordConfirmation){
            console.log("mot de passe ou email différent.");
            const errorMessage = "Veuillez entrer un mot de passe et un e-mail identiques aux valeurs de confirmation.";
            res.render("inscription.ejs", { errorMessage: errorMessage });
        }else{
            const newUsers = {
                id: Date.now().toString(),
                name: req.body.nom,
                mail : req.body.mail,
                password: hasedPassword,
            };
            data.users.push(newUsers);
            // Chemin du fichier data.js
            const filePath = path.join(__dirname, 'data.js');

            // Création du contenu à écrire dans le fichier
            const fileContent = `const data = ${JSON.stringify(data, null, 2)}
module.exports = data;`;
            // Écriture du contenu dans le fichier
            fs.writeFile(filePath, fileContent, (err) => {
            if (err) {
                console.error("Erreur lors de l'écriture du fichier :", err);
            } else {
                console.log("Les informations des utilisateurs ont été écrites dans le fichier data.js.");
            }
            });
            res.redirect("/connexion")            
        }


    } catch (error){
        console.log(error)
        res.redirect("/inscription")
    }
})
app.post("/connexion", async (req, res) => {
    try {
      let userFound = false;
      for (let user of data.users) {
        if (user.mail === req.body.mail) {
          userFound = true;
          const result = await bcrypt.compare(req.body.password, user.password);
          if (result) {
            console.log("Le mot de passe est correct.");
          } else {
            console.log(`Le mot de passe est incorrect. data -> ${data.users.password} /n password -> ${req.body.password}`);
          }
          break;
        }
      }
  
      if (!userFound) {
        console.log("Aucun compte avec cet e-mail trouvé.");
      }
    } catch (error) {
      console.error("Erreur lors de la comparaison des mots de passe :", error);
    }
  });
  
  

//partie création des routes
app.get('/',(req,res)=>{
    res.render("index.ejs")
})

app.get('/inscription',(req,res)=>{
    res.render("inscription.ejs")
})

app.get('/connexion',(req,res)=>{
    res.render("connexion.ejs")
})
//fin de la création des routes


//pour contrer le problème du cross politique de merde 
app.use(cors({
    origin: 'http://127.0.0.1:5000'
}));


app.listen(port,()=>{
    console.log("le serveur est encore en vie")
})