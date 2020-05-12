  drop database if exists company;

  create database company;

  use company;

  create table department( id int auto_increment, name varchar(30), primary key (id));

  create table role(id int auto_increment,  departmentId int, title varchar(30), salary decimal, foreign key (departmentId) references department(id), primary key (id));
  
  create table employee(id int auto_increment, roleid int, managerid int, first_name varchar(30), last_name varchar(30), foreign key (roleid ) references role(id), primary key (id));