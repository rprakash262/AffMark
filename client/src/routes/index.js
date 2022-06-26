import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
  
import { ACTIONS } from '../reducers/LayoutReducer';
import HomePage from './homePage';
import OneProduct from './oneProduct';
import OneCategory from './oneCategory';
import OneSubcategory from './oneSubcategory';
import Admin from './admin';
import Banner from '../components/banner';
import Navbar from '../components/navbar';
// import Footer from '../components/footer';
import AlertBar from '../components/alertBar';
import EditItemModal from '../components/editItemModal';
import ConfirmDeleteItemPrompt from '../components/confirmDeleteItemPrompt';

const SearchResult = '';

class App extends Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const {
      showAlert,
      alertType,
      alertMsg,
      hideAlert,
      editItemModal,
      hideEditItemModal,
      confirmDeleteItemPrompt,
      hideConfirmDeleteItemPrompt,
    } = this.props;

    return (
      <div>
        <Banner />
        <Navbar />
        <div
          className="container"
          style={{ width: '90%', margin: 'auto', padding: '10px' }}
        >
          <BrowserRouter>
            <Route
              exact
              path="/"
              component={HomePage}
            />
            <Switch>
              <Route
                exact
                path="/category"  
                component={OneCategory}
              />
            </Switch>
            <Switch>
              <Route
                exact
                path="/category/subCategory"  
                component={OneSubcategory}
              />
            </Switch>
            <Switch>
              <Route
                exact
                path="/category/subCategory/product"  
                component={OneProduct}
              />
            </Switch>
            <Switch>
              <Route
                exact
                path="/search"  
                component={SearchResult}
              />
            </Switch>
            <Switch>
              <Route
                exact
                path="/admin"  
                component={Admin}
              />
            </Switch>
          </BrowserRouter>
        </div>
        {/* <Footer /> */}
        {editItemModal && (
          <EditItemModal hideEditItemModal={hideEditItemModal} />
        )}
        {confirmDeleteItemPrompt && (
          <ConfirmDeleteItemPrompt
            hideConfirmDeleteItemPrompt = {hideConfirmDeleteItemPrompt}
            // deleteItem={deleteItem}
          />
        )}
        <AlertBar
          showAlert={showAlert}
          alertType={alertType}
          alertMsg={alertMsg}
          hideAlert={hideAlert}
        />
      </div>
    );
  }
}

const mapState = state => {
  const {
    showAlert,
    alertType,
    alertMsg,
    editItemModal,
    confirmDeleteItemPrompt,
  } = state.layout;

  return {
    showAlert,
    alertType,
    alertMsg,
    editItemModal,
    confirmDeleteItemPrompt,
  }
}

const mapDispatch = {
  hideAlert: ACTIONS.hideAlert,
  init: ACTIONS.init,
  hideEditItemModal: ACTIONS.hideEditItemModal,
  hideConfirmDeleteItemPrompt: ACTIONS.hideConfirmDeleteItemPrompt,
};

export default connect(mapState, mapDispatch)(App);