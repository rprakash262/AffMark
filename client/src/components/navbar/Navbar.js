import React, { Component } from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { connect } from 'react-redux';

import './Navbar.css';

class Navbar extends Component {
  redirectHandler = id => {
    window.location.href = `/category?id=${id}`;
  }

  redirectHandler2 = id => {
    window.location.href = `/category/subCategory?id=${id}`;
  }

  render() {
    const { navbar } = this.props;

    return (
      <div className="navbar">
        <div className="navbar-container">
          {Object.entries(navbar).map(([key, val]) => (
            <div className="one-nav-item">
              <div className="one-nav-item-name">
                {key.toUpperCase()} <ArrowDropDownIcon style={{ fontSize: '20px' }} />
              </div>
              <div className="one-nav-item-dropdown">
                {val.map(v => 
                  <div onClick={() => this.redirectHandler2(v.id)}>{v.subCategoryName}</div>
                )}
                <div onClick={() => this.redirectHandler(val[0].categoryId)}>See All</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  const { navbar } = state.layout;

  return {
    navbar,
  }
};

const mapDispatch = {};

export default connect(mapState, mapDispatch)(Navbar);
