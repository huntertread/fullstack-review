import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';
import Top25 from './components/Top25.jsx';
// import getReposByUsername from '../../helpers/github.js';

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

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax({
      type: "POST",
      url: "/repos",
      data: term, //.toString(), // NEED
      success: function(){
        console.log("SUCCESSFUL POST TO SERVER");
      },
      error: function(){
        console.log("FAILED POST TO SERVER");
      },
      dataType: "text" // NEED, "json"?
    });
  }

  // need to set this in state. use axios?
  getTop25() {
    console.log("top 25 was initiated")
    axios.get("/repos")
      .then((repositories) => {
        this.setState({repos: repositories.data});
        console.log(repositories.data);
        this.setState({page_count: !this.state.page_count});
      })
      // .then(() => {
      //   getTop25();
      // })
      .catch((err) => {
        console.error(err);
      })
  }

  componentDidMount() {
    this.getTop25()
  }

  render () {
    // if (this.state.page_count === this.state.page_count_check) {
    //   this.setState({page_count_check: !this.state.page_count_check})
    //   console.log('conditional render satisfied')
    //   console.log(this.state.page_count);
    //   this.getTop25()
    // }
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} />
      <Search onSearch={this.search.bind(this)} getTop25={this.getTop25}/>
      <Top25 repos={this.state.repos} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));