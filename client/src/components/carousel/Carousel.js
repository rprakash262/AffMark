import React, { Component } from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import './Carousel.css';

class Carousel extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedIndex: 0,
      selectedItem: props.featuredItems[0],
    }
  }

  next = () => {
    const { featuredItems } = this.props;
    const { selectedIndex } = this.state;

    const nextIndex = selectedIndex === (featuredItems.length - 1) ? 0 : selectedIndex + 1;

    this.setState({
      selectedIndex: nextIndex,
    })
  }

  previous = () => {
    const { featuredItems } = this.props;
    const { selectedIndex } = this.state;

    const prevIndex = selectedIndex === 0 ? (featuredItems.length - 1) : selectedIndex - 1;

    this.setState({
      selectedIndex: prevIndex,
    })
  }

  redirect = url => {
    window.open(url, '_blank');
  }

  render() {
    const { selectedIndex } = this.state;
    const { featuredItems } = this.props;

    const selectedItem = featuredItems[selectedIndex];

    console.log({selectedItem});

    return (
      <div className="carousel">
        <div className="carousel-container">
          <div className="carousel-prev-btn" onClick={this.previous}>
            <ArrowBackIosIcon style={{ color: '#fff' }} />
          </div>
          <div className="carousel-next-btn" onClick={this.next}>
            <ArrowForwardIosIcon style={{ color: '#fff' }} />
          </div>
          <div className="carousal-content" onClick={() => this.redirect(selectedItem.buyLink)}>
            <div className="carousel-item-image">
              <img alt="carousal_img" src={selectedItem && selectedItem.itemImage} />
            </div>
            <div className="carousel-item-desc">
              <h4>{selectedItem && selectedItem.itemName}</h4>
              <p>Price: Rs. {selectedItem && selectedItem.itemPrice}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Carousel;
