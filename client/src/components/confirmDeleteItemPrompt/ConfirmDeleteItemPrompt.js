import { connect } from 'react-redux';

import { ACTIONS } from '../../reducers/AdminReducer';
import { ACTIONS as layoutActions } from '../../reducers/LayoutReducer';
import './ConfirmDeleteItemPrompt.css';

function ConfirmDeleteItemPrompt ({ deletingItem, hideConfirmDeleteItemPrompt,submitDeleteItem }) {
  console.log({ deletingItem: deletingItem.itemName })
  return (
    <div className="confirm-delete-item-prompt">
      <div className="confirm-delete-item-prompt-content">
        <p>Are you sure you want to delete <span>"{deletingItem.itemName}"</span></p>
        <div className="confirm-delete-item-prompt-buttons">
          <button onClick={submitDeleteItem}>YES</button>
          <button onClick={hideConfirmDeleteItemPrompt}>NO</button>
        </div>
      </div>
    </div>
  )
}

const mapState = (state) => {
  const { deletingItem } = state.admin;

  return { deletingItem }
}

const mapDispatch = {
  hideConfirmDeleteItemPrompt: layoutActions.hideConfirmDeleteItemPrompt,
  submitDeleteItem: ACTIONS.submitDeleteItem,
}

export default connect(mapState, mapDispatch)(ConfirmDeleteItemPrompt);