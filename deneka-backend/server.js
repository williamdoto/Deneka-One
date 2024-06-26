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
const { createTicket, deleteSingle, findTicketById, listAllTickets, getClientTickets, createTicketProgress, createTicketComment} = require('./controller/ticketController');
const { createCategory, deleteCategory, viewAllCategories, viewCategoryById} = require('./controller/categoryController');
const {createTag, createTagAndAssociateWithTicket,associateTagWithTicket} = require('./controller/tagController');
const { createClient, deleteClient, viewAllClients, viewClientById } = require('./controller/clientController');
const useragent = require('express-useragent');
const cloudinary = require('cloudinary').v2; 

const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const fs = require('fs');

AWS.config.update({
    accessKeyId: 'fc0f4d1e9a394cf5bf863ef7cbf38011',
    secretAccessKey: 'd0cccf5e0a3c4284b60009ef7dcc1d02',
    region: 'de',
    endpoint: 'https://s3.de.io.cloud.ovh.net/',
  });

  const s3 = new AWS.S3();

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


// app.get('/auth/onedrive/callback', async (req, res) => {
//   const code = req.query.code;
//   if (!code) {
//       return res.status(400).send('No code received from Microsoft');
//   }

//   try {
//       const response = await axios.post('https://login.microsoftonline.com/common/oauth2/v2.0/token', new URLSearchParams({
//           client_id: process.env.CLIENT_ID,
//           scope: 'https://graph.microsoft.com/.default',
//           client_secret: process.env.CLIENT_SECRET,
//           grant_type: 'authorization_code',
//           code: code,
//           redirect_uri: 'http://localhost:1337/auth/onedrive/callback'
//       }), {
//           headers: {
//               'Content-Type': 'application/x-www-form-urlencoded'
//           }
//       });

//       const accessToken = response.data.access_token;
//       // Store access token in a secure place (session, database, etc.)
//       // And redirect user or send a response as needed
//       res.send('OneDrive access granted');
//   } catch (error) {
//       console.error("Error exchanging code for token: ", error);
//       res.status(500).send('Error during OneDrive authentication');
//   }
// });



app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }))

app.use(express.query())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))

app.use(useragent.express());
// cloudinary.config({
//     cloud_name: 'william@deneka.one',
//     api_key: 145145578795162,
//     api_secret: 'gSDp4MlcsT39UVlD6SutBA3z_HQ',
//     secure:true
// });

// console.log(cloudinary.config())

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



app.post('/api/create-client', createClient);
app.get('/api/client/', viewAllClients);
app.get('/api/client/:clientId', viewClientById);
app.delete('/api/client/:clientId', deleteClient);

app.post('/api/create-inquiry', createInquiry);
app.post('/api/create-ticket', createTicket); 
app.delete('/api/ticket/:id', deleteSingle);
app.get('/api/ticket/:id',findTicketById);
app.get('/api/tickets',listAllTickets);
app.get('/api/tickets/client/:clientId', getClientTickets);
app.get('/api/client-inquiry/:clientId', listInquiriesByClient);
app.post('/api/category/create', createCategory);
app.delete('/api/category/delete/:catId', deleteCategory);
app.get('/api/category', viewAllCategories);
app.get('/api/category/:catId', viewCategoryById);

app.post('/api/tickets/progress', createTicketProgress);
app.post('/api/tickets/comments', createTicketComment);
app.post('/api/tags', createTag);
app.post('/api/tickets/tags', associateTagWithTicket);
app.post('/api/tickets/tags/add', createTagAndAssociateWithTicket);



const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'deneka-one',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: 'public-read', // Set appropriate permissions for uploaded files
      key: function (req, file, cb) {
        cb(null, Date.now().toString() + '-' + file.originalname); // Set unique key for each uploaded file
      }
    })
  });
  
  // Define the endpoint for handling image uploads
  app.post('/api/image', upload.single('image'), (req, res) => {
    const file = req.file; // Access the uploaded file object
    console.log(file);
    res.json({ imageUrl: file.location }); // Return the URL of the uploaded image
});




// // Use Multer middleware to handle file uploads
// app.post('/api/image', upload.single('image'), async (req, res) => {
//     // At this point, Multer has processed the uploaded file and populated req.file
//     const file = req.file;
//     console.log(file);

//     // Check if file exists
//     if (!file) {
//         return res.status(400).json({ error: 'No file uploaded' });
//     }

//     const options = {
//         use_filename: true,
//         unique_filename: false,
//         overwrite: true,
//       };

//       try {
//         // Upload the image
//         const result = await cloudinary.uploader.upload(file.path, options);
//         console.log(result);
//         res.json({ imageUrl: result.secure_url });
//         return result.public_id;
//       } catch (error) {
//         console.error(error);
//       }

// });

// cloudinary.v2.uploader.unsigned_upload(file, upload_preset, options).then(callback);

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