import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./sidebar.css";

import Fulllogo from "../Home/images/logo/logo.png";
import Minilogo from "../Home/images/logo/min_logo.png";
import ArrowRightIcon from "../Home/images/icons/arrow-right.png";
import ArrowLeftIcon from "../Home/images/icons/arrow-left.png";
// import DashboardIcon from "../Home/images/icons/dashboard.png";
// import LinkIcon from "../Home/images/icons/link.png";
// import BuyCrytoICON from "../Home/images/icons/buy-crypto.png";
// import LogoutICON from "../Home/images/icons/logout.png";
// import MoneySendICON from "../Home/images/icons/money-send.png";
// import PeopleICON from "../Home/images/icons/people.png";
// import SettingICON from "../Home/images/icons/setting-2.png";
// import ShippingCartICON from "../Home/images/icons/shopping-cart.png";
const LinkIcon = (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.27 15C5.48 14.05 5 12.83 5 11.5C5 8.48 7.47 6 10.5 6H15.5C18.52 6 21 8.48 21 11.5C21 14.52 18.53 17 15.5 17H13"
      stroke="#A9ADBD"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M23.73 15C24.52 15.95 25 17.17 25 18.5C25 21.52 22.53 24 19.5 24H14.5C11.48 24 9 21.52 9 18.5C9 15.48 11.47 13 14.5 13H17"
      stroke="#A9ADBD"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const DashboardIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.32 11.9999C20.92 11.9999 22 10.9999 21.04 7.71994C20.39 5.50994 18.49 3.60994 16.28 2.95994C13 1.99994 12 3.07994 12 5.67994V8.55994C12 10.9999 13 11.9999 15 11.9999H18.32Z"
      stroke="#A9ADBD"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M19.9994 14.7017C19.0694 19.3317 14.6294 22.6917 9.57944 21.8717C5.78944 21.2617 2.73944 18.2117 2.11944 14.4217C1.30944 9.39172 4.64944 4.95172 9.25944 4.01172"
      stroke="#A9ADBD"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const BuyCrytoICON = (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M25 11.5C25 15.09 22.09 18 18.5 18C18.33 18 18.15 17.99 17.98 17.98C17.73 14.81 15.19 12.27 12.02 12.02C12.01 11.85 12 11.67 12 11.5C12 7.91 14.91 5 18.5 5C22.09 5 25 7.91 25 11.5Z"
      stroke="#A9ADBD"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M18 18.5C18 22.09 15.09 25 11.5 25C7.91 25 5 22.09 5 18.5C5 14.91 7.91 12 11.5 12C11.67 12 11.85 12.01 12.02 12.02C15.19 12.27 17.73 14.81 17.98 17.98C17.99 18.15 18 18.33 18 18.5Z"
      stroke="#A9ADBD"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10.62 17.62L11.5 16L12.38 17.62L14 18.5L12.38 19.38L11.5 21L10.62 19.38L9 18.5L10.62 17.62Z"
      stroke="#A9ADBD"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const LogoutIcon = (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.9004 10.5583C12.2104 6.95828 14.0604 5.48828 18.1104 5.48828H18.2404C22.7104 5.48828 24.5004 7.27828 24.5004 11.7483V18.2683C24.5004 22.7383 22.7104 24.5283 18.2404 24.5283H18.1104C14.0904 24.5283 12.2404 23.0783 11.9104 19.5383"
      stroke="#A9ADBD"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M17.9991 15H6.61914"
      stroke="#A9ADBD"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.85 11.6484L5.5 14.9984L8.85 18.3484"
      stroke="#A9ADBD"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
const MoneySendICON = (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.5 16.7483C12.5 17.7183 13.25 18.4983 14.17 18.4983H16.05C16.85 18.4983 17.5 17.8183 17.5 16.9683C17.5 16.0583 17.1 15.7283 16.51 15.5183L13.5 14.4683C12.91 14.2583 12.51 13.9383 12.51 13.0183C12.51 12.1783 13.16 11.4883 13.96 11.4883H15.84C16.76 11.4883 17.51 12.2683 17.51 13.2383"
      stroke="#A9ADBD"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15 10.5V19.5"
      stroke="#A9ADBD"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M25 15C25 20.52 20.52 25 15 25C9.48 25 5 20.52 5 15C5 9.48 9.48 5 15 5"
      stroke="#A9ADBD"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M25 9V5H21"
      stroke="#A9ADBD"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M20 10L25 5"
      stroke="#A9ADBD"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
const PeopleICON = (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.0001 10.16C20.9401 10.15 20.8701 10.15 20.8101 10.16C19.4301 10.11 18.3301 8.98 18.3301 7.58C18.3301 6.15 19.4801 5 20.9101 5C22.3401 5 23.4901 6.16 23.4901 7.58C23.4801 8.98 22.3801 10.11 21.0001 10.16Z"
      stroke="#A9ADBD"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M19.9695 17.4399C21.3395 17.6699 22.8495 17.4299 23.9095 16.7199C25.3195 15.7799 25.3195 14.2399 23.9095 13.2999C22.8395 12.5899 21.3095 12.3499 19.9395 12.5899"
      stroke="#A9ADBD"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.96852 10.16C9.02852 10.15 9.09852 10.15 9.15852 10.16C10.5385 10.11 11.6385 8.98 11.6385 7.58C11.6385 6.15 10.4885 5 9.05852 5C7.62852 5 6.47852 6.16 6.47852 7.58C6.48852 8.98 7.58852 10.11 8.96852 10.16Z"
      stroke="#A9ADBD"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9.99945 17.4399C8.62945 17.6699 7.11945 17.4299 6.05945 16.7199C4.64945 15.7799 4.64945 14.2399 6.05945 13.2999C7.12945 12.5899 8.65945 12.3499 10.0295 12.5899"
      stroke="#A9ADBD"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15.0001 17.6288C14.9401 17.6188 14.8701 17.6188 14.8101 17.6288C13.4301 17.5788 12.3301 16.4488 12.3301 15.0488C12.3301 13.6188 13.4801 12.4688 14.9101 12.4688C16.3401 12.4688 17.4901 13.6288 17.4901 15.0488C17.4801 16.4488 16.3801 17.5888 15.0001 17.6288Z"
      stroke="#A9ADBD"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12.0907 20.7786C10.6807 21.7186 10.6807 23.2586 12.0907 24.1986C13.6907 25.2686 16.3107 25.2686 17.9107 24.1986C19.3207 23.2586 19.3207 21.7186 17.9107 20.7786C16.3207 19.7186 13.6907 19.7186 12.0907 20.7786Z"
      stroke="#A9ADBD"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
const SettingICON = (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 18C16.6569 18 18 16.6569 18 15C18 13.3431 16.6569 12 15 12C13.3431 12 12 13.3431 12 15C12 16.6569 13.3431 18 15 18Z"
      stroke="#A9ADBD"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M5 15.8814V14.1214C5 13.0814 5.85 12.2214 6.9 12.2214C8.71 12.2214 9.45 10.9414 8.54 9.3714C8.02 8.4714 8.33 7.3014 9.24 6.7814L10.97 5.7914C11.76 5.3214 12.78 5.6014 13.25 6.3914L13.36 6.5814C14.26 8.1514 15.74 8.1514 16.65 6.5814L16.76 6.3914C17.23 5.6014 18.25 5.3214 19.04 5.7914L20.77 6.7814C21.68 7.3014 21.99 8.4714 21.47 9.3714C20.56 10.9414 21.3 12.2214 23.11 12.2214C24.15 12.2214 25.01 13.0714 25.01 14.1214V15.8814C25.01 16.9214 24.16 17.7814 23.11 17.7814C21.3 17.7814 20.56 19.0614 21.47 20.6314C21.99 21.5414 21.68 22.7014 20.77 23.2214L19.04 24.2114C18.25 24.6814 17.23 24.4014 16.76 23.6114L16.65 23.4214C15.75 21.8514 14.27 21.8514 13.36 23.4214L13.25 23.6114C12.78 24.4014 11.76 24.6814 10.97 24.2114L9.24 23.2214C8.33 22.7014 8.02 21.5314 8.54 20.6314C9.45 19.0614 8.71 17.7814 6.9 17.7814C5.85 17.7814 5 16.9214 5 15.8814Z"
      stroke="#A9ADBD"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
const ShippingCartICON = (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 5H6.74001C7.82001 5 8.67 5.93 8.58 7L7.75 16.96C7.61 18.59 8.89999 19.99 10.54 19.99H21.19C22.63 19.99 23.89 18.81 24 17.38L24.54 9.88C24.66 8.22 23.4 6.87 21.73 6.87H8.82001"
      stroke="#A9ADBD"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M19.25 25C19.9404 25 20.5 24.4404 20.5 23.75C20.5 23.0596 19.9404 22.5 19.25 22.5C18.5596 22.5 18 23.0596 18 23.75C18 24.4404 18.5596 25 19.25 25Z"
      stroke="#A9ADBD"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M11.25 25C11.9404 25 12.5 24.4404 12.5 23.75C12.5 23.0596 11.9404 22.5 11.25 22.5C10.5596 22.5 10 23.0596 10 23.75C10 24.4404 10.5596 25 11.25 25Z"
      stroke="#A9ADBD"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12 11H24"
      stroke="#A9ADBD"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const topLinkArr = [
  {
    title: "Affiliation link for website",
    key: "link-website",
    image: LinkIcon,
  },
  {
    title: "Affiliation link for wallet",
    key: "link-wallet",
    image: LinkIcon,
  },
  {
    title: "Dashboard",
    key: "dashboard",
    image: DashboardIcon,
  },
  {
    title: "Transaction",
    key: "transaction",
    image: MoneySendICON,
  },
  {
    title: "Affiliation",
    key: "affiliation",
    image: PeopleICON,
  },
  {
    title: "Staking",
    key: "staking",
    image: BuyCrytoICON,
  },
  {
    title: "NFT Market",
    key: "NFT-market",
    image: ShippingCartICON,
  },
];

const bottomLinkArr = [
  {
    title: "Settings",
    key: "settings",
    image: SettingICON,
  },
  {
    title: "Logout",
    key: "logout",
    image: LogoutIcon,
  },
];

export default function SideBar() {
  const [connectStatus, setConnectStatus] = useState(true);
  const [accountAddress, setAccountAddress] = useState();
  const [activeLink, setActiveLink] = useState();
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if(window.innerWidth < 576) {
      setExpanded(false)
    }
  }, [])

  const connectMetaMask = async () => {
    if (typeof window.ethereum === "undefined") {
      setConnectStatus(false);
    } else {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccountAddress(account[0]);
      setConnectStatus(true);
    }
  };

  return (
    <>
    <div className={"side-bar py-30 bg-white " + (!expanded && "min-mode")}>
      <Router>
        <div className="side-bar_main px-20">
          <button
            className="btn arrow-btn bg-blue d-flex align-items-center justify-content-center color-white font-14"
            onClick={() => setExpanded(!expanded)}
          >
            <img src={ArrowLeftIcon} className="min" alt="arrow" />
            <img src={ArrowRightIcon} className="more" alt="arrow" />
          </button>
          <div className="header-logo pb-30">
            <Link to="#">
              <img
                src={Fulllogo}
                className="full-logo"
                width="140"
                alt="logo-img"
              />
              <img src={Minilogo} className="min-logo" alt="logo-img" />
            </Link>
          </div>
          {accountAddress ? (
            <div className="account-address w-100 d-flex align-items-center bg-black main-small_button color-white mt-20">
              <div>{accountAddress}</div>
            </div>
          ) : (
            <button
              className="btn btn-connect w-100 bg-black main-small_button color-white mt-20"
              onClick={connectMetaMask}
            >
              Connect
            </button>
          )}
          {
            !connectStatus && (
              <p className="request-metamask py-20 font-16 main-medium color-gray text-center">Please install <a target="_blank" className="main-semibold color-blue" href="https://metamask.io/download.html">Metamask</a></p>
            )
          } 
          <div className="link-panel">
            {topLinkArr.map((item, index) => (
              <Link
                to="#"
                className={
                  "d-flex link-item align-items-center mt-30 px-20 py-10 " + item.key +
                  (item.key === activeLink && " active")
                }
                key={index}
                onClick={() => setActiveLink(item.key)}
              >
                <span className="icon-box d-flex align-items-center justify-content-center color-gray">
                  {item.image}
                </span>
                <span className="title main-medium color-gray font-16">
                  {item.title}
                </span>
              </Link>
            ))}
            <hr className="line mt-30 mb-0" />
            {bottomLinkArr.map((item, index) => (
              <Link
                to="#"
                className={
                  "d-flex link-item align-items-center mt-30 px-20 py-10 " + item.key +
                  (item.key === activeLink && " active")
                }
                key={index}
                onClick={() => setActiveLink(item.key)}
              >
                <span className="icon-box d-flex align-items-center justify-content-center color-gray">
                  {item.image}
                </span>
                <span className="title main-medium color-gray font-16">
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Router>
    </div>
    {/* <div className="side-bar_cover-panel d-md-none"/> */}
    </>
  );
}
