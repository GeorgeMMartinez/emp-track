const mysql = require('mysql2');
const inquirer = require('inquirer');
const express = require('express');
// const console.table = require('console.table');
// const { join } = require('path');
// const path = require('path');
// const { uid } = require('uid');
// const { sequenceEqual } = require('rxjs');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Hfwa0312',
  database: 'ecommerce_db'
})

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static(join(__dirname, 'public')));


function menuStart() {
  inquirer.prompt([
    {
      message: "What would you like to do?",
      type: "list",
      name: "choice",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee Role",
      ]
    }
  ])
  .then(choice => {
    switch (choice.choice) {
      case "View all Departments":
        viewAllDepartments()
        break
      
      case "View All Roles":
        viewAllRoles()
        break
    
      case "View All Employees":
        viewAllEmployees()
        break

      case "Add a Department":
        addDepartment()
        break

      case "Add a Role":
        addRole()
        break

      case "Add an Employee":
        addEmployee()
        break;

      case "Update an Employee Role":
        updateRole()
        break;
    }
  })
};

const viewAllDepartments = () => {
  db.query('SELECT * FROM departments', (err, res) => {
    if (err) throw err;
    console.Table(res);
    menuStart();
  })
}

const viewAllRoles = () => {
  db.query('SELECT * from role, title AS Title FROM role', (err, res) => {
    if (err) throw err;
    console.Table(res);
    menuStart();
  })
}

const viewAllEmployees = () => {
  db.query("SELECT * FROM employee", (err,res) => {
    if (err) throw err;
    console.table(res);
    menuStart();
  })
}

const addDepartment = () => {
  inquirer.prompt([
    {
      message: "Enter Department Name",
      name: "name",
      type: "input"
    }
  ])
  .then(function(answer) {
    db.query("INSERT INTO departments (name) VALUES(?)", [answer.name], function (err, res) {
      if (err) throw err;
      console.table(res)
      menuStart()
    })
  })
}

const addRole = () => {
  inquirer.prompt([
    {
      message: "Enter Role Name:",
      type: "input",
      name: "title",
    },
    {
      message: "Enter Role Salary",
      type: "input",
      name:"salary",
    },
    {
      message: "Enter Role Department ID",
      type: "input",
      name: "department_id",
    }
  ])
  .then(answer => {
    db.query('INSERT INTO roles Set ?', answer, err => {
      if (err) {console.log(err)}
    })
    console.log('role added')
    menuStart()
  })
}

const addEmployee = () => {
  inquirer.prompt([
    {
      message: "Enter Employee First Name:",
      type: "input",
      name: "first_name",
    },
    {
      message: "Enter Employee Last Name:",
      type: "input",
      name: "last_name",
    },
    {
      message: "Enter Employee Role ID:",
      type: "input",
      name: "role_id",
    },
    {
      message: "Enter Manager ID:",
      type: "input",
      name: "manager_id",
    },
  ])
  .then(answer => {
    let newEmployee = {
      ...answer
    }
    db.query('INSERT INTO employees SET ?', newEmployee, err => {
      if (err) {console.log(err)}
    });
    console.log('employee added')
    menuStart()
  })
}


const updateRole = () => {
  inquirer.prompt([
    {
      message: "Enter Employee ID to Update:",
      type: "input",
      name: "employee_id",
    },
    {
      message: "Enter New Role ID:",
      type: "input",
      name: "role_id",
    },

  ])
  .then(answer => {
    let newRole = {
      role_id: answer.role_id
    }
    db.query(`UPDATE employees SET ? WHERE id= ${answer.employee_id}`, newRole, err => {
      if (err) {console.log(err)}
    })
    console.log('employee role updated')
    menuStart()
  });
}

menuStart();