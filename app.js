const inquirer = require("inquirer");

const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "tech1991",
    database: "company"
  });