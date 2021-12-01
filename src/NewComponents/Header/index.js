import logo from '../Home/images/logo/logo.png';
import icon from '../Home/images/icons/Group 10.png';
import vectorIcon from '../Home/images/icons/Vector.png';
import avatar from '../Home/images/avatar/1.png';

export default function Header() {
  return (
    <header className="d-flex justify-content-between">
      <div className="header-logo">
        {/* <a href="#">
          <img src={logo} width="140px" alt="logo-img" />
        </a> */}
      </div>
      <div className="header-right d-flex align-items-center">
        <a href="#">
          <img
            src={icon}
            alt="menu-img"
            width="16px"
            height="18px"
            className="mr-3"
          />
        </a>
        <a href="#">
          <img
            src={vectorIcon}
            alt="money-img"
            width="12px"
            height="20px"
            className="mr-3"
          />
        </a>
        <a href="#">
          <div className="rounded-circle">
            <img
              src={avatar}
              alt="avatar-img"
              width="32px"
              height="32px"
              className="mr-3 rounded-circle"
            />
          </div>
        </a>
      </div>
    </header>
  );
}
