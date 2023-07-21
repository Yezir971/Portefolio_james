const express = require("express")

const router = express.Router()


router.get("/",(requ,res)=>{
    res.status(200).json({message:"log"})
})
// Route pour gérer l'inscription des utilisateurs

module.exports = router;