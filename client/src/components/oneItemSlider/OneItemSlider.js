import React from 'react';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './oneItemSlider.css';

class OneItemSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      childWidth: 0,
      containerWidth: 0,
      left: 0,
      numChilds: 0,
    };
  }

  componentWillReceiveProps (nextProps, prevProps) {
    if (nextProps.items.length > 0) {
      let child = document.getElementsByClassName('one-item-slider-item');
      let childWidth = child && child[0] && child[0].clientWidth;


      this.setState({
        childWidth,
        containerWidth: this.refs.refContainer2.clientWidth,
        numChilds: this.refs.refContainer2.children.length,
      });
    }
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
    
    const maxLeft = (numChilds * childWidth) - (1 * containerWidth);

    console.log({childWidth, containerWidth, numChilds, maxLeft})

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

    console.log({items})
    return (
      <div className="one-item-slider">
        <div className="one-item-slider-container">
          <div className="slide-left-btn" onClick={this.slideLeft}>
            <ArrowBackIosIcon className="arrow-btn" />
          </div>
          <div className="one-item-slider-main">
            <div
              className="one-item-slider-main-container"
              // onLoad={e => this.setContainerWidth(e)}
              ref='refContainer2'
              style={{ left }}
            >
              {items && items.length > 0 && items.map(item => (
                <div id={item.id} className="one-item-slider-item">
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

export default OneItemSlider;
