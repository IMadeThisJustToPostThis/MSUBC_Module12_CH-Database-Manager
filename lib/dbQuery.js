// file to handle db queries
const connection = require('../config/connection.js'); // import database (technically the connection)

class DBQueries {

    constructor(connection) {
        this.connection = connection;
    }

    // -- GETTER methods --
    getDepartments() {
        return this.connection.promise().query( // returns the promise
            'SELECT department.id AS department_id, department.name AS department FROM department;' // we pass our sql code into the return statement
        );
    };

    getRoles() {
        return this.connection.promise().query(
            'SELECT role.id AS role_id, role.title AS role_title, role.salary AS avg_role_salary, department.name AS department ' +
            'FROM role LEFT JOIN department on role.department_id = department.id;' 
        );
    };

    getEmployees() {
        return this.connection.promise().query(
            'SELECT employee.id AS employee_id, employee.first_name, employee.last_name, ' +
            'role.salary AS employee_salary, role.title AS employee_title, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager ' +
            'FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;' 
        );
    };
    // -- MAKER methods --
    makeDepartment(department) {
        return this.connection.promise().query(
            'INSERT INTO department SET ?', department
        );
    };

    makeRole(role) {
        return this.connection.promise().query(
            'INSERT INTO role SET ?', role
        );
    };

    makeEmployee(employee) {
        return this.connection.promise().query(
            'INSERT INTO employee SET ?', employee
        );
    };

    // -- UPDATER methods --
    replaceEmployeeRole(employee, role) {
        return this.connection.promise().query(
            'UPDATE employee SET role_id = ? WHERE id = ?',
            [role, employee]
        );
    };

    replaceRoleSalary(role, salary) {
        return this.connection.promise().query(
            'UPDATE role SET salary = ? WHERE id = ?',
            [salary, role]
        );
    };

};

module.exports = new DBQueries(connection);