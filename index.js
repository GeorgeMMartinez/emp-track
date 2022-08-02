const mysql = require('mysql2');
const inquirer = require('inquirer');
const express = require('express');
const { join } = require('path');
const path = require('path');
const { uid } = require('uid');
const { sequenceEqual } = require('rxjs');

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
app.use(express.static(join(__dirname, 'public')));


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
  ]).then(function (answer) {
    switch (answer.action) {
      case "View all Departments":
        viewAllDepartments();
        break;
      
      case "View All Roles":
        viewAllRoles();
        break;
      
      case "View All Employees":
        viewAllEmployees();
        break;

      case "Add a Department":
        addDepartment();
        break;

      case "Add a Role":
        addRole();
        break;

      case "Add an Employee":
        addEmployee();
        break;

      case "Update an Employee Role":
        updateRole();
        break;
    }
  })
};

function viewAllDepartments() {
  db.query('SELECT * FROM departments', (err, res) => {
    if (err) throw err;
    console.Table(res);
    menuStart();
  })
};

function viewAllRoles() {
  db.query('SELECT * from role, title AS Title FROM role', (err, res) => {
    if (err) throw err;
    console.Table(res);
    menuStart();
  })
};

function viewAllEmployees() {
  db.query("SELECT * FROM employee", (err,res) => {
    if (err) throw err;
    console.table(res);
    menuStart();
  })
};

function addDepartment() {
  inquirer.prompt([
    {
      message: "Enter Department Name",
      name: "name",
      type: "input"
    }
  ]).then(function (answer) {
    db.query("INSERT INTO departments (name) VALUES(?)", [answer.name], function (err, res) {
      if (err) throw err;
      console.table(res)
      menuStart()
    })
  })
};

function addRole() {
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
      name: "departID",
    }
  ]).then(function (answer) {
    db.query("INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?,)", [answer.title, answer.salary, answer.departID], function (err, res) {
      if (err) throw err;
      console.table(res);
      menuStart
    });
  });
};

function addEmployee() {
  inquirer.prompt([
    {
      message: "Enter Employee first name:",
      type: "input",
      name: "first",
    },
    {
      message: "Enter Employee last name:",
      type: "input",
      name: "last",
    },
    {
      message: "Enter Employee role:",
      type: "input",
      name: "roleID",
    },
    {
      message: "Enter Manager ID:",
      type: "input",
      name: "managerID",
    },
  ])
  .then(function (answer) {
    db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?,)", [answer.first, answer.last, answer.roleID, answer.managerID], function (err, res){
      if (err) throw err;
      console.table(res);
    });
  });
}

function updateRole() {
  inquirer.prompt([
    {
      message: "Enter Employee ID to Update:",
      type: "input",
      name: "employeeID",
    },
    {
      message: "Enter New Role ID:",
      type: "input",
      name: "roleID",
    },

  ]).then(update => {
    sequenceEqual.query("UPDATE employee SET role_id=? WHERE id=?", [answer.roleID, answer.employeeID], function (err, res) {
      if (err) throw err;
      console.table(res);
    });
  });
};

menuStart();