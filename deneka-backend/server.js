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
require('dotenv').config();
// const axios = require('axios');

const PORT = process.env.PORT || 1337;

const corsOptions = {
    origin: 'http://localhost:3000', // Frontend's origin
    credentials: true, // Allow cookies
};



// async function getAccessToken() {
//   try {
//     const response = await axios.post('https://login.microsoftonline.com/common/oauth2/v2.0/token', new URLSearchParams({
//       client_id: process.env.CLIENT_ID,
//       scope: 'https://graph.microsoft.com/.default',
//       client_secret: process.env.CLIENT_SECRET,
//       grant_type: 'client_credentials'
//     }), {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
//     });

//     console.log("Access Token: ", response.data.access_token);
//     return response.data.access_token;
//   } catch (error) {
//     console.error("Error getting access token: ", error);
//   }
// }

// // Call the function to get the token
// getAccessToken();


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