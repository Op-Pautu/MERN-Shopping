const express = require('express')

const router = express.Router()

router.get('/test', (req, res)=> {
    res.send('test success')
})
router.post('/testpost', (req, res)=> {
    const username = req.body.username;
    res.send(username)
})

module.exports = router