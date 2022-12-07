// file to handle db renders
const queries = require('./dbQuery.js'); // import queries

class DBRender {

    constructor(queries) {
        this.queries = queries;
    }
    // -- RENDER methods --
    viewDepartments(continueFunction) {
        queries.getDepartments()
            .then(([data]) => {
                console.log('\n');
                console.table(data);
            })
            .then(() => {
                continueFunction();
            });
    }

    viewRoles(continueFunction) {
        queries.getRoles()
            .then(([data]) => {
                console.log('\n');
                console.table(data);
            })
            .then(() => {
                continueFunction();
            });
    }

    viewEmployees(continueFunction) {
        queries.getEmployees()
            .then(([data]) => {
                console.log('Department Added!');
                console.log('\n');
                console.table(data);
            })
            .then(() => {
                continueFunction();
            });
    }
    // -- GETTER methods --
    // forward get methods to render for prompts
    getDepartments() { // notice the syntax for returning, it is different as a promise cannot return an object directly
        return queries.getDepartments()
            .then(([data]) => {
                return data;
            });
    }
    // forward get methods to render for prompts
    getRoles() {
        return queries.getRoles()
            .then(([data]) => {
                return data;
            });
    }
    // forward get methods to render for prompts
    getEmployees() {
        return queries.getEmployees()
            .then(([data]) => {
                return data;
            });
    }
    // -- ADDER methods --
    addDepartment(continueFunction, newDep) {
        queries.makeDepartment(newDep)
            .then(() => {
                console.log('Department Added!');
                this.viewDepartments(continueFunction);
            })
            .then(() => {
                continueFunction();
            });
    }

    addRole(continueFunction, newRle) {
        queries.makeRole(newRle)
            .then(() => {
                console.log('Role Added!');
                this.viewRoles(continueFunction);
            })
            .then(() => {
                continueFunction();
            });
    }

    addEmployee(continueFunction, newEmp) {
        queries.makeEmployee(newEmp)
            .then(() => {
                console.log('Employee Added!');
                this.viewEmployees(continueFunction);
            })
            .then(() => {
                continueFunction();
            });
    }
    // -- UPDATER methods --
    updateEmployeeRole(continueFunction, emp, newRle) {
        queries.replaceEmployeeRole(emp, newRle)
            .then(() => {
                console.log('Employee Updated!');
                this.viewEmployees(continueFunction);
            })
            .then(() => {
                continueFunction();
            });
    }

    updateRoleSalary(continueFunction, rle, salary) {
        queries.replaceRoleSalary(rle, salary)
            .then(() => {
                console.log('Role Updated!');
                this.viewRoles(continueFunction);
            })
            .then(() => {
                continueFunction();
            });
    }


}

module.exports = new DBRender(queries);