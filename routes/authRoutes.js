const express = require('express')
const router = express.Router()
const cors = require('cors')

const {test, registerUser, loginUser, getProfile, logoutUser} = require("../controllers/authController")

//middleware

router.use(
    cors({
        credentials:true,
        // origin:"http://localhost:3000"
        origin:"https://mern-auth-client-blond.vercel.app"
    })
)

router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.post('/logout', logoutUser)

module.exports = router