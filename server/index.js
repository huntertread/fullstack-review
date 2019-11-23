const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const getReposByUsername = require('../helpers/github.js');
const save = require('../database/index.js');
const Repo = require('../database/index.js');

app.use(bodyParser.urlencoded({extended: false})); // set this to true?
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  // console.log("SUCCESSFUL POST TO /repos ENDPOINT ON SERVER");
  getReposByUsername.getReposByUsername(req.body)
    .then(function (results) {
      for (var i = 0; i < results.length; i++) {
        // variables to store values for save:
        var avatar = results[i]['owner']['avatar_url'];
        var login = results[i]['owner']['login'];
        var repoName = results[i]['name'];
        var repoUrl = results[i]['url'];
        var forks = results[i]['forks'];
        // console.log(avatar);
        // console.log(login);
        // console.log(repoName);
        // console.log(repoUrl);
        // console.log(forks);
        save.save(avatar, login, repoName, repoUrl, forks);
      }
    })
});

app.get('/repos', function (req, res) {
  console.log("GOT SOMETHING")
  // TODO - your code here!
  // This route should send back the top 25 repos
  // query mongo for all documents with forks value greater than n
  Repo.find().sort({forks: 1}).limit(25); // table is called repos in mongodb!!
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

