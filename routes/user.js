const express = require('express')
const {userById , 
    allUsers , 
    getUser, 
    updateUser, 
    deleteUser,
    hasAuthorization, 
    userPhoto, 
    addFollowing, 
    addFollower, 
    removeFollowing,
    removeFollower,
    findPeople 
} = require('../controllers/user')
const {requiredSignin} = require('../controllers/auth')

const router = express.Router()

router.put('/user/follow', requiredSignin, addFollowing, addFollower);
router.put('/user/unfollow', requiredSignin, removeFollowing, removeFollower);

router.get('/users', allUsers);
router.get('/user/:userId', requiredSignin, getUser);
router.put('/user/:userId', requiredSignin, updateUser);
router.delete('/user/:userId', requiredSignin, deleteUser);
//photo
router.get('/user/photo/:userId', userPhoto);

//who to follow?
router.get('/user/findpeople/:userId', requiredSignin, findPeople)

// any route cointaing :userId, our app will first execute userById()
router.param("userId", userById);

module.exports = router