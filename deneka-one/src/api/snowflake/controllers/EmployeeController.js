// api/employees/controllers/EmployeesController.js

module.exports = {
    async createEmployee(ctx) {
      try {
        const {
          company_id,
          employee_name,
          job_title,
          country,
          work_mode,
          employment_type,
          department
        } = ctx.request.body;
  
        // Import the service
        const employeesService = require('../../services/EmployeesService');
  
        // Call the service method to save employee data
        await employeesService.saveEmployeeToSnowflake(
          company_id,
          employee_name,
          job_title,
          country,
          work_mode,
          employment_type,
          department
          // ... other fields
        );
  
        ctx.send({ message: 'Employee data created successfully' });
      } catch (error) {
        ctx.throw(500, 'Error creating employee data');
      }
    },
  
    // Define other actions for EmployeesController as needed
  };
  