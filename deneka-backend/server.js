// require('dotenv').config()
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const signupRoute = require('./routes/signupRoute')
const signinRoute = require('./routes/signinRoute')
const { signIn, generateOtp, verifyOtp, setupTotp, generateQrCode, verifyTotp } = require('./controller/signinController')
const { companySignUp } = require('./controller/companySignupController');
const { requestReset, verifyResetToken, resetPassword } = require('./controller/resetPasswordController');
// const corsOptions = require('./config/corsOptions');

const PORT = process.env.PORT || 1337;

const corsOptions = {
    origin: 'http://localhost:3000', // Frontend's origin
    credentials: true, // Allow cookies
};

app.use(cors(corsOptions));

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(express.query())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))


// define Routes
app.use('/api', signupRoute)
app.use('/api', signinRoute)
app.post('/api/company-signup', companySignUp);
app.post('/api/setup-totp', setupTotp);
app.post('/api/verify-totp', verifyTotp);


// Password reset routes
app.post('/api/request-reset', requestReset);
app.get('/api/verify-reset/:token', verifyResetToken); // Assuming token is sent as a URL parameter
app.post('/api/reset-password', resetPassword);

app.all('*', (req, res) => {
    res.status(404).send("Error")
    // if (req.accepts('html')) {
    //     res.sendFile(path.join(__dirname, 'views', '404.html'))
    // } else if (req.accepts('json')) {
    //     res.json({ message: '404 Not Found' })
    // } else {
    //     res.type('txt').send('404 Not Found')
    // }

})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });