// api/domain/controllers/DomainController.js

module.exports = {
    async createDomain(ctx) {
      try {
        const {
          company_id,
          existing_domains,
          bought_domains,
          total_domain_price
        } = ctx.request.body;
  
        // Import the service
        const domainService = require('../../services/DomainService');
  
        // Call the service method to save domain data
        await domainService.saveDomainToSnowflake(
          company_id,
          existing_domains,
          bought_domains,
          total_domain_price
          // ... other fields
        );
  
        ctx.send({ message: 'Domain data created successfully' });
      } catch (error) {
        ctx.throw(500, 'Error creating domain data');
      }
    },
  
    // Define other actions for DomainController as needed
  };
  