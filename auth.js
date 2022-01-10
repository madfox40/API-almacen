const JwtStrategy = require('passport-jwt').Strategy; //Estrategia de autentificación
const ExtractJwt = require('passport-jwt').ExtractJwt;

//Aquí estamos cambiando la información dentro de la libreria passport para que funcione como queremos
module.exports = (passport) => { 
    //Le estamos pasando la libreria de passport como parámetro 
    // y luego ya elegimos la extensión del plugin en este caso jwtStrategy
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: 'secretPassword'
    }
    //Le decimos a passport que use JwtStrategy(una estrategia de autentificación usando JWT)
    //(Le pasamos en un json en este caso opts)
    // el JWT y la contraseña con el que se  ha creado
    //Con la contraseña y el token solo tiene que desencriptarlo
    //Esta estrategia es la que decodifica los tokens
    passport.use(new JwtStrategy(opts, (decoded, done) =>{
        console.log('decoded jwt', decoded); //Aquí mostramos el jwt decodificado
        return done(null, decoded); // Done(error en caso de que haya error, el usuario (Es decir lo que hemos decodificado))
    }));
}