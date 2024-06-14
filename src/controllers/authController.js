const router = require('express').Router();

const authService = require('../services/authService')

router.get('/register', (req, res) => {
    res.render('auth/register')
});

router.post('/register', async(req, res) => {
    const userData = req.body;
    if(req.body.password !== req.body.rePassword){
       const message = `Password and Confirm Password doesn\'t match`;
       res.render('auth/register', {...userData, error: message}) 
    }
    await authService.register(userData); 
    res.redirect('/auth/login');
})

module.exports = router;