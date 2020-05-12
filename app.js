const inquirer = require("inquirer");

const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "tech1991",
    database: "company"
  });

  const defaultChoices = [
    "Add departments",
    "Add roles",
    "Add employees",
    "View departments",
    "View Roles",
    " View Employees",
    "Update employee roles"
  ];
  function mainPrompt(){
  
      inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        choices: defaultChoices,
        message: "Please select an action: "
      }
    ])
    .then( function(actionResult) {
      switch (actionResult.action) {
        case defaultChoices[0]:
          inquirer.prompt([{name:"deptname",message:"what is the department name", type:"input"}])
          .then(function(res){
              sqlUtils.addDepartment(connection, {name:res.deptname}, mainPrompt);
          })
          break;
        case defaultChoices[1]:
          sqlUtils.addRole(connection,mainPrompt);
          break;
        case defaultChoices[2]:
          sqlUtils.addEmployee(connection, mainPrompt);
          break;
        case defaultChoices[3]:
          sqlUtils.viewDeparments(connection, mainPrompt);    
          break;
        case defaultChoices[4]:
          sqlUtils.viewRoles(connection, mainPrompt);   
          break;
        case defaultChoices[5]:
          sqlUtils.viewEmployees(connection, mainPrompt);  
          break;
        case defaultChoices[6]:
          sqlUtils.updateEmployeeRoles(connection, mainPrompt);
          break;
      }
    });
  
  }
  connection.connect();
mainPrompt();