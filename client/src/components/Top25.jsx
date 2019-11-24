import React from 'react';

let Top25 = ({repos}) => {
  const topRepos = repos.map((repo, i) => // mapping the individual repos to list items
    <div key={i}>
      <li>
        <img src={repo.owner_avatar} height="45" width="45"></img><br/>
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