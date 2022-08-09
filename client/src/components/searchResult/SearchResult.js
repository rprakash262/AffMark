import React, { Component } from 'react';
import { connect } from 'react-redux';

import './SearchResult.css';
import { ACTIONS } from '../../reducers/SearchReducer';

class SearchResult extends Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const { searchFlag } = this.props;

    return (
      <div className="search-result">
        {searchFlag && 'Searching...'}
        {!searchFlag && 'Search Result'}
      </div>
    )
  }
}

const mapState = state => {
  const {
    searchFlag
  } = state.search;

  return{
    searchFlag,
  }
}

const mapDispatch = {
  init: ACTIONS.init,
}

export default connect(mapState, mapDispatch)(SearchResult);
