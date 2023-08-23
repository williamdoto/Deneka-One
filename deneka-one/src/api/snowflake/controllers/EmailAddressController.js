// api/email-addresses/controllers/EmailAddressController.js

module.exports = {
    async createEmailAddress(ctx) {
      try {
        const {
          company_id,
          email_address
        } = ctx.request.body;
  
        // Import the service
        const emailAddressService = require('../../services/EmailAddressService');
  
        // Call the service method to save email address data
        await emailAddressService.saveEmailAddressToSnowflake(
          company_id,
          email_address
          // ... other fields
        );
  
        ctx.send({ message: 'Email address data created successfully' });
      } catch (error) {
        ctx.throw(500, 'Error creating email address data');
      }
    },
  
    // Define other actions for EmailAddressController as needed
  };
  