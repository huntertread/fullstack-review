const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useMongoClient: true});

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  owner_avatar: String, // owner.avatar_url from github api
  owner_login: String, // owner.login from github api
  name: String,
  url: {type: String, unique: true},
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (avatar, login, reponame, repourl, repoforks) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  var repo = new Repo({
    owner_avatar: avatar,
    owner_login: login,
    name: reponame,
    url: repourl,
    forks: repoforks,
  })
  repo.save(function(err, repo) {
    if (err) {
      return console.error(err);
    } else {
      console.log(`REPO: ${reponame} WAS SAVED!`);
    }
  })
}

module.exports = save;
// module.exports = Repo;
// need to create a helper function here instead of exporting repo
// Repo.find().sort({forks: 1}).limit(25); // table is called repos in mongodb!!