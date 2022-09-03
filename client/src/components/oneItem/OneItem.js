import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import './OneItem.css';

const redirect = (id, link) => {
  window.location.href = `/category/subCategory/product?id=${id}`;
  // window.open.href = link;
  // window.open(link, '_blank');
}

function OneItem({ item, loggedIn, editItem, deleteItem }) {
  return (
    <div className="home-page-one-item">
      {loggedIn && (
        <div className="loggedin-btn" onClick={() => editItem(item)}>
          <EditIcon style={{ color: '#fff' }} /> 
        </div>
      )}
      {loggedIn && (
        <div className="delete-btn" onClick={() => deleteItem(item)}>
          <DeleteIcon style={{ color: '#fff' }} />
        </div>
      )}
      <div className="home-page-one-item-img">
        <img alt="item-img" src={item.itemImage} />
      </div>
      <div className="home-page-one-item-desc">
        <h4>{item.itemName}</h4>
        <p>Rs. {item.itemPrice} /-</p>
        <button onClick={() => redirect(item.id, item.buyLink)}>
          View Product
        </button>
      </div>
    </div>
  );
}

export default OneItem;
