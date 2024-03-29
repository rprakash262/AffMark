import React, { Component } from 'react';
import { connect } from 'react-redux';

import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { ACTIONS } from '../../reducers/OneSubCategoryReducer';
import { ACTIONS as addNewItemActions } from '../../reducers/AddNewItemReducer';
import './OneSubcategory.css';
import OneItem from '../../components/oneItem';

class OneSubcategory extends Component {
  componentDidMount() {
    const query = this.props.location.search;
    const id = query.slice(query.indexOf('=') + 1);

    this.props.init(id);
  }

  redirectHandler = productId => {
    window.location.href = `/category/subCategory/product?id=${productId}`;
  }

  render() {
    const {
      oneSubCategoryContent,
      loadingData,
      loggedIn,
      editItem,
      deleteItem,
    } = this.props;

    return (
      <div>
        {loadingData && (
          <div>
            <HourglassBottomIcon />
          </div>
        )}
        <div className="home-page-item-panel-content">
          {oneSubCategoryContent.map(item =>
            <OneItem
              item={item}
              loggedIn={loggedIn}
              editItem={editItem}
              deleteItem={deleteItem}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  const {
    oneSubCategoryContent,
    loadingData,
    loggedIn
  } = state.oneSubCategory;

  return {
    oneSubCategoryContent,
    loadingData,
    loggedIn
  }
};

const mapDispatch = {
  init: ACTIONS.init,
  editItem: addNewItemActions.editItem,
  deleteItem: addNewItemActions.deleteItem,
}

export default connect(mapState, mapDispatch)(OneSubcategory);
