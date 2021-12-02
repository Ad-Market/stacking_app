import React, { useState, useEffect } from "react";
import "./App.css";
import "./Header.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Button, Popup, Grid, Modal } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import i18n from "./translations/i18n";
import "./translations/i18n";

function Presale(props) {
  const { t } = useTranslation();
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  const dashboard = () => {
    history.push("/presale/home");
  };
  const coming = () => {
    history.push("/presale/coming");
  };
  const setting = () => {
    history.push("/presale/setting");
  };
  const transaction = () => {
    history.push("/presale/transaction");
  };
  const affilation = () => {
    history.push("/presale/affilation");
  };

  const [language, setLanguage] = useState("en");

  const handleOnclick = (e) => {
    e.preventDefault();
    setLanguage(e.target.value);
    localStorage.setItem("slamLanguage", e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  useEffect(() => {
    if (localStorage.getItem("slamLanguage"))
      setLanguage(localStorage.getItem("slamLanguage"));
    // Update the document title using the browser API
    const token = localStorage.getItem("slamtoken");
    const stored = localStorage.getItem("isLogin");
    if (stored === "1") {
    } else {
      localStorage.setItem("slamtoken", "");
      localStorage.setItem("isLogin", "");
      history.push("/");
    }
  });

  const affiliate = () => {
    const el = document.createElement("textarea");

    if (props.userId === 379)
      el.value = "https://wallet.slamcoin.io/register/nft";
    else if (props.userId === 161)
      el.value = "https://wallet.slamcoin.io/register/Ar";
    else el.value = "https://wallet.slamcoin.io/register/" + props.userId;

    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  const affiliateWebsite = () => {
    const el = document.createElement("textarea");

    if (props.userId === 379) el.value = "https://slamcoin.io?referId=nft";
    else if (props.userId === 161) el.value = "https://slamcoin.io?referId=Ar";
    else el.value = "https://slamcoin.io?referId=" + props.userId;

    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  const logout = () => {
    localStorage.setItem("slamtoken", "");
    localStorage.setItem("isLogin", "");
    history.push("/");
  };

  return (
    <div className="sidebar">
      {/* <Modal
                  className="buy-modal"
                  closeIcon
                  open={true}
                >
                <div className="modal-content text-center">
                    <div className="modal-body">
                        <p>Thank you for your interest!</p>
                        <p>
                            PRESALE date is to be announced soon !
                        </p>
                        <p>
                            Follow our Twitter / Telegram to be up to date: 
                        </p>
                        <p>
                            <a href="https://t.me/slamchatnft">https://t.me/slamchatnft</a>
                        </p>
                        <p>
                            <a href="https://twitter.com/slamchatnft">https://twitter.com/slamchatnft</a>
                        </p>
                        <div className="link-div" onClick={affiliate}>
                                
                          <div className="toast affili">
                              <div className="toast-copy affili-copy">
                                  Copied
                              </div>
                          </div>
                          <a className="link-a btn" href>
                            Affiliation link
                            <span>
                              <img src="https://wallet.slamcoin.io/image/link.svg" className="link-svg" alt=""/>
                            </span>
                          </a>
                        </div>
                    </div>
                  
                </div>
                
          </Modal> */}

      <div className="mark" onClick={dashboard}>
        <img
          src="https://wallet.slamcoin.io/image/slamblack.png"
          className="avatar"
          alt=""
        />
      </div>
      <div className="languageSwitchers text-center">
        <select className="" value={language} onChange={handleOnclick}>
          <option value="en">English</option>
          <option value="zh">Chinese</option>
        </select>
      </div>
      <br />
      <div className="mobile">
        <i className="fa fa-close" />
      </div>
      {/* website affiliate */}
      <ul className="">
        {/* <div className="languageSwitcherMobile d-none text-right">
              <select className="" value={language} onChange={handleOnclick}>
                <option value='en'>English</option>
                <option value='zh'>Chinese</option> 
              </select>
            </div> */}

        <a className="phone" href={"phone:" + phone}>
          {props.phone}
        </a>
        <br />
        <a className="email" href={"email:" + email}>
          {props.email}
        </a>
        <br />
        <div className="link-div" onClick={affiliateWebsite}>
          <a className="link-a btn">
            {t("AffiliationLinkForWeb")}
            <span>
              <img
                src="https://wallet.slamcoin.io/image/link.svg"
                className="link-svg"
                alt=""
              />
            </span>
          </a>
        </div>
        <div className="toast affili">
          <div className="toast-copy affili-copy">{t("Copied")}</div>
        </div>
      </ul>
      {/* wallet affiliate */}
      <ul className="">
        <div className="link-div" onClick={affiliate}>
          <a className="link-a btn">
            {t("AffiliationLinkForWallet")}
            <span>
              <img
                src="https://wallet.slamcoin.io/image/link.svg"
                className="link-svg"
                alt=""
              />
            </span>
          </a>
        </div>
      </ul>
      <div>
        <ul className="sidebar-ul">
          <li className="sidebar-li" onClick={dashboard}>
            <a>{t("Dashboard")}</a>
          </li>
          <li className="sidebar-li" onClick={transaction}>
            <a>{t("Transactions")}</a>
          </li>
          <li className="sidebar-li" onClick={affilation}>
            <a>{t("Affiliations")}</a>
          </li>
          <li className="sidebar-li" onClick={coming}>
            <a>{t("Staking")}</a>
          </li>
          <li className="sidebar-li" onClick={coming}>
            <a>{t("LaunchPad")}</a>
          </li>
          <li className="sidebar-li" onClick={coming}>
            <a>{t("NFTMarket")}</a>
          </li>
          <li className="sidebar-li" onClick={coming}>
            <a>{t("CryptoGaming")}</a>
          </li>
          <li>
            <hr className="sidebar-hr" />
          </li>
          <li className="sidebar-li" onClick={coming}>
            <a>{t("Additional")}</a>
          </li>
        </ul>
      </div>
      <div className="setting-div" onClick={setting}>
        <a className="setting">
          <span>
            <img src="https://wallet.slamcoin.io/image/setting.svg" alt="" />
          </span>
          {t("Setting")}
        </a>
      </div>
      <div className="logout-div">
        <a className="logout" rel="noreferrer" onClick={logout}>
          <span>
            <img src="https://wallet.slamcoin.io/image/logout.svg" alt="" />
          </span>
          {t("Logout")}
        </a>
      </div>
      <div className="contact-admin">
        <p>{t("ContactUs")}</p>
        <p>support@slamcoin.io</p>
      </div>
    </div>
  );
}

export default Presale;
