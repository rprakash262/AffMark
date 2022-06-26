import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const styles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 10,
    label: '0.5',
  },
  {
    value: 20,
    label: '1',
  },
  {
    value: 30,
    label: '1.5',
  },
  {
    value: 40,
    label: '2',
  },
  {
    value: 50,
    label: '2.5',
  },
  {
    value: 60,
    label: '3',
  },
  {
    value: 70,
    label: '3.5',
  },
  {
    value: 80,
    label: '4',
  },
  {
    value: 90,
    label: '4.5',
  },
  {
    value: 100,
    label: '5',
  },
];

function valuetext(value) {
  return `${value}`;
}

class RateSlider extends Component {
  render() {
    const { onChange } = this.props

    return (
      <div>
        <Typography id="discrete-slider-custom" gutterBottom>
          Enter Customer Rating
        </Typography>
        <Slider
          defaultValue={0}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-custom"
          step={10}
          valueLabelDisplay="auto"
          marks={marks}
          onChange={(e, newVal) => onChange(newVal / 20)}
        />
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(RateSlider);