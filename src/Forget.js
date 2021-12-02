import React, { useState, useEffect } from "react";
import { validate, res } from "react-email-validator";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./translations/i18n";

export default function Forget() {
  const { t } = useTranslation();

  const [forget, setForget] = useState("");
  const [input, setInput] = useState(false);
  const [email, setEmail] = useState(false);
  const [emailNotExist, setEmailNotExist] = useState(false);
  const history = useHistory();
  const register = () => {
    history.push("register");
  };
  const [success, setSuccess] = useState(false);
  const [box, setBox] = useState(true);
  const [color, setColor] = useState("");
  const [sendtitle, setSendtitle] = useState("Send");
  const send = () => {
    if (forget === "") {
      setInput(true);
    } else {
      setInput(false);
    }
    if (forget !== "") {
      validate(forget);
      if (res) {
        setEmail(false);
      } else {
        setEmail(true);
      }
    }
    const forget_email = {
      email: forget,
    };
    if (forget !== "" && email === false) {
      axios
        .post(process.env.REACT_APP_SLAMBACKEND + "api/forget", forget_email)
        .then((res) => {
          if (res.data.status === "success") {
            setSuccess(true);
            setColor("green");
            setSendtitle("Sent!");
            setBox(false);
            setEmailNotExist(false);
          } else {
            setEmailNotExist(true);
          }
        });
    } else {
      setSuccess(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("slamtoken");
    const isLogin = localStorage.getItem("isLogin");
    if (token && isLogin) window.location.href("/");
  }, []);

  return (
    <div className="login-backgrounds">
      <img src="/image/right-top.svg" className="right-top" alt="" />
      <img src="/image/middle.svg" className="right-middle" alt="" />
      <img src="/image/middle.svg" className="right-bottom" alt="" />

      <img src="/image/middle.svg" className="left-top" alt="" />
      <img src="/image/middle.svg" className="left-middle" alt="" />
      <img src="/image/middle.svg" className="left-bottom" alt="" />

      <div className="auth-form login-form">
        <p className="private-sale"> - {t("Presale")} - </p>
        <div className="slamLogo">
          <img src="/image/slam.png" className="slamcoin" alt="" />
        </div>

        {box && (
          <div className="forgetEmail">
            <input
              type="email"
              className="slam-login-email"
              id="email"
              placeholder={t("AuthRecover")}
              onChange={(e) => {
                setForget(e.target.value);
                setEmail(false);
                setEmailNotExist(false);
              }}
            />
          </div>
        )}
        {success && (
          <div className="text-center msgSent" style={{ color: "white" }}>
            <p>{t("EmailSent")}</p>
            <br />
            <p>{t("CheckInbox")}</p>
          </div>
        )}
        {input && (
          <p
            style={{
              color: "red",
              marginTop: "5px",
              textAlign: "left",
              marginBottom: "0px",
            }}
          >
            {t("FormFieldRequired")}
          </p>
        )}
        {email && (
          <p
            style={{
              color: "red",
              marginTop: "5px",
              textAlign: "left",
              marginBottom: "0px",
            }}
          >
            {t("RequireValidEmail")}
          </p>
        )}
        {emailNotExist && (
          <p style={{ color: "red", marginTop: "5px", marginBottom: "0px" }}>
            {t("NotRegEmail")}
          </p>
        )}

        {!success && (
          <button
            className="btn slam-auth-button slam-forget-button"
            onClick={send}
          >
            {t("Send")}
          </button>
        )}
        <div className="slam-confirm">
          <p className="">
            {t("NoAccount")}?{" "}
            <a className="slam-register-link" href="/register">
              {t("Registration")}
            </a>
          </p>
        </div>
      </div>
      <div className="slam-footer">
        <img src="/image/slamblack.png" className="slam-footer-icon" alt="" />
        <p className="slam-copyright"> © Copyright 2021 by Slamcoin</p>
      </div>
    </div>
  );
}
