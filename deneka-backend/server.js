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
const useragent = require('express-useragent');
// const corsOptions = require('./config/corsOptions');
require('dotenv').config();
// const axios = require('axios');

const PORT = process.env.PORT || 1337;

const corsOptions = {
    origin: 'http://localhost:3000', // Frontend's origin
    credentials: true, // Allow cookies
};





app.get('/auth/onedrive', (req, res) => {
  const clientId = process.env.CLIENT_ID;
  const redirectUri = encodeURIComponent('http://localhost:1337/auth/onedrive/callback');
  const scope = encodeURIComponent('Files.ReadWrite offline_access');
  const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}&response_mode=query`;

  res.redirect(authUrl);
});


app.get('/auth/onedrive/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) {
      return res.status(400).send('No code received from Microsoft');
  }

  try {
      const response = await axios.post('https://login.microsoftonline.com/common/oauth2/v2.0/token', new URLSearchParams({
          client_id: process.env.CLIENT_ID,
          scope: 'https://graph.microsoft.com/.default',
          client_secret: process.env.CLIENT_SECRET,
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: 'http://localhost:1337/auth/onedrive/callback'
      }), {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
      });

      const accessToken = response.data.access_token;
      // Store access token in a secure place (session, database, etc.)
      // And redirect user or send a response as needed
      res.send('OneDrive access granted');
  } catch (error) {
      console.error("Error exchanging code for token: ", error);
      res.status(500).send('Error during OneDrive authentication');
  }
});



app.use(cors(corsOptions));

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(express.query())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))

app.use(useragent.express());

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