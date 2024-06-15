const router = require('express').Router();

const authService = require('../services/authService')

router.get('/register', (req, res) => {
    res.render('auth/register')
});

router.post('/register', async(req, res) => {
    const userData = req.body;
    await authService.register(userData); 
    // await authService.login(userData.email, userData.password)
    res.redirect('/auth/login');
});

router.get('/login', (req, res) => {
    res.render('auth/login')
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    await authService.login(email, password)
})

module.exports = router;