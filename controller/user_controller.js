// const User  = require("../config/mongoose");
const User = require("../models/user");
const fs = require('fs');
const path = require('path');
module.exports.profile = function(req,res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile',{
            title: "Home",
            profile_user: user
        });
    });
}

module.exports.update = async function(req, res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         return res.redirect('back');
    //     });
    // }else{
    //     return res.status(401).send('Unauthorised');
    // }
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){console.log('*****Multer error: ', err)}

                // console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }

                    //this is saving the path of uploaded file
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        }catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }
    }else{
        req.flash('error', 'Unauthorized');
        return res.status(401).send("Unauthorized");
    }
}

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title: "Codiol | Sign Up"
    });
}

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: "Codiol | Sign In"
    });
}

module.exports.create = function(req, res)
{
    if(req.body.password != req.body.confirm_password)
    {
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log("error in finding user"); return}

        if(!user)
        {
            User.create(req.body, function(err, user)
            {
                if(err){console.log('error in creating user');return}

                return res.redirect('/users/sign-in');
            });
        }else{
            req.flash('success', 'You have signed up, login to continue');
            return res.redirect('back');
        }
    });
}

module.exports.createSession = function(req,res)
{
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'Logged out Successfully');
    
    return res.redirect('/');
}