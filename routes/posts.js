const express =require('express');
const Posts =require('../models/posts');

const router = express.Router();

//Save posts

router.post('/post/save', (req,res)=>{

    let newPosts = new Posts(req.body);

    newPosts.save((err)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        return res.status(200).json({success:"Posts saved successfully"});
    });
});

//Get posts

router.get('/posts',(req,res)=>{
    Posts.find().exec((err,posts)=>{
        if(err){
            return res.status(400).json({error:err});

        }
return res.status(200).json({
    success:true,
    existingPosts:posts
});

    });
});

//Update posts

router.put('/posts/update/:id',(req,res)=>{
    Posts.findByIdAndUpdate(
        req.params.id,
        {$set:req.body},
        (err,post)=>{
            if(err){
                return res.status(400).json({error:err})
            }
            return res.status(200).json({
                success:"Updated successfully"
            });
        }
        

    )
   
} );


//Delete posts



router.delete('/post/delete/:id',(req,res)=>{
    Posts.findByIdAndRemove(req.params.id).exec((err,deletedPost)=>{


        if(err) return res.status(400).json({
            message:"Delete unsuccess",err
        });
      
        return res.json({
            message:"Delete Success",deletedPost
        });
    });
});


//Get post for specific post API

router.get("/post/:id", (req,res)=>{
    let postID = req.params.id;

    Posts.findById(postID, (err,post)=>{
        if(err){ return res.status(400).json({success:false,err})}
        return res.status(200).json({
            success:true,
            post
        
        });
    });
});








module.exports = router;
