const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const expressValidator = require('express-validator');
const electionName = require('./models/electionName');
const admin = require('./models/admin')
const md5 = require('md5');
require('./db/mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.get('/', function(req, res) {
    res.json('Works!');
});

app.get('/api/electionName', function(req, res) {
    var electionNames = []
    var electionOrganizers = []
    var electionIds = []
    var final = []
    electionName.find({}).then(eachOne => {
        for (i = 0; i < eachOne.length; i++){
            electionNames[i] = eachOne[i].election_name ;
            electionOrganizers[i] = eachOne[i].election_organizer;
            electionIds[i] = eachOne[i].election_id;
            final.push({
                'election_id': eachOne[i].election_id,
                'election_organizer': eachOne[i].election_organizer,
                'election_name': eachOne[i].election_name
            })
        }
        res.send(final);
    })
})

app.post('/api/electionName', async function(req, res) {
    electionName.create({
        election_id: Math.floor(Math.random() * 100),
        election_name: req.body.election_name,
        election_organizer: req.body.election_organizer,
        election_password: md5(req.body.election_password),
    }).then(election => {
        res.json(election);
    });
});

/*app.post('/api/adminLogin', async function(req, res) {
    admin.findOne({
        username: req.body.username,
        password: md5(req.body.password),
    }).then(election => {
        if(election === null){
            res.send(false);
        }else{
            res.send(true);
        }
    });
});
*/
app.post('/api/adminLogin', async function(req, res) {
  console.log("🚨 Login Attempt 🚨");
  console.log("Username from client:", req.body.username);
  console.log("Password (before hashing):", req.body.password);

  const hashedPassword = md5(req.body.password);
  console.log("Password (after hashing):", hashedPassword);

  const foundAdmin = await admin.findOne({
      username: req.body.username,
      password: hashedPassword,
  });

  console.log("Found admin from DB:", foundAdmin);

  if (foundAdmin === null) {
      console.log("❌ Login failed");
      res.send(false);
  } else {
      console.log("✅ Login success");
      res.send(true);
  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("Server is up on port " + port)
});



/*const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const md5 = require('md5');
require('./db/mongoose');
const electionName = require('./models/electionName');
const admin = require('./models/admin');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.get('/', (req, res) => {
  res.send('✅ Backend is running');
});

app.get('/api/electionName', (req, res) => {
  electionName.find({}).then(data => {
    res.send(data);
  });
});

app.post('/api/electionName', (req, res) => {
  electionName.create({
    election_id: Math.floor(Math.random() * 100),
    election_name: req.body.election_name,
    election_organizer: req.body.election_organizer,
    election_password: md5(req.body.election_password),
  }).then(data => {
    res.send(data);
  });
});

app.post('/api/adminLogin', (req, res) => {
  admin.findOne({
    username: req.body.username,
    password: md5(req.body.password),
  }).then(user => {
    res.send(user !== null);
  });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
*/
