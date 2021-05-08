const Post = require('../models/post')
const Comment = require('../models/comment')

module.exports.create= async function(req, res){
        try{
              let post =  await Post.create({
                content: req.body.content,
                user: req.user._id
            });

            if(req.xhr){
                // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            post = await post.populate('user', 'name').execPopulate();
                return res.status(200).json({
                    data: {
                        post: post
                    },
                    message: "Post created!"
                })
            }
            
            req.flash('success', 'post created successfully!!');
            return res.redirect('back');
        }catch(err){
            console.log('Error', err);
            req.flash('error', err);
            return res.redirect('back');
        }
        
}


module.exports.destroy = async function(req, res){
    // Post.findById(req.params.id, function(err, post){

    //     // . id means converting the object id into string
    //     if(post.user == req.user.id){
    //         post.remove();

    //         Comment.deleteMany({post: req.params.id}, function(err){
    //             return res.redirect('back');
    //         });
    //     }
    //     else{
    //         return res.redirect('back');
    //     }
    // });
    try{
        let post = await Post.findById(req.params.id);

    if(post.user == req.user.id){
        post.remove();

        await Comment.deleteMany({post: req.params.id});

        if(req.xhr){
            return res.status(200).json({
                data: {
                    post_id: req.params.id
                },
                message: "Post deleted"
            });
        }

        req.flash('success', 'post deleted successfully!!');
        return res.redirect('back');
    }
    else{
        req.flash('error', 'you cannot delete this post!!')
        return res.redirect('back');
    }
    }catch(err){
        req.flash('error', 'post creating post!!')
        console.log('Error', err);
        return res.redirect('back');
    }
}