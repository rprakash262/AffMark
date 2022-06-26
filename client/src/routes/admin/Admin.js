import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import AddNewCategory from './AddNewCategoryForm';
import AddNewSubCategory from './AddNewSubCategoryForm';
import AddNewItemForm from './AddNewItemForm';
import { ACTIONS } from '../../reducers/AdminReducer';
import './Admin.css';

class Admin extends Component {
  async componentDidMount() {
    this.props.init();
  }

  render() {
    const {
      selectedTab,
      newCategory,
      allCategories,
      changeNewCategory,
      setSelectedTab,
      newSubCategory,
      changeNewSubCategory,
      submitNewCategory,
      selectedCategoryId,
      selectedSubCategoryId,
      selectCategory,
      submitNewSubCategory,
      allSubCategories,
      subcategoriesForCategory,
      selectSubCategory,
      changeNewItemFormData,
      newItemFormData,
      changeItemImage,
      uploadItemImage,
      submitNewItem,
      imageUrl,
      uploadingImage,
      changeSecurityKey,
      submitSecurityKey,
      loggedIn,
      filteredCategories,
      filteredSubCategories,
      submitttingFlag,
      discardImage,
    } = this.props;

    return (
      <div>
        {!loggedIn && (
          <div className="admin">
            <div className="admin-add-new-category">
              <div className="admin-one-form-item">
                <input
                  type="text"
                  placeholder="Enter security key"
                  onChange={e => changeSecurityKey(e.target.value)}
                />
              </div>
              <div className="admin-one-form-item">
                <button onClick={submitSecurityKey}>Enter</button>
              </div>
            </div>
          </div>
        )}
        {loggedIn && (
          <div className="admin">
            <div className="admin-sidenav">
              <div
                className="admin-one-nav-item"
                onClick={() => setSelectedTab('addNewCategory')}
              >
                Add New Category
                {selectedTab === 'addNewCategory' && (
                  <ArrowDropDownIcon className="admin-nav-arrow-down" />
                )}
              </div>
              <div
                className="admin-one-nav-item"
                onClick={() => setSelectedTab('addNewSubCategory')}
              >
                Add New Sub-Category
                {selectedTab === 'addNewSubCategory' && (
                  <ArrowDropDownIcon className="admin-nav-arrow-down" />
                )}
              </div>
              <div
                className="admin-one-nav-item"
                onClick={() => setSelectedTab('addNewItem')}
              >
                Add New Item
                {selectedTab === 'addNewItem' && (
                  <ArrowDropDownIcon className="admin-nav-arrow-down" />
                )}
              </div>
            </div>
            <div className="admin-main-area">
              {selectedTab === 'addNewCategory' && (
                <AddNewCategory
                  // submitttingFlag={submitttingFlag}
                  // newCategory={newCategory}
                  // changeNewCategory={changeNewCategory}
                  // submitNewCategory={submitNewCategory}
                  // filteredCategories={filteredCategories}
                />
              )}
              {selectedTab === 'addNewSubCategory' && (
                <AddNewSubCategory
                  submitttingFlag={submitttingFlag}
                  allCategories={allCategories}
                  changeNewSubCategory={changeNewSubCategory}
                  newSubCategory={newSubCategory}
                  selectedCategoryId={selectedCategoryId}
                  selectCategory={selectCategory}
                  submitNewSubCategory={submitNewSubCategory}
                  filteredSubCategories={filteredSubCategories}
                />
              )}
              {selectedTab === 'addNewItem' && (
                <AddNewItemForm
                  selectCategory={selectCategory}
                  selectedCategoryId={selectedCategoryId}
                  allCategories={allCategories}
                  allSubCategories={allSubCategories}
                  subcategoriesForCategory={subcategoriesForCategory}
                  selectSubCategory={selectSubCategory}
                  selectedSubCategoryId={selectedSubCategoryId}
                />
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  const {
    selectedTab,
    newCategory,
    newSubCategory,
    allCategories,
    allSubCategories,
    selectedCategoryId,
    selectedSubCategoryId,
    newItemFormData,
    subcategoriesForCategory,
    imageUrl,
    uploadingImage,
    loggedIn,
    filteredCategories,
    filteredSubCategories,
    submitttingFlag,
  } = state.admin;

  return {
    selectedTab,
    newCategory,
    newSubCategory,
    allCategories,
    selectedCategoryId,
    selectedSubCategoryId,
    allSubCategories,
    newItemFormData,
    subcategoriesForCategory,
    imageUrl,
    uploadingImage,
    loggedIn,
    filteredCategories,
    filteredSubCategories,
    submitttingFlag,
  };
}

const mapDispatch = {
  init: ACTIONS.init,
  changeNewCategory: ACTIONS.changeNewCategory,
  setSelectedTab: ACTIONS.setSelectedTab,
  submitNewCategory: ACTIONS.submitNewCategory,
  changeNewSubCategory: ACTIONS.changeNewSubCategory,
  selectCategory: ACTIONS.selectCategory,
  selectSubCategory: ACTIONS.selectSubCategory,
  submitNewSubCategory: ACTIONS.submitNewSubCategory,
  changeNewItemFormData: ACTIONS.changeNewItemFormData,
  changeItemImage: ACTIONS.changeItemImage,
  uploadItemImage: ACTIONS.uploadItemImage,
  submitNewItem: ACTIONS.submitNewItem,
  changeSecurityKey: ACTIONS.changeSecurityKey,
  submitSecurityKey: ACTIONS.submitSecurityKey,
  discardImage: ACTIONS.discardImage,
}

export default connect(mapState, mapDispatch)(Admin);