import './Banner.css';

import bag from './bag.png';

function Banner() {
  return (
    <div className="banner">
      <div className="banner-container">
        <div className="banner-left">
          <a href="http://localhost:3000">
            <img alt="bag" src={bag} />
          </a>
          <h1>Shop</h1>
        </div>
        <div className="banner-right">
          <input type="text" placeholder="Search items..." />
        </div>
      </div>
    </div>
  )
}

export default Banner;
