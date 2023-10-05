// loads several packages
const express = require('express');
const { engine } = require('express-handlebars');
const sqlite3 = require('sqlite3')
const port = 8080 // defines the port
const app = express();// creates the Express app 

app.use(express.static("public"));

// MODEL (DATA)
const db = new sqlite3.Database('isabel-data.db')
// creates table projects at startup
db.run("CREATE TABLE projects (pid INTEGER PRIMARY KEY, pname TEXT NOT NULL, ptype TEXT NOT NULL, pimgURL TEXT NOT NULL)", (error) => {
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
        url:"/img/Lamp-poster.jpg" },

        { id:"1", 
        name:"Ichiko Aoba poster", 
        type:"Poster", 
        url:"/img/ichikoooo.jpg" },

        { id:"2", 
        name:"Lone Lynx", 
        type:"Visual Identity", 
        url:"/img/sakura.jpeg" },

        { id:"3", 
        name:"Jumping frog",
        type: "Game", 
        url:"/img/satoru.jpeg" },
        
        { id: "4",
          name: "Our blue",
          type: "poster",
          url: "hahahahahaha"}
      ]
      // inserts projects
      projects.forEach( (oneProject) => {
        db.run("INSERT INTO projects (pid, pname, ptype, pimgURL) VALUES (?, ?, ?, ?)", [oneProject.id, oneProject.name, oneProject.type, oneProject.url], (error) => {
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

  // creates user table at startup
db.run(
  "CREATE TABLE users (uid INTEGER PRIMARY KEY, username TEXT NOT NULL, password TEXT NOT NULL, hash TEXT NOT NULL, date INTEGER NOT NULL, admin INTEGER NOT NULL)",
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
          admin: 1,
        },
        {
          id: "1",
          username: "pepe123",
          password: "lamancha",
          hash: "lamancha",
          date: "0810",
          admin: 0,
        },
        {
          id: "2",
          username: "eleduardo",
          password: "pomposo",
          hash: "peligroso",
          date: "2203",
          admin: 0,
        },
        {
          id: "3",
          username: "coca",
          password: "piscina",
          hash: "mantecado",
          date: "1904",
          admin: 0,
        },
        {
          id: "4",
          username: "gatinho",
          password: "lacontrasena",
          hash: "lacontrasena",
          date: "2708",
          admin: 0,
        },
      ];
      initialUsers.forEach((user) => {
        //const hash = bcrypt.hashSync(user.password, 10);

        db.run(
          "INSERT INTO users (uid, username, password, hash, email, isAdmin) VALUES (?, ?, ?, ?, ?, ?)",
          [
            user.id,
            user.username,
            user.password,
            hash,
            user.date,
            user.admin,
          ],
          (error) => {
            if (error) {
              console.error("ERROR: ", error);
              // res.status(500).send({ error: "Server error" });
            } else {
              console.log("Line added into the projects table!");
            }
          }
        );
      });
    }
  }
);

  
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
  

// defines handlebars engine
app.engine('handlebars', engine());
// defines the view engine to be handlebars
app.set('view engine', 'handlebars');
// defines the views directory
app.set('views', './views');


// define static directory "public"
app.use(express.static('public'))

// defines a middleware to log all the incoming requests' URL
app.use((req, res, next) => {
    console.log("Req. URL: ", req.url)
    next()
})

/***
ROUTES
***/
// renders a view WITHOUT DATA
app.get('/', (req, res) => {
    res.render('home');
});

// renders a view WITHOUT DATA
app.get('/about', (req, res) => {
    res.render('about');
});

// renders a view WITHOUT DATA
app.get('/contact', (req, res) => {
    res.render('contact');
});

// renders a view WITH DATA!!!
app.get('/projects', (req, res) => {
    db.all("SELECT * FROM projects", function (error, theProjects) {
        if (error) {
            const model = {
                dbError: true,
                theError: error,
                projects: []
            }
            // renders the page with the model
            res.render("projects.handlebars", model)
        }
        else {
            const model = {
                dbError: false,
                theError: "",
                projects: theProjects
            }
            // renders the page with the model
            res.render("projects.handlebars", model)
        }
      })
});

// sends back a SVG image if asked for "/favicon.ico"
app.get('/favicon.ico', (req, res) => {
    res.setHeader("Content-Type", "image/svg+xml")
    res.sendFile(__dirname + "/img/jl.svg")
});

// run the server and make it listen to the port
app.listen(port, () => {
    console.log(`Server running and listening on port ${port}...`)
});