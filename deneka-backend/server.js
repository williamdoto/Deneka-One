// require('dotenv').config()
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const signupRoute = require('./routes/signupRoute')
// const corsOptions = require('./config/corsOptions');


const PORT = process.env.PORT || 3500;

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(express.query())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))


// define Routes
app.use('/api', signupRoute)

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });