import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ACTIONS } from '../../reducers/HomePageReducer';
import { ACTIONS as addNewItemActions } from '../../reducers/AddNewItemReducer';
import './HomePage.css';
import Carousel from '../../components/carousel';
import OneItem from '../../components/oneItem';
import Scrollable from '../../components/scrollable';

class HomePage extends Component {
  componentDidMount() {
    this.props.init();
  }

  redirectHandler = id => {
    window.location.href = `/category?id=${id}`;
  }

  render() {
    const {
      homePageContent,
      loadingHomePage,
      featuredItems,
      loggedIn,
      editItem,
      deleteItem,
    } = this.props;

    return (
      <div>
        <Carousel featuredItems={featuredItems} />
        {loadingHomePage && (
          <div>
            <div className="home-page-item-panel">
              <div className="home-page-item-panel-header">
                <h4>Loading...</h4>
                <button>Loading...</button>
              </div>
              <div className="home-page-item-panel-content">
                Loading...
              </div>
            </div>
          </div>
        )}
        {Object.entries(homePageContent).map(([key, val]) => (
          <div className="home-page-item-panel">
            <div className="home-page-item-panel-header">
              <h4>{key}</h4>
              <button onClick={() => this.redirectHandler(val[0].categoryId)}>
                See All
              </button>
            </div>
            <div style={{ width: '100%', height: '100%' }}>
              <Scrollable scrollX>
                <div className="home-page-item-panel-content">
                    {val.map(item => (
                      <OneItem
                        item={item}
                        loggedIn={loggedIn}
                        editItem={editItem}
                        deleteItem={deleteItem}
                      />
                    ))}
                </div>
              </Scrollable>
              </div>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => {
  const {
    homePageContent,
    loadingHomePage,
    featuredItems,
    loggedIn
  } = state.homePage;

  return {
    homePageContent,
    loadingHomePage,
    featuredItems,
    loggedIn,
  }
}

const mapDispatch = {
  init: ACTIONS.init,
  editItem: addNewItemActions.editItem,
  deleteItem: addNewItemActions.deleteItem,
}

export default connect(mapState, mapDispatch)(HomePage);
