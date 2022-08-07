import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { ACTIONS } from '../../reducers/AddNewCategoryReducer';

class AddNewCategory extends Component {
  constructor() {
    super();
    this.state = {
      showDropdown: false,
    }
  }


  async componentDidMount() {
    await this.props.init();
  }

  onFocus = () => {
    this.setState({
      showDropdown: true,
    });
  }

  onBlur = () => {
    this.setState({
      showDropdown: false,
    });
  }

  render() {
    const { showDropdown } = this.state;

    const {
      newCategory,
      changeNewCategory,
      submitNewCategory,
      filteredCategories,
      submitttingFlag,
    } = this.props;


    return (
      <div className="admin-add-new-category">
        <div style={{ position: 'relative', width: '100%' }}>
          <div className="admin-one-form-item">
            <TextField
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              value={newCategory}
              className="one-form-field"
              label="Enter category name"
              variant="outlined"
              onChange={e => changeNewCategory(e.target.value)}
            />
          </div>
          {showDropdown && (
            <div className="filtered-category-dropdown">
              {filteredCategories.map(d => (
                <div>{d.categoryName}</div>
              ))}
            </div>
          )}
        </div>
        <div className="admin-one-form-item">
          <Button
            variant="contained"
            onClick={submitttingFlag ? () => {} : submitNewCategory}
          >
            {submitttingFlag ? 'Wait...' : 'Submit'}
          </Button>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  const {
    newCategory,
    filteredCategories,
    submitttingNewCatFlag,
  } = state.addNewCategory;

  return {
    newCategory,
    filteredCategories,
    submitttingNewCatFlag
  };
}

const mapDispatch = {
  init: ACTIONS.init,
  changeNewCategory: ACTIONS.changeNewCategory,
  submitNewCategory: ACTIONS.submitNewCategory,
}

export default connect(mapState, mapDispatch)(AddNewCategory);
