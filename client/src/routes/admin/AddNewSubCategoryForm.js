import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { ACTIONS } from '../../reducers/AddNewSubCategoryReducer';

// import SelectDropdown from '../../components/selectDropdown';

const useStyles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 390,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


class AddNewCategory extends Component {
  constructor() {
    super();
    this.state = {
      showDropdown: false,
    }
  }

  async componentDidMount() {
    this.props.init();
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
    const { classes } = this.props;
    const { showDropdown } = this.state;
    
    const {
      allCategories,
      changeNewSubCategory,
      newSubCategory,
      selectedCategoryId,
      selectCategory,
      submitNewSubCategory,
      filteredSubCategories,
      submitttingFlag,
    } = this.props;


    return (
      <div className="admin-add-new-sub-category">
        <div className="admin-one-form-item">
          <FormControl className={classes.formControl}>
            {/* <SelectDropdown
              selectedItem={allCategories.find(d => d.id === selectedCategoryId) ?
                allCategories.find(d => d.id === selectedCategoryId).categoryName :
                'Select Category'
              }
              selectItem={id => selectCategory(id)}
              dropdownList={allCategories.map(d => ({
                id: d.id,
                value:d.categoryName,
              }))}
            /> */}
            <InputLabel id="demo-mutiple-name-label">Select Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCategoryId}
              onChange={e => selectCategory(e.target.value)}
              MenuProps={MenuProps}
            >
              <MenuItem>Select Category</MenuItem>
              {allCategories.map(d => (
                <MenuItem
                  selected={d.id === selectedCategoryId}
                  value={d.id}
                  key={d.id}
                >
                  {d.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div style={{ position: 'relative', width: '100%' }}>
          <div className="admin-one-form-item">
            {/* <input
              type="text"
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              placeholder="Enter sub-category name"
              onChange={e => changeNewSubCategory(e.target.value)}
              value={newSubCategory}
            /> */}
            <TextField
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              value={newSubCategory}
              className="one-form-field"
              label="Enter sub-category name"
              variant="outlined"
              onChange={e => changeNewSubCategory(e.target.value)}
            />
          </div>
          {showDropdown && (
            <div className="filtered-category-dropdown">
              {filteredSubCategories.map(d => (
                <div>{d.subCategoryName}</div>
              ))}
            </div>
          )}
        </div>
        <div className="admin-one-form-item">
          <Button
            variant="contained"
            onClick={submitttingFlag ? () => {} : submitNewSubCategory}
            // className="admin-button"
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
    newSubCategory,
    selectedCategoryId,
    allCategories,
    filteredCategories,
    filteredSubCategories,
    submitttingNewSubCatFlag,
} = state.addNewSubCategory;

  return {
    newSubCategory,
    selectedCategoryId,
    allCategories,
    filteredCategories,
    filteredSubCategories,
    submitttingNewSubCatFlag,
  }
}

const mapDispatch = {
  init: ACTIONS.init,
  changeNewSubCategory: ACTIONS.changeNewSubCategory,
  selectCategory: ACTIONS.selectCategory,
  submitNewSubCategory: ACTIONS.submitNewSubCategory,
}

export default connect(mapState, mapDispatch)(withStyles(useStyles)(AddNewCategory));
