import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ACTIONS } from '../../reducers/OneSubCategoryReducer';
import { ACTIONS as adminActions } from '../../reducers/AdminReducer';
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
            Loading...
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
  editItem: adminActions.editItem,
  deleteItem: adminActions.deleteItem,
}

export default connect(mapState, mapDispatch)(OneSubcategory);
