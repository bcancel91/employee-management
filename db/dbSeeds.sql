use company;

insert into department (name) values ("order fullfillment"), ("accounting"), ("development");

insert into role (departmentId, title, salary) values (1, "cashier", 13000.00), (2, "accountant", 60000.00) , (3,"full stack developer", 1200000), (3, "manager",70000);

select * from role;

insert into employee (roleid, managerid, first_name,last_name) values (4, null, "man" , "ager") , ( 3, 1, "John","Doe");

select * from employee;