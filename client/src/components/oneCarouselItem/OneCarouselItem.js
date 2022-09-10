import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import './OneCarouselItem.css';

const redirect = (id) => {
  window.location.href = `/category/subCategory/product?id=${id}`;
  // window.open.href = link;
  // window.open(link, '_blank');
}

function OneCarouselItem({ item }) {
  return (
    <div className="carousal-content" onClick={() => redirect(item.id)}>
      <div className="carousel-item-image">
        <img alt="carousal_img" src={item && item.itemImage} />
      </div>
      <div className="carousel-item-desc">
        <h4>{item && item.itemName}</h4>
        <p>Price: Rs. {item && item.itemPrice}</p>
      </div>
    </div>
  );
}

export default OneCarouselItem;
