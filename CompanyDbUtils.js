
const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "tech1991",
  database: "company"
});

function addDepartment(connection, department, cb) {
    connection.query(
      `insert into department (name) values ("${department.name}")`,
      function(err) {
        if (err) {
          console.log(err);
        }
        console.log("added department successfully");
        cb();
      }
    );
  
}


