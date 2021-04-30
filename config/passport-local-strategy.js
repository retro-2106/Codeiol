const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
    function(req, email, password, done){
        User.findOne({email: email}, function(err, user){
            if(err){
                console.log('error in finding passport');
                req.flash('error', err);
                return done(err);
            }

            if(!user || user.password != password){
                console.log('Invalid username/ password');
                req.flash('error', 'Invalid username/password');
                return done(null, false);
            }

            return done(null, user);
        });
    }
));


//serializing the user to deicde when key is to be kept in cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

//deserialize
passport.deserializeUser(function(id,done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user -->>Passport');
            return done(err);
        }

        return done(null, user);
    });
});

passport.checkAuthentication = function(req, res, next){
    //if the user is signed in,
    //then pass on the request to next function
    if(req.isAuthenticated()){
        return next();
    }

    //if user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains current signed in user
        //from the session
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;