import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';
import Top25 from './components/Top25.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      page_count: false,
      page_count_check: true
    }
    this.getTop25 = this.getTop25.bind(this);
  }

  search (term, callback) { // uses getTop25 as the callback
    console.log(`${term} was searched`);
    // TODO
    $.ajax({
      type: "POST",
      url: "/repos",
      data: term,
      success: function(){
        console.log("SUCCESSFUL POST TO SERVER");
        callback();
      },
      error: function(){
        console.log("FAILED POST TO SERVER");
      },
      dataType: "text" // "json"?
    });
  }

  // need to set this in state. use axios?
  getTop25() {
    axios.get("/repos")
      .then((repositories) => {
        this.setState({repos: repositories.data});
        console.log('current state for index.js: ', repositories.data)
      })
      .catch((err) => {
        console.error(err);
      })
  }

  componentDidMount() {
    this.getTop25()
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} />
      <Search onSearch={this.search.bind(this)} getTop25={this.getTop25}/>
      <Top25 repos={this.state.repos} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));