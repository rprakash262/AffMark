import DoneIcon from '@material-ui/icons/Done';
import TimerOutlinedIcon from '@material-ui/icons/TimerOutlined';
import BackupIcon from '@material-ui/icons/Backup';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { connect } from 'react-redux';

import { ACTIONS } from '../../reducers/AdminReducer';
import SelectDropdown from '../../components/selectDropdown';
import './EditItemModal.css';

function EditItemModal({
  selectCategory,
  allCategories,
  selectedCategoryId,
  selectSubCategory,
  subcategoriesForCategory,
  selectedSubCategoryId,
  changeNewItemFormData,
  newItemFormData,
  changeItemImage,
  uploadingImage,
  imageUrl,
  uploadItemImage,
  submitEditNewItem,
  hideEditItemModal,
  loadingEditItemModal,
  discardImage,
}) {
  return (
    <div>
      {loadingEditItemModal && (
        <div className="edit-item-modal">Loading...Please wait</div>
      )}
      {!loadingEditItemModal && (
        <div className="edit-item-modal">
          <div
            className="close-edit-item-modal"
            onClick={hideEditItemModal}
          >
            <HighlightOffIcon style={{ fontSize: '50px', color: '#ed143d' }} />
          </div>
          <div className="edit-item-modal-content">
            <div className="admin-add-new-item">
              <div className="admin-one-form-item">
                <SelectDropdown
                  selectedItem={allCategories.find(d => d.id === selectedCategoryId) ?
                    allCategories.find(d => d.id === selectedCategoryId).categoryName :
                    'Select Category'
                  }
                  selectItem={id => selectCategory(id)}
                  dropdownList={allCategories.map(d => ({
                    id: d.id,
                    value:d.categoryName,
                  }))}
                />
              </div>
              <div className="admin-one-form-item">
                <SelectDropdown
                  selectedItem={subcategoriesForCategory.find(d => d.id === selectedSubCategoryId) ?
                    subcategoriesForCategory.find(d => d.id === selectedSubCategoryId).subCategoryName :
                     'Select Sub-Category'
                  }
                  selectItem={id => selectSubCategory(id)}
                  dropdownList={subcategoriesForCategory.map(d => ({
                    id: d.id,
                    value:d.subCategoryName,
                  }))}
                />
              </div>
              <div className="admin-one-form-item">
                <input
                  type="text"
                  placeholder="Enter item name"
                  onChange={e => changeNewItemFormData('itemName', e.target.value)}
                  value={newItemFormData.itemName}
                />
              </div>
              <div className="admin-one-form-item">
                <textarea
                  type="text"
                  placeholder="Enter item description"
                  onChange={e => changeNewItemFormData('itemDescription', e.target.value)}
                  value={newItemFormData.itemDescription}
                />
              </div>
              {imageUrl && (
                <div className="admin-one-form-item file">
                  <div className="upload-img-preview">
                    <img src={imageUrl} />
                    <HighlightOffIcon
                      onClick={discardImage}
                      className="close-preview-btn" style={{ color: '#ed143d', marginLeft: '10px', cursor: 'pointer' }}
                    />
                  </div>
                </div>
              )}
              {!imageUrl && !uploadingImage && (
                <div className="admin-one-form-item file">
                  <input
                    type="file"
                    onChange={e => changeItemImage(e)}
                  />
                  <button onClick={() => uploadItemImage()}>
                    <BackupIcon />
                  </button>
                </div>
              )}
              {!imageUrl && uploadingImage && (
                <div className="admin-one-form-item file">
                  <input
                    type="file"
                    onChange={e => changeItemImage(e)}
                  />
                  <TimerOutlinedIcon style={{ color: "#ed143d", marginLeft: '10px' }} />
                </div>
              )}
              {/* <div className="admin-one-form-item file">
                <input
                  type="file"
                  onChange={e => changeItemImage(e)}
                />
                {uploadingImage && <TimerOutlinedIcon style={{ color: "#ed143d", marginLeft: '10px' }} />}
                {imageUrl && !uploadingImage && (
                  <DeleteForeverIcon style={{ color: '#ed143d', marginLeft: '10px', cursor: 'pointer' }} />
                )}
                {!imageUrl && !uploadingImage && (
                  <button onClick={() => uploadItemImage()}>
                    <BackupIcon />
                  </button>
                )}
              </div> */}
              <div className="admin-one-form-item">
                <input
                  type="text"
                  placeholder="Enter item price"
                  onChange={e => changeNewItemFormData('itemPrice', e.target.value)}
                  value={newItemFormData.itemPrice}
                />
              </div>
              <div className="admin-one-form-item">
                <input
                  type="text"
                  placeholder="Enter item offer"
                  onChange={e => changeNewItemFormData('offer', e.target.value)}
                  value={newItemFormData.offer}
                />
              </div>
              <div className="admin-one-form-item">
                <input
                  type="text"
                  placeholder="Enter item buying link"
                  onChange={e => changeNewItemFormData('buyLink', e.target.value)}
                  value={newItemFormData.buyLink}
                />
              </div>
              <div className="admin-one-form-item">
                <label htmlFor="check-box" className="checkbox">
                  <input
                    id="check-box"
                    type="checkbox"
                    checked={newItemFormData.isFeatured}
                    value={newItemFormData.isFeatured}
                    onChange={e => changeNewItemFormData('isFeatured', !newItemFormData.isFeatured)}
                  /> Check if featured item
                </label>
              </div>
              <div className="admin-one-form-item">
                <button onClick={submitEditNewItem}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const mapState = state => {
  const {
    allCategories,
    selectedCategoryId,
    subcategoriesForCategory,
    selectedSubCategoryId,
    newItemFormData,
    uploadingImage,
    imageUrl,
    loadingEditItemModal
  } = state.admin;

  return {
    allCategories,
    selectedCategoryId,
    subcategoriesForCategory,
    selectedSubCategoryId,
    newItemFormData,
    uploadingImage,
    imageUrl,
    loadingEditItemModal,
  }
}

const mapDispatch = {
  selectCategory: ACTIONS.selectCategory,
  selectSubCategory: ACTIONS.selectSubCategory,
  changeNewItemFormData: ACTIONS.changeNewItemFormData,
  changeItemImage: ACTIONS.changeItemImage,
  uploadItemImage: ACTIONS.uploadItemImage,
  submitEditNewItem: ACTIONS.submitEditNewItem,
  discardImage: ACTIONS.discardImage,
}

export default connect(mapState, mapDispatch)(EditItemModal);
