import React from 'react';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './itemsSlider.css';

class ItemsSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      childWidth: 0,
      containerWidth: 0,
      left: 0,
      numChilds: 0,
    };
  }

  componentDidMount () {
    let child = document.getElementsByClassName('one-slider-item')[0];
    let childWidth = child && child.clientWidth;

    this.setState({ childWidth });
  }

  getContainerWidth (e) {
    this.setState({
      containerWidth: this.refs.refContainer.clientWidth,
      numChilds: this.refs.refContainer.children.length,
    });
  }

  slideLeft = () => {    
    const { childWidth, left } = this.state;

    if (left === 0) return;

    if (left + childWidth > 0) {
      this.setState({ 
        left: 0,
      })
    } else {
      this.setState({ 
        left: left + childWidth,
      })
    }
  }

  slideRight = () => {
    const { childWidth, containerWidth, left, numChilds } = this.state;
    
    const maxLeft = (numChilds * childWidth) - containerWidth;

    if (left <= -maxLeft) return;

    if (left - childWidth < -maxLeft) {
      this.setState({ 
        left: -maxLeft,
      })
    } else {
      this.setState({ 
        left: left - childWidth,
      })
    } 
  }

  render() {
    const { left, containerWidth } = this.state;
    const { items, oneItem } = this.props;

    return (
      <div className="items-slider">
        <div className="items-slider-container">
          <div className="slide-left-btn" onClick={this.slideLeft}>
            <ArrowBackIosIcon className="arrow-btn" />
          </div>
          <div className="items-slider-main">
            <div
              className="items-slider-main-container"
              id="sliderContainer"
              onLoad={e => this.getContainerWidth(e)}
              ref='refContainer'
              style={{ left }}
            >
              {items && items.length && items.map(item => (
                <div className="one-slider-item">
                  {oneItem(item)}
                </div>
              ))}
            </div>
          </div>
          <div className="slide-right-btn" onClick={this.slideRight}>
            <ArrowForwardIosIcon className="arrow-btn" />
          </div>
        </div>
      </div>
    )
  }
}

export default ItemsSlider;
