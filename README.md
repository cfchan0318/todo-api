# todo-api

basic todo api with SQL Server and Express.

# Tables used
CREATE TABLE todo_app.dbo.todo (
	id int IDENTITY(1,1) NOT NULL,
	title varchar(4000) COLLATE Chinese_Taiwan_Stroke_CI_AS NOT NULL,
	description varchar(4000) COLLATE Chinese_Taiwan_Stroke_CI_AS NULL,
	iscomplete bit DEFAULT 0 NOT NULL,
	CONSTRAINT PK__todo__3213E83FE3A6E803 PRIMARY KEY (id)
);

# .env file sample
DB_USER = <SQL Server Database username>
DB_PWD= <SQL Server Database password>
DB_NAME=<SQL Server Database name>

