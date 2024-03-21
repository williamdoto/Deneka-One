// require('dotenv').config()
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const signupRoute = require('./routes/signupRoute')
const signinRoute = require('./routes/signinRoute')
const inquiryRoute = require('./routes/inquiryRoute');
const { updateUserDetails, submitQuestionnaireAnswers } = require('./controller/signupController');
const { signIn, generateOtp, verifyOtp, setupTotp, generateQrCode, verifyTotp, checkTotpSetup , recordSignOutTime} = require('./controller/signinController');
const { companySignUp } = require('./controller/companySignupController');
const { createInquiry , deleteInquiry } = require('./controller/inquiryController');
const { viewSingleInquiry, listAllInquiries, listInquiriesByClient } = require('./controller/inquiryController');
const { requestReset, verifyResetToken, resetPassword } = require('./controller/resetPasswordController');
const { createTicket, deleteSingle, findTicketById, listAllTickets, getClientTickets, createTicketProgress} = require('./controller/ticketController');
const { createCategory, deleteCategory} = require('./controller/categoryController');
const useragent = require('express-useragent');
const cloudinary = require('cloudinary').v2; 


const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Specify the destination folder where uploaded files will be stored temporarily
const fs = require('fs');


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

app.use(express.json());

app.use(express.urlencoded({ extended: true }))

app.use(express.query())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))

app.use(useragent.express());
cloudinary.config({
    cloud_name: 'william@deneka.one',
    api_key: '145145578795162',
    api_secret: 'gSDp4MlcsT39UVlD6SutBA3z_HQ'
});

// define Routes
app.use('/api', signupRoute)
app.use('/api', signinRoute)
app.post('/api/company-signup', companySignUp);
app.post('/api/setup-totp', setupTotp);
app.post('/api/check-totp-setup', checkTotpSetup);
app.post('/api/verify-totp', verifyTotp);
app.post('/api/update-user-details', updateUserDetails);
app.post('/api/submit-questionnaire-answers', submitQuestionnaireAnswers);
app.post('/api/sign-out', async (req, res) => {
    try {
        const userId = req.body.userId; // Assuming you send the userId in the request body
        await recordSignOutTime(userId);
        res.json({ success: true, message: 'Sign-out time recorded successfully' });
    } catch (error) {
        console.error('Error recording sign-out time:', error);
        res.status(500).json({ success: false, message: 'Failed to record sign-out time' });
    }
});


// Password reset routes
app.post('/api/request-reset', requestReset);
app.get('/api/verify-reset/:token', verifyResetToken); // Assuming token is sent as a URL parameter
app.post('/api/reset-password', resetPassword);


app.use('/api', inquiryRoute);
app.post('/api/create-inquiry', createInquiry);
app.delete('/api/delete-inquiry', deleteInquiry);

// app.use('/api', inquiryRoute);
app.get('/api/find-inquiry/:id', viewSingleInquiry);
app.get('/api/view-inquiry', listAllInquiries);


app.post('/api/create-inquiry', createInquiry);
app.post('/api/create-ticket', createTicket); 
app.delete('/api/ticket/:id', deleteSingle);
app.get('/api/ticket/:id',findTicketById);
app.get('/api/tickets',listAllTickets);
app.get('/api/tickets/client/:clientId', getClientTickets);
app.get('/api/client-inquiry/:clientId', listInquiriesByClient);
app.post('/api/category/create', createCategory);
app.delete('/api/category/delete/:catId', deleteCategory);
app.post('/api/tickets/progress', createTicketProgress);

// Use Multer middleware to handle file uploads
app.post('/api/image', upload.single('image'), (req, res) => {
    // At this point, Multer has processed the uploaded file and populated req.file
    const file = req.file;
    console.log(file)

    // Check if file exists
    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload image to Cloudinary
    cloudinary.uploader.upload(file.path, (err, result) => {
        // Delete the temporarily uploaded file
        fs.unlinkSync(file.path);
    
        if (err) {
            console.error('Error uploading image:', err);
            return res.status(500).json({ error: 'Error uploading image' });
        }
        // Send the URL of the uploaded image back to the client
        res.json({ imageUrl: result.secure_url });
    });
});

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