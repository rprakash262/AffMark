import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import BackupIcon from '@material-ui/icons/Backup';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import TimerOutlinedIcon from '@material-ui/icons/TimerOutlined';
import RateSlider from '../../components/rateSlider';

import { ACTIONS } from '../../reducers/AddNewItemReducer';
import './AddNewItem.css';

const styles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

class AddNewItem extends Component {
  render() {
    const {
      classes,
      imageUrls=[],
      changeItemImage,
      uploadItemImage,
      discardImage,
      uploadingImage,
      imageFormData,
      itemName,
      itemPrice,
      discount,
      bestOffer,
      customerRating,
      numberOfRating,
      warrenty,
      returnPolicy,
      replacement,
      itemDescription,
      avaliableColors,
      COD,
      setItemName,
      setItemPrice,
      setItemDiscount,
      setItemBestOffer,
      setItemRating,
      setNumberOfRating,
      setItemWarrenty,
      setReturnPolicy,
      setReplacementPolicy,
      setCOD,
      setItemDesc,
      setAvailableColors,
    } = this.props;

    console.log({ props: this.props });

    return (
      <div className="add-new-item">
        <div className={classes.root} noValidate autoComplete="off">
          <div className="admin-one-form-item">
            <TextField
              value={itemName}
              className="one-form-field"
              label="Item Name"
              variant="outlined"
              onChange={e => setItemName(e.target.value)}
            />
          </div>
          <div className="admin-one-form-item">
            <TextField
              value={itemPrice}
              type="number"
              className="one-form-field"
              label="Item Price"
              variant="outlined"
              onChange={e => setItemPrice(e.target.value)}
            />
          </div>
          <div className="admin-one-form-item">
            <TextField
              value={discount}
              type="number"
              className="one-form-field"
              label="Discount (in percentage)"
              variant="outlined"
              onChange={e => setItemDiscount(e.target.value)}
            />
          </div>
          <div className="admin-one-form-item">
            <TextField
              value={bestOffer}
              className="one-form-field"
              label="Best offer"
              variant="outlined"
              onChange={e => setItemBestOffer(e.target.value)}
            />
          </div>
          <div className="admin-one-form-item">
            <RateSlider
              onChange={rating => setItemRating(rating)}
              value={customerRating}
            />
          </div>
          <div className="admin-one-form-item">
            <TextField
              value={numberOfRating}
              type="number"
              className="one-form-field"
              label="Number of Ratings"
              variant="outlined"
              onChange={e => setNumberOfRating(e.target.value)}
            />
          </div>
          <div className="admin-one-form-item">
            <TextField
              value={warrenty}
              className="one-form-field"
              label="Warrenty"
              variant="outlined"
              onChange={e => setItemWarrenty(e.target.value)}
            />
          </div>
          <div className="admin-one-form-item">
            <TextField
              value={returnPolicy}
              className="one-form-field"
              label="Return"
              variant="outlined"
              onChange={e => setReturnPolicy(e.target.value)}
            />
          </div>
          <div className="admin-one-form-item">
            <TextField
              value={replacement}
              className="one-form-field"
              label="Replacement"
              variant="outlined"
              onChange={e => setReplacementPolicy(e.target.value)}
            />
          </div>
          <div className="admin-one-form-item">
            <TextField
              value={avaliableColors}
              className="one-form-field"
              label="Available Colors (e.g. red,green,blue)"
              variant="outlined"
              onChange={e => setAvailableColors(e.target.value)}
            />
          </div>
          <div className="admin-one-form-item">
            <TextField
              value={itemDescription}
              className="one-form-field"
              multiline
              rowsMax={10}
              label="Description"
              variant="outlined"
              onChange={e => setItemDesc(e.target.value)}
            />
          </div>
          <div className="admin-one-form-item">
            <FormControlLabel
             className="one-form-field"
              control={
                <Checkbox
                  checked={COD}
                  onChange={() => setCOD(!COD)}
                  color="primary"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />

              }
              label="COD available"
            />
          </div>
          <div className="admin-one-form-item">
            <h6>Upload Images:</h6>
            {imageUrls.length > 0 && (
              <div className="upload-img-preview">
                {imageUrls.map((url, index) => (
                  <div className="one-img-preview">
                    <img src={url} alt="img_preview" />
                    <HighlightOffIcon
                      onClick={() => discardImage(index)}
                      className="close-preview-btn"
                      style={{
                        color: '#ed143d',
                        marginLeft: '10px',
                        cursor: 'pointer'
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
            {imageUrls.length < 3  && (
              <div className="admin-one-form-item file">
                <input
                  className="input-file"
                  type="file"
                  onChange={e => changeItemImage(e)}
                />
                {imageFormData && !uploadingImage && (
                  <button className="upload-btn" onClick={() => uploadItemImage()}>
                    <BackupIcon style={{ color: '#fff' }} />
                  </button>
                )}
                {uploadingImage && (
                  <button className="uploading-btn">
                    <TimerOutlinedIcon style={{ color: '#fff' }} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  const {
    imageUrls,
    uploadingImage,
    imageFormData,
    itemName,
    itemPrice,
    discount,
    bestOffer,
    customerRating,
    numberOfRating,
    warrenty,
    returnPolicy,
    replacement,
    itemDescription,
    avaliableColors,
    COD,
  } = state.addNewItem;

  return {
    imageUrls,
    uploadingImage,
    imageFormData,
    itemName,
    itemPrice,
    discount,
    bestOffer,
    customerRating,
    numberOfRating,
    warrenty,
    returnPolicy,
    replacement,
    itemDescription,
    avaliableColors,
    COD,
  }
}

const mapDispatch = {
  changeItemImage: ACTIONS.changeItemImage,
  uploadItemImage: ACTIONS.uploadItemImage,
  discardImage: ACTIONS.discardImage,
  setItemName: ACTIONS.setItemName,
  setItemPrice: ACTIONS.setItemPrice,
  setItemDiscount: ACTIONS.setItemDiscount,
  setItemBestOffer: ACTIONS.setItemBestOffer,
  setItemRating: ACTIONS.setItemRating,
  setNumberOfRating: ACTIONS.setNumberOfRating,
  setItemWarrenty: ACTIONS.setItemWarrenty,
  setReturnPolicy: ACTIONS.setReturnPolicy,
  setReplacementPolicy: ACTIONS.setReplacementPolicy,
  setCOD: ACTIONS.setCOD,
  setItemDesc: ACTIONS.setItemDesc,
  setAvailableColors: ACTIONS.setAvailableColors,
}

export default withStyles(styles, { withTheme: true })(connect(mapState, mapDispatch)(AddNewItem));
