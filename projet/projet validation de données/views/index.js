const express = require("express")
const cors = require('cors');
const port = process.env.PORT || 5000
const app = express()
const bcrypt = require("bcrypt")



const users =[]
app.use(express.urlencoded({extended: false}))

app.post("/inscription", async(req,res)=>{
    try {
        const hasedPassword = await bcrypt.hash(req.body.password)
        users.push({
            id: Date.now().toString(),
            name: req.body.nom,
            mail : req.body.mail,
            password: hasedPassword,
        })
        console.log(users);
        res.redirect("/connexion")
        alert("votre compte a bien été créer")
    } catch (error){
        console.log(error)
        res.redirect("/inscription")
    }
})

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


//pour contrer le problème du cross politique
app.use(cors({
    origin: 'http://127.0.0.1:5000'
}));


app.listen(port,()=>{
    console.log("le serveur est encore en vie")
})