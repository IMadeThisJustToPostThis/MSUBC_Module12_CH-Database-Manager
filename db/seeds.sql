USE employees_db;

INSERT INTO
    department (name)
VALUES
    ('Sales'),
    ('Marketing'),
    ('Finance');

INSERT INTO
    role (title, salary, department_id)
VALUES
    ('Sales Lead', 95000, 1),
    ('Creative Manager', 100000, 2),
    ('Controller', 120000, 3),
    ('Sales Person', 50000, 1),
    ('Market Researcher', 65000, 2),
    ('Accountant', 70000, 3);

INSERT INTO
    employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Cassie', 'Burgman', 1, null),
    ('Jacob', 'Salamanca', 2, null),
    ('Jesse', 'White', 3, null),
    ('Saul', 'Badman', 4, 1),
    ('Micky', 'Caligula', 5, 2),
    ('Kanye', 'South', 6, 3);