import React from 'react';

// let this be defined via mapping in main app component (or this component)?
let Top25 = ({repos}) => {
  const topRepos = repos.map((repo, i) =>
    <div>
      <li key={i}>
        <img src={repo.owner_avatar} height="60" width="60"></img><br/>
        Repo Owner: {repo.owner_login}<br/>
        Repo Name: {repo.name}<br/>
        Repo URL: <a href={repo.url}>{repo.url}</a><br/>
        Number of Forks: {repo.forks}
      </li><br/>
    </div>
  );
  return (
  <ul>{topRepos}</ul>
  )
}

export default Top25;