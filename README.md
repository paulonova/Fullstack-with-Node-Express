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

```bash
npm install react-router-dom
```

PS: I will create the BrowserRouter in App.js !




# Create React Frontend inside of client folder

<h3>To make the request work I need to install "cors"</h3>

```bash
npm install cors
```
Link: https://github.com/expressjs/cors#readme

<p>cors: "CORS" stands for "Cross-Origin Resource Sharing". It's a security feature implemented in web browsers to control requests made to a domain different from the one from which the web page originated. The cors package is a Node.js middleware that can be used to enable CORS in web applications. When you integrate the cors middleware into your Node.js application, it modifies the HTTP headers in a way that allows specified cross-origin requests, making it easier to build APIs that can be accessed from different origins (domains).</p>

<p>If you're developing an API using Node.js and you want to allow requests from different origins (e.g., if you have a frontend application on one domain and a backend API on another), you'd likely use the cors package to handle CORS-related issues. After installing the package with npm install cors, you can integrate it into your Express.js (or similar) application.
</p>

# Create Formulary using <strong>Formik</strong>

```bash
npm install formik
```

link: https://formik.org/

<p>With Formik I don´t need to set any state to store the input data, Formik handle his for me.. </p>

## Form Validation using <strong>YUP</strong>

```bash
npm install yup
```

link: https://github.com/jquense/yup


# Navigate to a single post by ID
<p style="color: red">useHistory is deprecated</p>

useNavigate() is a hook introduced in version 6 of react-router-dom. It provides a function that allows you to programmatically navigate to different routes within your React application.

Here's a short breakdown:

Functionality: The hook returns a function, often captured in a variable named navigate.

Usage: You can call this function with a path to navigate to another route. Optionally, you can also provide state and other navigation options.

Replacement for useHistory: In previous versions of react-router-dom (v5 and earlier), you would use the useHistory hook to get access to the history object and then use history.push() or history.replace() to perform navigation. In v6, useNavigate offers a more straightforward way to achieve the same result.

Example:

```bash
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate('/home');
  };

  return <button onClick={goToHomePage}>Go to Home</button>;
}
```

In this example, clicking the button will navigate the user to the /home route. The useNavigate hook makes programmatic navigation in React components more concise and intuitive, aligning better with the hooks paradigm.
