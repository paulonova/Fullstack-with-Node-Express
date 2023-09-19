# Fullstack React and Node js

Divide in two folders:

> client
> server

* Initialize the server:
```bash
 > npm init
```

* Install express
```bash
 > npm install express
```

* Install cors
```bash
 > npm install cors
```

* Install cors
```bash
 > npm install mysql2
```

* Install nodemon
```bash
 > npm install nodemon
```


### To run the server:
<p>To start server, I need to run nodemon index.js, but I set in package.json a script
to run npm start instead...</p>

```bash
 > npm start
```

# Install MySQL

```bash
YouTube link: https://www.youtube.com/watch?v=3NySJ4ze2iA
```
# Install sequelize and sequelize-cli
<p>Sequelize is a popular ORM (Object-Relational Mapping) for Node.js</p>
<p>Link: https://sequelize.org/docs/v6/</p>

> Then run 'npx sequelize-cli init'


> https://www.mysql.com/downloads/

> Then click: MySQL Community (GPL) Downloads »
> Then click: MySQL Community Server

> Download the mySQL file and install


## Command Line:

> /usr/local/mysql/bin/mysql -u root -p

ps: Will ask for the password...

<hr>

# INSTRUCTIONS:

<h3>Create Tables and connections</h3>
<ul>
<li>Setup connection with MySql Workbench via config folder in "development"</li>
  <ul>
  <li>username</li>
  <li>password</li>
  <li>database name</li>
  </ul>
<li>After initialize the sequelize I will create my tables in folder "models". Ex: Posts.js</li>
</ul>

<h3>Create Routes Folder</h3>

