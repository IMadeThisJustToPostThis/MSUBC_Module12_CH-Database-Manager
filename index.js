// extras:
// make delete methods
// allow a null value to be passed in for manager when making a new employee
// make a getManagers method

// file that puts it all together utilizing a prompt inquirer for inputting data
const { prompt } = require('inquirer'); // import prompt inquirer
const render = require('./lib/dbRender.js'); // import renderer

function init() {
    loadPrompts();
}

function loadPrompts() {
    // ask user what their goal is
    prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View All Departments',
                    value: 'VIEW_DEPARTMENTS'
                },
                {
                    name: 'View All Roles',
                    value: 'VIEW_ROLES'
                },
                {
                    name: 'View All Employees',
                    value: 'VIEW_EMPLOYEES'
                },
                {
                    name: 'Add Department',
                    value: 'ADD_DEPARTMENT'
                },
                {
                    name: 'Add Role',
                    value: 'ADD_ROLE'
                },
                {
                    name: 'Add Employee',
                    value: 'ADD_EMPLOYEE'
                },
                {
                    name: 'Update Employee Role',
                    value: 'UPDATE_EMPLOYEE_ROLE'
                },
                {
                    name: 'Update Role Salary',
                    value: 'UPDATE_ROLE_SALARY'
                },

            ]
        }
    ]).then(res => {
        let choice = res.choice;
        // use a switch to handle menu options, of which the selected option is passed by the prompt inquirer
        switch (choice) {
            case 'VIEW_DEPARTMENTS':
                render.viewDepartments(loadPrompts); // with each instance of a render function, recursively pass loadPrompts
                break;                               // so that the prompt gets repeated once the requested task is accomplished
            case 'VIEW_ROLES':
                render.viewRoles(loadPrompts);
                break;
            case 'VIEW_EMPLOYEES':
                render.viewEmployees(loadPrompts);
                break;
            case 'ADD_DEPARTMENT':
                addDepartmentPrompt();
                break;
            case 'ADD_ROLE':
                addRolePrompt();
                break;
            case 'ADD_EMPLOYEE':
                addEmployeePrompt();
                break;
            case 'UPDATE_EMPLOYEE_ROLE':
                updateEmployeeRolePrompt();
                break;
            case 'UPDATE_ROLE_SALARY':
                updateRoleSalaryPrompt();
                break;
        }
    }
    );
};

// prompt handler for adding a department
function addDepartmentPrompt() {
    prompt([
        {
            name: 'name',
            message: 'What is the name of the department'
        }
    ])
        .then(res => {
            render.addDepartment(loadPrompts, res);
        });
};

// prompt handler for adding a role
function addRolePrompt() {
    render.getDepartments()
        .then(function (result) {
            const depChoices = result.map(({ department_id, department }) => ({
                value: department_id,
                name: department
            }));
            prompt([
                {
                    name: 'title',
                    message: 'What is the name of the role'
                },
                {
                    name: 'salary',
                    message: 'What is the salary of the role'
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Which department does the role belong to',
                    choices: depChoices
                }
            ])
                .then(res => {
                    render.addRole(loadPrompts, res);
                });
        });
};

// prompt handler for adding an employee
function addEmployeePrompt() {
    render.getRoles()
        .then(function (result) {
            const rleChoices = result.map(({ role_id, role_title }) => ({
                value: role_id,
                name: role_title
            }));
            render.getEmployees()
                .then(function (result) {
                    const manChoices = result.map(({ employee_id, first_name, last_name }) => ({
                        value: employee_id,
                        name: `${first_name} ${last_name}`
                    }));
                    prompt([
                        {
                            name: 'first_name',
                            message: 'What is the first name of the employee'
                        },
                        {
                            name: 'last_name',
                            message: 'What is the last name of the employee'
                        },
                        {
                            type: 'list',
                            name: 'role_id',
                            message: 'What is the title of the employee',
                            choices: rleChoices
                        },
                        {
                            type: 'list',
                            name: 'manager_id',
                            message: 'What is the name of the employees manager',
                            choices: manChoices
                        }
                    ])
                        .then(res => {
                            render.addEmployee(loadPrompts, res);
                        });
                });
        });
};

// prompt handler for updating an employees role
function updateEmployeeRolePrompt() {
    render.getEmployees()
        .then(function (result) {
            const empChoices = result.map(({ employee_id, first_name, last_name }) => ({
                value: employee_id,
                name: `${first_name} ${last_name}`
            }));
            render.getRoles()
                .then(function (result) {
                    const rleChoices = result.map(({ role_id, role_title }) => ({
                        value: role_id,
                        name: role_title
                    }));
                    prompt([
                        {
                            type: 'list',
                            name: 'employee_id',
                            message: 'Which employee do you want to update?',
                            choices: empChoices
                        },
                        {
                            type: 'list',
                            name: 'role_id',
                            message: 'Which role do you want to assign the selected employee?',
                            choices: rleChoices
                        }
                    ])
                        .then(res => {
                            render.updateEmployeeRole(loadPrompts, res.employee_id, res.role_id);
                        });
                });
        });
};

function updateRoleSalaryPrompt() {
    render.getRoles()
        .then(function (result) {
            const rleChoices = result.map(({ role_id, role_title }) => ({
                value: role_id,
                name: role_title
            }));
            prompt([
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Which role do you want to assign the new salary amount?',
                    choices: rleChoices
                },
                {
                    name: 'salary',
                    message: 'what is the new salary amount?'
                }
            ])
                .then(res => {
                    render.updateRoleSalary(loadPrompts, res.role_id, res.salary);
                });

        });
};

init();