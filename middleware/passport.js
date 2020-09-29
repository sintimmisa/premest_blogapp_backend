const jwtStrategy=require('passport-jwt').Strategy;
const extractJWT=require('passport-jwt').ExtractJwt;

const User =require('../models/User');

//jwtToken obj will contain our jwt token and secret key

const jwtToken ={};
jwtToken.jwtFromRequest =extractJWT.fromAuthHeaderAsBearerToken();
jwtToken.secret=SECRET;

const passportStrategy=(passport)=>{
    // when the jwtToken Obtj is passed in the jwtStrategy, we get jwt_payload in the call back(ie: id and user)
    passport.use(
        new jwtStrategy(jwtToken,(jwt_payload,done)=>{
            User.findOne({
                _id:jwt_payload.id
            }).then(user=>{
//find a user with matching id in DB and return either no error and user obj or false if user is not found
                if(user){//when user is found:true
                    return done(null,user);
                }else{//when user is not found:false
                    return done(null,false);
                }
            }).catch(err=>{
                console.log({error:"Error authenticating the user"})
            });
        })
    )

}

module.exports= passport;