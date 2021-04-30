const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = async function(req,res){
    // console.log(req.cookies);
    //res.cookie('user_id', 10);
    // Post.find({}, function(err, posts){
    //     return res.render('home',{
    //         title: "Codeiol | Home",
    //         posts: posts
    //     });
    // Post.find({})
    // .populate('user')
    // .populate({
    //     path: 'comments',
    //     populate: {
    //         path: 'user'
    //     }
    // })
    // .exec(function(err, posts){

    //     User.find({}, function(err, users){
    //         return res.render('home',{
    //             title: "Codeiol | Home",
    //             posts: posts,
    //             all_users: users
    //         });
    //     });
    // });
    try{
        let posts = await Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });

    let users = await User.find({});

    return res.render('home', {
        title: "COdeiol | Home",
        posts: posts,
        all_users: users
    });
    }catch(err){
        console.log('Error', err);
        return
    }
    
}

//using then
//Post.find({}).populate('comments).then(function());

//let posts = Post.find({}).populate('comments').exec();
//post.then()