import React, { Component } from 'react';
import BackupIcon from '@material-ui/icons/Backup';
import DoneIcon from '@material-ui/icons/Done';
// import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import TimerIcon from '@material-ui/icons/Timer';
import TimerOutlinedIcon from '@material-ui/icons/TimerOutlined';
import SelectDropdown from '../../components/selectDropdown';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { connect } from 'react-redux';

import { ACTIONS } from '../../reducers/AddNewItemReducer';
import AddNewItem from '../../components/addNewItem'; 

class AddNewItemForm extends Component {
  render() { 
    const {
      // selectCategory,
      // allCategories = [],
      // selectedCategoryId,
      // selectSubCategory,
      // allSubCategories = [],
      // subcategoriesForCategory = [],
      // selectedSubCategoryId,
      // changeNewItemFormData,
      // newItemFormData,
      changeItemImage,
      uploadItemImage,
      // submitNewItem,
      imageUrls,
      // uploadingImage,
      // submitttingFlag,
      // discardImage,
    } = this.props;

    return (
      <AddNewItem
        // changeItemImage={changeItemImage}
        // uploadItemImage={uploadItemImage}
        // imageUrls={imageUrls}
      />
    )
  }
}

const mapState = state => {
  const { imageUrls } = state.addNewItem;

  return {
    imageUrls,
  }
}

const mapDispatch = {
  changeItemImage: ACTIONS.changeItemImage,
  uploadItemImage: ACTIONS.uploadItemImage,
}

export default connect(mapState, mapDispatch)(AddNewItem);
