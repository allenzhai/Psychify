import React, { Component } from 'react';
import { Navbar } from './components/Navbar.js';

export class Forum extends React.Component {
  //Blank placeholder component for the Forum page
  //Also testing server responses
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getServerResponse();
  }

  // Retrieves the list of items from the Express app
  getServerResponse() {
    fetch('/api/getList') //fetch the data from the server
      .then(res => res.json()) //parses json response
      .then(list => this.setState({ list })) //set the state to the fetched data
  }

  render() {
    const { list } = this.state;
    return (
      <div>
        <Navbar />
        <h1>Forum</h1>
        {list.length ? (
          <div>
            {list.map((item) => {
              return (
                <div>
                  {item}
                </div>
              )
            })}
          </div>) : (
            <div><p>List is empty.</p></div>
          )
        }
      </div>
    );
  }
}