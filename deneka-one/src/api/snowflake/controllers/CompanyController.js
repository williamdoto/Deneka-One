// api/company/controllers/CompanyController.js

module.exports = {
    async createCompany(ctx) {
      try {
        const {
          company_name,
          abn,
          company_street,
          country,
          state,
          city,
          post_code
        } = ctx.request.body;
  
        // Import the service
        const companyService = require('../../services/CompanyService');
  
        // Call the service method to save company data
        await companyService.saveCompanyToSnowflake(
          company_name,
          abn,
          company_street,
          country,
          state,
          city,
          post_code
          // ... other fields
        );
  
        ctx.send({ message: 'Company created successfully' });
      } catch (error) {
        ctx.throw(500, 'Error creating company');
      }
    },
  
    // Define other actions for CompanyController as needed
  };
  