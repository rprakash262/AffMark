import React, { Component } from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';

class StarRating extends Component {
  render() {
    return (
      <div>
        {Array(5).keys().map(d => (
          <StarBorderIcon />
        ))}
      </div>
    )
  }
}

export default StarRating;