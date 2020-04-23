/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

import '../style/SortMenu.css';

export default class SortMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleClickOutside.bind(this);
    this.toggleList = this.toggleList.bind(this);
    this.toggleSelected = this.toggleSelected.bind(this);
    this.state = {
      listOpen: false,
      headerTitle: 'Sort By'
    };
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick = (e) => {
    console.log(e.target);
    console.log(this.outer);
    if (!this.outer.contains(e.target)) {
      this.handleClickOutside();
    }
    return 0;
  }

  handleClickOutside() {
    this.setState({
      listOpen: false
    });
  }

  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  }

  toggleSelected(e) {
    const { onSortUpdate, onSortSubmit } = this.props;
    this.toggleList();
    onSortUpdate(e.target.innerText);
    onSortSubmit();
  }

  render() {
    const { list } = this.props;
    const { listOpen, headerTitle } = this.state;

    return (
      // eslint-disable-next-line no-return-assign
      <div ref={outer => this.outer = outer}>
        <div className="sortbyList-container">
          <div className="sortby-header" onClick={() => this.toggleList()} role="button" tabIndex={0}>
            <div className="sortby-header-title">{headerTitle}</div>
          </div>
          {listOpen
            && (
            <ul className="sortbyList">
              <li className="sortby-list-item" onClick={this.toggleSelected}>
                {' '}
                {list[0].title}
                {' '}
              </li>
              <li className="sortby-list-item" onClick={this.toggleSelected}>
                {' '}
                {list[1].title}
                {' '}
              </li>
              <li className="sortby-list-item" onClick={this.toggleSelected}>
                {' '}
                {list[2].title}
                {' '}
              </li>
              <li className="sortby-list-item" onClick={this.toggleSelected}>
                {' '}
                {list[3].title}
                {' '}
              </li>
            </ul>
            )
          }
        </div>
      </div>
    );
  }
}

SortMenu.PropTypes = {
  list: PropTypes.array.isRequired,
  searchterms: PropTypes.string.isRequired,
  onSortSubmit: PropTypes.func.isRequired,
  onSortUpdate: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired
}