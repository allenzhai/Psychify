import React, { Component } from 'react';
import './style/SortMenu.css';

export class SortMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleClickOutside.bind(this);
    this.toggleList = this.toggleList.bind(this);
    this.toggleSelected = this.toggleSelected.bind(this);
    this.state = {
     listOpen: false,
     headerTitle : "Sort By"
    }
  }

  handleClickOutside(){
    this.setState({
      listOpen: false
    })
  }

  toggleList(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  toggleSelected(e){
    this.toggleList();
    this.props.onSortUpdate(e.target.innerText);
    this.props.onSortSubmit();

  }



  render(){
    const{ list } = this.props;
    const{ listOpen, headerTitle } = this.state;

    return(
      <div className="sortbyList-container">
        <div className="sortby-header" onClick={() => this.toggleList()}>
          <div className="sortby-header-title">{headerTitle}</div>
        </div>
        {listOpen && 
          <ul className="sortbyList">
            <li className="sortby-list-item" onClick={this.toggleSelected}> {this.props.list[0].title} </li>
            <li className="sortby-list-item" onClick={this.toggleSelected}> {this.props.list[1].title} </li>
            <li className="sortby-list-item" onClick={this.toggleSelected}> {this.props.list[2].title} </li>
            <li className="sortby-list-item" onClick={this.toggleSelected}> {this.props.list[3].title} </li>
          </ul>
        }
      </div>
    )
  }
}
