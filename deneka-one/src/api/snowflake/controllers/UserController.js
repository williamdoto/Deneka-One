
// async function createUser(ctx) {
//   try {
//     const {
//       email,
//       password_salt,
//       password_hash,
//       self_intro,
//       create_time,
//       isVerified,
//       verificationToken,
//       resetPasswordToken
//     } = ctx.request.body; // Access data from the request body

//     console.log(email);
    
//     // Use the connection pool and execute a statement
//     const userService = require('../services/UserService');

//     await userService.saveUserToSnowflake(
//       email,
//       password_salt,
//       password_hash,
//       self_intro,
//       create_time,
//       isVerified,
//       verificationToken,
//       resetPasswordToken
//     );

//     ctx.send({ message: 'User created successfully' });
//   } catch (error) {
//     ctx.throw(500, 'Error creating user');
//   }
// }

//     // Define other actions for UserController as needed
// module.exports = createUser;
  