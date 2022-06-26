import React, { Component } from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import './SelectDropdown.css';

class SelectDropdown extends Component {
  constructor() {
    super();
    this.state = {
      showDropdown: false,
    }
  }

  showDropdownList = () => {
    this.setState(state => ({
      showDropdown: state.showDropdown ? false : true,
    }))
  }

  hideDropdownList = () => {
    this.setState({
      showDropdown: false,
    })
  }

  selectItemHandler = id => {
    this.setState({
      showDropdown: false,
    }, () => {
      this.props.selectItem(id);
    })
  }

  render() {
    const { dropdownList, selectedItem, selectItem } = this.props
    const { showDropdown } = this.state;

    return (
        <div className="select-dropdown">
          <div
            className="select-dropdown-selected-item"
            onClick={this.showDropdownList}
            onBlur={this.hideDropdownList}
          >
            <span>{selectedItem}</span>
            <KeyboardArrowDownIcon />
          </div>
          {showDropdown && (
            <div className="select-dropdown-list">
              {dropdownList.map(d => (
                  <div onClick={() => this.selectItemHandler(d.id)}>{d.value}</div>
              ))}
            </div>
          )}
        </div>
    );
  }
}

export default SelectDropdown;
