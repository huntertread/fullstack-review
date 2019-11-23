const request = require('request');
const config = require('../config.js');

const getReposByUsername = (userName) => {

  // parse the incoming userName
  var stringUn = JSON.stringify(userName);
  stringUn = stringUn.replace(':', '');
  stringUn = stringUn.replace('{', '');
  stringUn = stringUn.replace('}', '');
  stringUn = stringUn.replace(/"/g, '');

  // create the options object for request module
  let options = {
    url: `https://api.github.com/users/${stringUn}/repos`, // this is probably where to hit the repositories end point?
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  // create request promise
  return new Promise(function(resolve, reject) {
    request(options, function(error, response, body) {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(body));
      }
    });
  })
}

module.exports.getReposByUsername = getReposByUsername;