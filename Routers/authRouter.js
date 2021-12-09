const express = require('express')
const router = express.Router()
const {login, register} = require('../Controllers')

router.get('/', async (req, res) => {

    res.render('login')

})
router.post('/login', login)
router.post('/register', register)
router.get('/logout', (req, res) => {
    res.redirect('/')
})

module.exports = router
