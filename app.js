// loads several packages
const express = require('express');
const { engine } = require('express-handlebars');
const sqlite3 = require('sqlite3')
const port = 8080 // defines the port
const app = express();// creates the Express app 
const bodyParser = require('body-parser');
const session = require('express-session');
const connectSqlite3 = require('connect-sqlite3');
const bcrypt = require("bcrypt"); //loads bcrypt
//const cookieParser = require('cookie-parser');
const SQLiteStore = connectSqlite3(session);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
  store: new SQLiteStore({db: "session-bs.db"}),
  saveUninitialized: false,
  resave: false,
  secret: "lOStOBILLOSdEyOONbuM89amarilloamarillolospl4tan0$"
}));

app.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// defines handlebars engine
app.engine('handlebars', engine());
// defines the view engine to be handlebars
app.set('view engine', 'handlebars');
// defines the views directory
app.set('views', './views');

app.get("/setname", (req, res) => {
  req.session.name = req.query.name;
  res.send("Session started");
});

// MODEL (DATA)
const db = new sqlite3.Database('isabel-data.db')

  // creates user table at startup
  db.run(
    "CREATE TABLE users (uid INTEGER PRIMARY KEY, username TEXT NOT NULL, password TEXT NOT NULL, hash TEXT NOT NULL, date INTEGER NOT NULL, isAdmin INTEGER NOT NULL)",
    (error) => {
      if (error) {
        console.error("ERROR: ", error);
      } else {
        console.log("---> Table users created!");
        const initialUsers = [
          {
            id: "0",
            username: "isabelita",
            password: "coromoto",
            hash: "coromoto",
            date:"1804",
            isAdmin: 1,
          },
          {
            id: "1",
            username: "pepe123",
            password: "lamancha",
            hash: "lamancha",
            date: "0810",
            isAdmin: 0,
          },
          {
            id: "2",
            username: "eleduardo",
            password: "pomposo",
            hash: "pomposo",
            date: "2203",
            isAdmin: 0,
          },
          {
            id: "3",
            username: "coca",
            password: "piscina",
            hash: "piscina",
            date: "1904",
            isAdmin: 0,
          },
          {
            id: "4",
            username: "gatinho",
            password: "lacontrasena",
            hash: "lacontrasena",
            date: "2708",
            isAdmin: 1,
          },
        ];
        initialUsers.forEach((user) => {
          const hash = bcrypt.hashSync(user.password, 10);
  
          db.run(
            "INSERT INTO users (uid, username, password, hash, date, isAdmin) VALUES (?, ?, ?, ?, ?, ?)",
            [
              user.id,
              user.username,
              user.password,
              hash,
              user.date,
              user.isAdmin,
            ],
            (error) => {
              if (error) {
                console.error("ERROR inserting user:", user.username, error);
              } else {
                console.log("User added to the users table:", user.username);
              }
            }
          );
        });
      }
    }
  );
  
// creates table projects at startup
db.run("CREATE TABLE projects (pid INTEGER PRIMARY KEY, pname TEXT NOT NULL, ptype TEXT NOT NULL, pyear INTEGER NOT NULL, pimgURL TEXT NOT NULL)", (error) => {
    if (error) {
      // tests error: display error
      console.log("ERROR: ", error)
    } else {
      // tests error: no error, the table has been created
      console.log("---> Table projects created!")
  
      const projects=[
        {id :"0", 
        name :"Lamp poster", 
        type :"poster", 
        year: "2023",
        url:"/img/Lamp-poster.jpg" },

        { id:"1", 
        name:"Ichiko Aoba poster", 
        type:"Poster", 
        year: "2023",
        url:"/img/ichikoooo.jpg" },

        { id:"2", 
        name:"Lone Lynx", 
        type:"Visual Identity",
        year: "2022", 
        url:"/img/sakura.jpeg" },

        { id:"3", 
        name:"Jumping frog",
        type: "Game", 
        year: "2023",
        url:"/img/jumping-frog.png" },
        
        { id: "4",
          name: "Our blue",
          type: "poster",
          year: "2023",
          url: "hahahahahaha"}
      ]
      // inserts projects
      projects.forEach( (oneProject) => {
        db.run("INSERT INTO projects (pid, pname, ptype, pyear, pimgURL) VALUES (?, ?, ?, ?, ?)", [oneProject.id, oneProject.name, oneProject.type, oneProject.year, oneProject.url], (error) => {
          if (error) {
            console.log("ERROR: ", error)
          } else {
            console.log("Line added into the projects table!")
          }
        })
      })
    }
  })
  
  // creates skills projects at startup
  db.run("CREATE TABLE skills (sid INTEGER PRIMARY KEY, sname TEXT NOT NULL, sdesc TEXT NOT NULL, stype TEXT NOT NULL)", (error) => {
    if (error) {
      // tests error: display error
      console.log("ERROR: ", error)
    } else {
      // tests error: no error, the table has been created
      console.log("---> Table skills created!")
  
      const skills=[
        {id:"0", 
        name: "HTML", 
        type: "Programming language", 
        desc: "Programming front-end"},

        {id:"1", 
        name: "CSS", 
        type: "Programming language", 
        desc: "Programming aesthetics of a website"},

        {id:"2", 
        name: "InDesign", 
        type: "Graphic design software", 
        desc: "Creating magazines, posters, flyers."},

        {id:"3", 
        name: "Illustrator", 
        type: "Graphic design software", 
        desc: "Creating logos, icons."},
      ]
  
      // inserts skills
      skills.forEach( (oneSkill) => {
        db.run("INSERT INTO skills (sid, sname, sdesc, stype) VALUES (?, ?, ?, ?)", [oneSkill.id, oneSkill.name, oneSkill.desc, oneSkill.type], (error) => {
          if (error) {
            console.log("ERROR: ", error)
          } else {
            console.log("Line added into the skills table!")
          }
        })
      })
    }
  })
  
  // creates table projectsSkills at startup
  db.run("CREATE TABLE projectsSkills (psid INTEGER PRIMARY KEY, pid INTEGER, sid INTEGER, FOREIGN KEY (pid) REFERENCES projects (pid), FOREIGN KEY (sid) REFERENCES skills (sid))", (error) => {
    if (error) {
      // tests error: display error
      console.log("ERROR: ", error)
    } else {
      // tests error: no error, the table has been created
      console.log("---> Table projectsSkills created!")
  
      const projectsSkills=[
        {"id":"1", "pid":"1", "sid": "2"},
        {"id":"2", "pid":"1", "sid": "8"},
        {"id":"3", "pid":"1", "sid": "9"},
        {"id":"4", "pid":"2", "sid": "3"},
        {"id":"5", "pid":"2", "sid": "4"},
        {"id":"6", "pid":"3", "sid": "1"},
        {"id":"7", "pid":"4", "sid": "2"},
        {"id":"8", "pid":"4", "sid": "8"},
        {"id":"9", "pid":"4", "sid": "9"},
        {"id":"10", "pid":"5", "sid": "1"}
      ]
      // inserts projectsSkills
      projectsSkills.forEach( (oneProjectSkill) => {
        db.run("INSERT INTO projectsSkills (psid, pid, sid) VALUES (?, ?, ?)", [oneProjectSkill.id, oneProjectSkill.pid, oneProjectSkill.sid], (error) => {
          if (error) {
            console.log("ERROR: ", error)
          } else {
            console.log("Line added into the projectsSkills table!")
          }
        })
      })
    }
  })


app.get("/login", (req, res) => {
  const model = {
    isLoggedIn: req.session.isLoggedIn,
    name: req.session.name,
    isAdmin: req.session.isAdmin,
  };
  res.render("login.handlebars", model);
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err) {
      res.status(500).send({ error: "Server error" });
    } else if (!user) {
      console.log("User not found. Username:", username); // Debugging
      req.session.isLoggedIn = false;
      res.render("login.handlebars", { error: "User not found" });
    } else {
      console.log("Stored username:", user.username);
      console.log("Stored hashed password:", user.hash);
      const result = bcrypt.compareSync(password, user.hash);
      console.log("Password comparison result:", result); // Debugging

      if (result) {
        req.session.user = user;
        if (user.isAdmin === 1) {
          req.session.isAdmin = true;
          req.session.isLoggedIn = true;
          req.session.name = "Admin";
          console.log("Admin is logged in!");
        } else {
          req.session.isAdmin = false;
          req.session.isLoggedIn = true;
          req.session.name = user.username;
          console.log("User is logged in!");
        }
        res.redirect("/");
      } else {
        console.log("Wrong password. Username:", username); // Debugging
        req.session.isLoggedIn = false;
        req.session.isAdmin = false;
        req.session.name = "";
        res.render("login.handlebars", { error: "Wrong password" });
      }
    }
  });
});



// defines a middleware to log all the incoming requests' URL
app.use((req, res, next) => {
    console.log("Req. URL: ", req.url)
    next()
});

app.get('/', (req, res)=> {
  res.render('home', { user: req.session?.user});
});

// renders a view WITHOUT DATA
app.get('/about', (req, res) => {
    res.render('about');
});

app.get('menu', (req, res)=> {
  res.render('menu');
});

// renders a view WITHOUT DATA
app.get('/contact', (req, res) => {
    res.render('contact');
});
app.get("/", (req, res) => {
  console.log("SESSION: ", req.session);
  const model = {
    isLoggedIn: req.session.isLoggedIn,
    name: req.session.name,
    isAdmin: req.session.isAdmin,
  };
  res.render("home.handlebars", model);
});

//shows each project on click
app.get("/projects/:id", function (req, res) {
  const id = req.params.id;

  db.get(
    "SELECT * FROM projects WHERE pid = ?",
    [id],
    function (error, project) {
      if (error) {
        const model = {
          hasDatabaseError: true,
          theError: error,
          isLoggedIn: req.session.isLoggedIn,
          name: req.session.name,
          isAdmin: req.session.isAdmin,
        };
        res.render("project.handlebars", model);
      } else if (!project) {
        // Project not found, send an appropriate response
        const model = {
          hasDatabaseError: false,
          theError: "",
          isLoggedIn: req.session.isLoggedIn,
          name: req.session.name,
          isAdmin: req.session.isAdmin,
          projectNotFound: true
        };
        res.render("project.handlebars", model);
      } else {
        const model = {
          hasDatabaseError: false,
          theError: "",
          pid: project.pid,
          pname: project.pname,
          pyear: project.pyear,
          pdesc: project.pdesc,
          ptype: project.ptype,
          pimgURL: project.pimgURL,
          isLoggedIn: req.session.isLoggedIn,
          name: req.session.name,
          isAdmin: req.session.isAdmin,
        };
        res.render("project.handlebars", model);
      }
    }
  );
});


app.post("/projects/new/", (req, res) => {
  const np = [
    req.body.projname,
    req.body.projyear,
    req.body.projdesc,
    req.body.projtype,
    req.body.projimg,
  ];
  if (req.session.isLoggedIn == true && req.session.isAdmin == true) {
    db.run(
      "INSERT INTO projects (pname, pyear, pdesc, ptype, pimgURL) VALUES (?, ?, ?, ?, ?)",
      np,
      (error) => {
        if (error) {
          console.log("ERROR: ", error);
        } else {
          console.log("Line added into the projects table!");
        }
        res.redirect("/projects");
      }
    );
  } else {
    res.redirect("/login");
  }
});


// renders a view WITH DATA!!!
app.get("/projects", function (req, res) {
  db.all("SELECT * FROM projects", function (error, theProjects) {
    if (error) {
      const model = {
        hasDatabaseError: true,
        theError: error,
        projects: [],
        isLoggedIn: req.session.isLoggedIn,
        name: req.session.name,
        isAdmin: req.session.isAdmin,
      };
      res.render("projects.handlebars", model);
    } else {
      const model = {
        hasDatabaseError: false,
        theError: "",
        projects: theProjects,
        isLoggedIn: req.session.isLoggedIn,
        name: req.session.name,
        isAdmin: req.session.isAdmin,
      };
      res.render("projects.handlebars", model);
    }
  });
});

// run the server and make it listen to the port
app.listen(port, () => {
    console.log(`Server running and listening on port ${port}...`)
});