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
  // converts the post data to something usable for github api
  // var stringUn = JSON.stringify(userName);
  // stringUn = stringUn.replace(':', '');
  // stringUn = stringUn.replace('{', '');
  // stringUn = stringUn.replace('}', '');
  // stringUn = stringUn.replace(/"/g, '');

  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  // let options = {
  //   url: `https://api.github.com/users/${stringUn}/repos`, // this is probably where to hit the repositories end point?
  //   headers: {
  //     'User-Agent': 'request',
  //     'Authorization': `token ${config.TOKEN}`
  //   }
  // };
  // request(options, function(error, response, body) {
  //   console.error("error: ", error);
  //   console.log("status code: ", response && response.statusCode);
  //   // var parsedBody = JSON.parse(body);
  //   // return parsedBody;
  // });
}

module.exports.getReposByUsername = getReposByUsername;