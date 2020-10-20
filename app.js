const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Employee = require('./lib/Employee');
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
console.log("hello");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

var newEmployees = [];


function employeeRole(){
    inquirer.prompt(
        [
        
        {
            type: 'list',
            message: 'What is your role?',
            name: 'role',
            choices: [

                "Engineer",
            
                "Intern",
            
                "Manager",

                "No more employees"
                    ]
        }
     ]


    ).then(function(response){
        if (response.role === "Engineer"){
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What is the engineer's name?",
                        name: "name"
                    },
                    {
                        type: "input",
                        message: "Enter ID.",
                        name: "id"
                    },
                    {
                        type: "input",
                        message: "Enter email address.",
                        name: "email"
                    },
                    {
                        type: "input",
                        message: "Enter github username.",
                        name: "github"
                    },

                    
                ]).then(function(response){
                    var newEngineer = new Engineer(response.name, response.id, response.email, response.github);
                    newEngineer['role'] = newEngineer.getRole();
                    newEmployees.push(newEngineer);
                    var main = render(newEmployees);
                    fs.writeFile(outputPath, main, function(){
                        console.log("A new engineer is added to the team.html");

                    employeeRole();
                
                    })
                })
            }
            if (response.role === "Intern"){
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What is the intern's name?",
                        name: "name"
                    },
                    {
                        type: "input",
                        message: "Enter ID.",
                        name: "id"
                    },
                    {
                        type: "input",
                        message: "Enter email address.",
                        name: "email"
                    },
                    {
                        type: "input",
                        message: "Enter the schools that the intern is attending.",
                        name: "school"
                    }
                ]).then(function(response){
                    var newIntern = new Intern(response.name, response.id, response.email, response.school);
                    newIntern['role'] = newIntern.getRole();
                    newEmployees.push(newIntern);
                    var main = render(newEmployees);
                    fs.writeFile(outputPath, main, function(){
                    console.log("A new intern is added to the team.html");

                    employeeRole();

                })
            })
        }

                if (response.role === "Manager"){
                    inquirer.prompt([
                     {
                        type: "input",
                        message: "What is the manager's name?",
                        name: "name"
                    },
                     {
                        type: "input",
                        message: "Enter ID.",
                        name: "id"
                    },
                     {
                         type: "input",
                         message: "Enter email address.",
                         name: "email"
                    },
                    {
                         type: "input",
                         message: "Enter office number.",
                         name: "officeNumber"
                     }
                ]).then(function(response){
                var newManager = new Manager(response.name, response.id, response.email, response.officeNumber);
                newManager['role'] = newManager.getRole();
                newEmployees.push(newManager);
                var main = render(newEmployees);
                fs.writeFile(outputPath, main, function(){
                console.log("A new manager is added to the team.html");

                employeeRole();

                })
            })
        }


        })
    }
    employeeRole();




