const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const getReposByUsername = require('../helpers/github.js');
const dbhelper = require('../database/index.js');

app.use(bodyParser.urlencoded({extended: false})); // set this to true?
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  getReposByUsername.getReposByUsername(req.body)
    .then(function (results) {
      for (var i = 0; i < results.length; i++) {
        // variables to store values for save:
        var avatar = results[i]['owner']['avatar_url'];
        var login = results[i]['owner']['login'];
        var repoName = results[i]['name'];
        var repoUrl = results[i]['url'];
        var forks = results[i]['forks'];
        dbhelper.save(avatar, login, repoName, repoUrl, forks);
      }
    })
    .then(() => {
      res.status(201).send(results)
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send('there was an error with your post request')
    })
});

app.get('/repos', function (req, res) {
  // console.log(dbhelper.find25());
  dbhelper.find25()
    .then((results) => {
      res.status(200).send(results)
    })
    .catch((err) => {
      console.err(err)
      res.status(404).send('there was an error with your get request');
    })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

