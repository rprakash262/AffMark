import Avatar from '@material-ui/core/Avatar';

import './Banner.css';
import bag from './bag.png';

function Banner({changeSearchText, startSearch}) {
  const redirect = () => {
    window.location.href = '/admin'
  }
  
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
          <input
            type="text"
            placeholder="Search items..."
            onChange={(e) => changeSearchText(e.target.value)}
            onKeyPress={e => startSearch(e)}
          />
          <div className="admin-button">
            <Avatar
              sx={{ bgcolor: 'white' }}
              onClick={redirect}
            >A</Avatar>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner;
