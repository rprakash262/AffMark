import { connect } from 'react-redux';
import TimerOutlinedIcon from '@material-ui/icons/TimerOutlined';

import { ACTIONS as addNewItemActions } from '../../reducers/AddNewItemReducer';
import { ACTIONS as layoutActions } from '../../reducers/LayoutReducer';
import './ConfirmDeleteItemPrompt.css';

function ConfirmDeleteItemPrompt ({
  deletingItem,
  hideConfirmDeleteItemPrompt,
  submitDeleteItem,
  deletingItemFlag 
  })
{
  console.log({ deletingItem: deletingItem })

  return (
    <div className="confirm-delete-item-prompt">
      <div className="confirm-delete-item-prompt-content">
        {!deletingItemFlag && <p>Are you sure you want to delete <span>"{deletingItem.itemName}"</span></p>}
        {deletingItemFlag && <p>Deleting <span>"{deletingItem.itemName}"</span> , Please Wait..</p>}
        {!deletingItemFlag && (
          <div className="confirm-delete-item-prompt-buttons">
            <button onClick={submitDeleteItem}>YES</button>
            <button onClick={hideConfirmDeleteItemPrompt}>NO</button>
          </div>
        )}
        {deletingItemFlag && (
          <div className="confirm-delete-item-prompt-buttons">
            <button onClick={submitDeleteItem}>
              <TimerOutlinedIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const mapState = (state) => {
  const {
    deletingItem,
    deletingItemFlag,
   } = state.addNewItem;

  return { deletingItem, deletingItemFlag }
}

const mapDispatch = {
  hideConfirmDeleteItemPrompt: layoutActions.hideConfirmDeleteItemPrompt,
  submitDeleteItem: addNewItemActions.submitDeleteItem,
}

export default connect(mapState, mapDispatch)(ConfirmDeleteItemPrompt);