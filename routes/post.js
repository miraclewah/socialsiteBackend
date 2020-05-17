const express = require('express')
const {
    getPosts, 
    createPosts, 
    postsByUser, 
    postById, 
    isPoster, 
    deletePost, 
    updatePost,
    photo,
    singlePost,
    like,
    unlike,
    comment,
    uncomment
} = require('../controllers/post')
const {requiredSignin} = require('../controllers/auth')
const {userById} = require('../controllers/user')
const {createPostValidator} = require('../validator')

const router = express.Router()

router.get('/posts', getPosts);

// lke unlike post
router.put('/post/like', requiredSignin, like)
router.put('/post/unlike', requiredSignin, unlike)
//comments
router.put('/post/comment', requiredSignin, comment)
router.put('/post/uncomment', requiredSignin, uncomment)

router.post('/post/new/:userId', requiredSignin, createPosts, createPostValidator)
router.get('/posts/by/:userId', requiredSignin, postsByUser )
router.get('/post/:postId', singlePost)
router.delete('/post/:postId',requiredSignin, isPoster, deletePost)
router.put('/post/:postId',requiredSignin, isPoster, updatePost)

//photo
router.get('/post/photo/:postId', photo);


// any route cointaing :userId, our app will first execute userById()
router.param("userId", userById);
// any route cointaing :postId, our app will first execute postById()
router.param("postId", postById);

module.exports = router

