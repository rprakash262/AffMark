import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ACTIONS } from '../../reducers/OneProductReducer';
import './OneProduct.css';

class OneProduct extends Component {
  componentDidMount() {
    const query = this.props.location.search;
    const id = query.slice(query.indexOf('=') + 1);

    this.props.init(id);
  }

  render() {
    const {
      oneProduct,
      loadingData,
      selectImg,
      selectedImg,
    } = this.props;

    return (
      <div className="one-product">
        {loadingData && (
          <div>Fetching data. Please wait..</div>
        )}
        {!loadingData && (
          <div className="one-product-content">
            <div className="one-product-imgs">
              <div className="one-product-preview-img">
                {oneProduct && oneProduct.itemImage && oneProduct.itemImage.length > 0 && oneProduct.itemImage.map(img => (
                  <img onClick={() => selectImg(img)} alt="item_img" src={img} />
                ))}
              </div>
              <div className="one-product-showing-img">
                <img alt="item_img" src={selectedImg} />
              </div>
            </div>
            <div className="one-product-main">
              <h4>{oneProduct.itemName}</h4>
              <h3>Rs. {oneProduct.itemPrice} /-</h3>
              <p>{oneProduct.itemDescription}</p>
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
  const {
    oneProduct,
    loadingData,
    selectedImg,
  } = state.oneProduct;

  return {
    oneProduct,
    loadingData,
    selectedImg,
  }
}

const mapDispatch = {
  init: ACTIONS.init,
  selectImg: ACTIONS.selectImg,
}

export default connect(mapState, mapDispatch)(OneProduct);
