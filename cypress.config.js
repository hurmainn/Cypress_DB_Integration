const { defineConfig } = require("cypress");
const sqlServer = require('cypress-sql-server');

module.exports = defineConfig({
  env: {
    db: {  //no need ti write conifg. db becauee The configuration values should be placed directly under env.
      host: "localhost",
      user: "root",
      password: "hurmain1234",
      database: "MyFirstDatabase",
    }
  },

  
  e2e: {
    watchForFileChanges:false,
    async setupNodeEvents(on, config) {
      // Implement node event listeners here
      const tasks = sqlServer.loadDBPlugin(config.db); // Use config.db directly
      on('task', {
        queryDatabase(query) {
          // Connect to your database and execute the query here
          // Return the results
          // For example, if you are using a library like 'mysql2':
          
          const mysql = require('mysql2');
    
          const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'hurmain1234',
            database: 'MyFirstDatabase'
          });
    
          return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
              if (error) {
                reject(error);
              } else {
                resolve(results);
              }
              connection.end();
            });
          });
        },
      });
    },
  },
});