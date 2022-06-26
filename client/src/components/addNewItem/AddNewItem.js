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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import RateSlider from '../../components/rateSlider';

import { ACTIONS } from '../../reducers/AddNewItemReducer';
import './AddNewItem.css';

const useStyles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 390,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

const styles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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
      itemDescription,
      setItemName,
      setItemPrice,
      setItemDesc,
      allCategories,
      selectedCategoryId,
      selectCategory,
      subcategoriesForCategory,
      selectSubCategory,
      selectedSubCategoryId,
    } = this.props;

    console.log({ props: this.props });

    return (
      <div className="admin-add-new-item">
        <div className={classes.root} noValidate autoComplete="off">
          <div className="admin-one-form-item">
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-name-label">Select Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedCategoryId}
                onChange={e => selectCategory(e.target.value)}
                MenuProps={MenuProps}
              >
                <MenuItem>Select Category</MenuItem>
                  {allCategories.map(d => (
                    <MenuItem
                      selected={d.id === selectedCategoryId}
                      value={d.id}
                      key={d.id}
                    >
                      {d.categoryName}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          <div className="admin-one-form-item">
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-name-label">Select Sub Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedSubCategoryId}
                onChange={e => selectSubCategory(e.target.value)}
                MenuProps={MenuProps}
                disabled={!selectedCategoryId}
              >
                <MenuItem>Select Sub Category</MenuItem>
                  {subcategoriesForCategory.map(d => (
                    <MenuItem
                      selected={d.id === selectedSubCategoryId}
                      value={d.id}
                      key={d.id}
                    >
                      {d.subCategoryName}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
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
            <h6>Upload Image:</h6>
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
    allCategories,
    selectedCategoryId,
    subcategoriesForCategory,
    selectedSubCategoryId,
    imageUrls,
    uploadingImage,
    imageFormData,
    itemName,
    itemPrice,
    itemDescription,
  } = state.addNewItem;

  return {
    allCategories,
    selectedCategoryId,
    subcategoriesForCategory,
    selectedSubCategoryId,
    imageUrls,
    uploadingImage,
    imageFormData,
    itemName,
    itemPrice,
    itemDescription,
  }
}

const mapDispatch = {
  selectSubCategory: ACTIONS.selectSubCategory,
  selectCategory: ACTIONS.selectCategory,
  changeItemImage: ACTIONS.changeItemImage,
  uploadItemImage: ACTIONS.uploadItemImage,
  discardImage: ACTIONS.discardImage,
  setItemName: ACTIONS.setItemName,
  setItemPrice: ACTIONS.setItemPrice,
  setItemDesc: ACTIONS.setItemDesc,
}

export default withStyles(useStyles, styles, { withTheme: true })(connect(mapState, mapDispatch)(AddNewItem));
