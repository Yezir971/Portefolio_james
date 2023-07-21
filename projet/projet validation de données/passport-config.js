const localStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")

function initialize(passport){
    const authentificateUsers = async(email,password,done)=>{
        const user = getUserByEmail(email)
        if (user==null){
            return done (null,false,{message :"pas d'utilisateurs trouvé avec cette adresse email"})
        }
        try{
            if (await bcrypt.compare(password, user.password)){
                return done (null,user)
        }
        }catch(error){
            console.log(error);
            return done(error)

        }
    }
    passport.use(new localStrategy({usernameField :'email'}))
    passport.serelizeUser((user,done)=>{})
    passport.deserelizeUser((id,done)=>{})
}

module.exports = initialize