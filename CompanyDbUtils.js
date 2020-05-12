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
function addRole(connection, cb) {
  connection.query("select id, name from department", function(err, results) {
    if (err) console.log(err);
    const departmentChoicesArr = results.map(result => {
      return result.name;
    });
    console.log("we queried the things and we are going to prompt stuff!");
    inquirer
      .prompt([
        {
          type: "list",
          message: "which department would you like to add a role to?",
          choices: departmentChoicesArr,
          name: "deptchoice"
        }
      ])
      .then(function(res) {
        console.log(" we chose a role and now we are doing the next thing!");
        const nameMatches = result => {
          return res.deptchoice === result.name;
        };
        const departmentId = results[results.findIndex(nameMatches)].id;

        inquirer
          .prompt([
            {
              type: "input",
              message: "what is the name of the role?",
              name: "title"
            },
            {
              type: "number",
              message: "what is the salary of the role?",
              name: "salary"
            }
          ])
          .then(function(role) {
            connection.query(
              `insert into role (departmentId, title, salary) values (?,?,?)`,
              [departmentId, role.title, role.salary],
              function(err) {
                if (err) {
                  console.log(err);
                }
                console.log("added role successfully");
                cb();
              }
            );
          });
      });
  });
}
function addEmployee(connection, cb) {
  connection.query("select id, title from role", function(err, results) {
    if (err) console.log(err);
    const roles = results.map(result => {
      return result.title;
    });
    connection.query("select id, first_name, last_name from employee", function(
      err,
      employeeResults
    ) {
      if (err) {
        console.log(err);
      }
      console.log(employeeResults);
      const managerChoicesArr = employeeResults.map(result => {
        return result.first_name +" "+  result.last_name;
      });
      managerChoicesArr.push("none");
      console.log(managerChoicesArr);

      inquirer
        .prompt([
          {
            type: "list",
            message: "which role would you like the new employee to have?",
            choices: roles,
            name: "rolechoice"
          },
          {
            type: "list",
            message: "which manager does the employee have?",
            choices: managerChoicesArr,
            name: "managerchoice"
          },
          {
            type: "input",
            message: "what is the first name",
            name: "first_name"
          },
          {
            type: "input",
            message: "what is the last name?",
            name: "last_name"
          }
        ])
        .then(function(res) {
          let managerid;
          if (res.managerchoice === "none") {
            managerid = null;
          } else {
            const checkIfManagerChoice = curr => {
              return `${curr.first_name} ${curr.last_name}` === res.managerchoice;
            };
            console.log(employeeResults)
            managerid = employeeResults[employeeResults.findIndex(checkIfManagerChoice)].id;
          }

          let roleid;
          const checkIfRoleChoice = curr => {
            return curr.title === res.rolechoice;
          };
          roleid = results[results.findIndex(checkIfRoleChoice)].id;

          console.log("managerid"+ managerid);
          console.log("roleid"+ roleid);
          connection.query(
            `
                      insert into employee (roleid, managerid, first_name,last_name) values (?, ?, ? , ?)`,
            [roleid, managerid, res.first_name, res.last_name],
            function(err) {
              if (err) {
                console.log(err);
              }
              console.log("added employee successfully");
              cb();
            }
          );
        });
    });
  });
}



