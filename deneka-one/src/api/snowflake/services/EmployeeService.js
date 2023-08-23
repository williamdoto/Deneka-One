// api/employees/services/EmployeesService.js

module.exports = {
    async saveEmployeeToSnowflake(
      company_id,
      employee_name,
      job_title,
      country,
      work_mode,
      employment_type,
      department
      // ... other fields
    ) {
      try {
        const connectionPool = require('../../../../config/snowflake');
  
        await connectionPool.use(async (clientConnection) => {
          const statement = await clientConnection.execute({
            sqlText: 'INSERT INTO Employees (company_id, employee_name, job_title, country, work_mode, employment_type, department) VALUES (?, ?, ?, ?, ?, ?, ?)',
            binds: [company_id, employee_name, job_title, country, work_mode, employment_type, department],
            complete: function (err, stmt, rows) {
              if (err) {
                console.error('Error executing SQL statement:', err.message);
                throw err;
              }
  
              console.log('Inserted', rows, 'row(s)');
            }
          });
        });
      } catch (error) {
        console.error('Snowflake Connection Error:', error);
      }
    },
  };
  