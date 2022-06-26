import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ACTIONS } from '../../reducers/OneProductReducer';

class OneProduct extends Component {
  componentDidMount() {
    const query = this.props.location.search;
    const id = query.slice(query.indexOf('=') + 1);

    this.props.init(id);
  }

  render() {
    const { oneProduct, loadingData } = this.props;

    return (
      <div className="one-product">
        {loadingData && (
          <div>Fetching data. Please wait..</div>
        )}
        {!loadingData && (
          <div>
            <div>
              <img alt="item_img" src={oneProduct.itemImage} />
            </div>
            <div>
              <h4>{oneProduct.itemName}</h4>
              <p>Rs. {oneProduct.itemPrice}</p>
              <button>
                <a href={oneProduct.buyLink} target="_blank" rel="noreferrer">Buy on Flipkart</a>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapState = state => {
  const { oneProduct, loadingData } = state.oneProduct;

  return {
    oneProduct,
    loadingData,
  }
}

const mapDispatch = {
  init: ACTIONS.init,
}

export default connect(mapState, mapDispatch)(OneProduct);
