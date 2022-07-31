const mysql = require('mysql2');
const inquirer = require('inquirer');
const express = require('express');
const { join } = require('path');
const path = require('path');
const { uid } = require('uid');
const app = express();
const db = sg
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
  db.query('SELECT * FROM department', (err, res) => {
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

};

function addRole() {

};

function addEmployee() {

};

function updateRole() {
  
};

menuStart();