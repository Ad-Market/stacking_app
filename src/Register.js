import React, { useState, useEffect } from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import { useHistory } from "react-router-dom";
import { validate, res } from "react-email-validator";
import axios from "axios";
import { useParams } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useTranslation } from "react-i18next";
import "./translations/i18n";

export default function Register() {
  const { t } = useTranslation();
  // inputs values
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");

  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const [email, setEmail] = useState("");
  const [prefix, setPrefix] = useState("");
  const [termsCond, setTermsCond] = useState(false);
  const [termsCondW, setTermsCondW] = useState(true);

  //warnings
  const [emailW, setEmailW] = useState(false);
  const [emailV, setEmailV] = useState(false);
  const [phoneW, setPhoneW] = useState(false);
  const [passW, setPassW] = useState(false);
  const [cpassW, setCpassW] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [type, setType] = useState(false);
  const [fill, setFill] = useState(false);
  //success or fail
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  // user id
  const { user_id } = useParams();
  // router history
  const history = useHistory();

  const fillfunc = () => {
    // const phone = phone;
    // const email = document.getElementById('email').value;
    // const pass = document.getElementById('pass').value;
    // const cpass = document.getElementById('cpass').value;
    if (phone !== "" && email !== "" && pass !== "" && cpass !== "") {
      setFill(true);
    } else {
      setFill(false);
    }
  };
  const login = () => {
    history.push("/");
  };

  const register = () => {
    if (!termsCond) return false;

    if (!termsCondW) {
      setTermsCondW(false);
    } else setTermsCondW(true);

    if (pass === "") {
      setPassW(true);
    } else {
      setPassW(false);
    }

    if (email === "") {
      setEmailW(true);
    } else {
      validate(email);
      if (res) {
        setEmailV(false);
      } else {
        setEmailV(true);
      }
      setEmailW(false);
    }

    if (phone === "") {
      setPhoneW(true);
    } else {
      setPhoneW(false);
    }

    if (cpass === "") {
      setCpassW(true);
    } else {
      setCpassW(false);
    }

    if (cpass !== "" && pass !== "" && cpass !== pass) {
      setConfirm(true);
    } else {
      setConfirm(false);
    }

    if (
      phone !== "" &&
      email !== "" &&
      pass !== "" &&
      cpass !== "" &&
      emailV === false &&
      cpass === pass &&
      termsCond
    ) {
      const provider = new WalletConnectProvider({
        infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
      });

      const web3 = new Web3(provider);
      const ethscan = web3.eth.accounts.create();
      const account_adress = ethscan.address;
      const privatekey = ethscan.privateKey;
      const reginfo = {
        phone: phone,
        country: country,
        email: email,
        password: pass,
        address: account_adress,
        privatekey: privatekey,
        refer_id: user_id,
        termsCond: termsCond,
      };
      axios
        .post(process.env.REACT_APP_SLAMBACKEND + `api/signup`, reginfo)
        .then((res) => {
          if (res.data.status === "ok") {
            // localStorage.setItem('slamtoken', res.data.token);
            // localStorage.setItem('isLogin', '1');
            setSuccess(true);
            setFail(false);
            setType(false);
            // history.push('/presale/home');
          }
          if (res.data.status === "mail") {
            setSuccess(false);
            setFail(true);
            setType(false);
          }
          if (res.data.status === "refer") {
            setSuccess(false);
            setType(true);
            setFail(false);
          }
        });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("slamtoken");
    const isLogin = localStorage.getItem("isLogin");
    if (token && isLogin) history.push("/presale/home");
  }, []);

  return (
    <div className="login-background">
      <img src="/image/right-top.svg" className="right-top" alt="" />
      <img src="/image/middle.svg" className="right-middle" alt="" />
      <img src="/image/middle.svg" className="right-bottom" alt="" />
      <img src="/image/middle.svg" className="left-top" alt="" />
      <img src="/image/middle.svg" className="left-middle" alt="" />
      <img src="/image/middle.svg" className="left-bottom" alt="" />
      {/* <div className="middle-div">
                <img src="https://wallet.slamcoin.io/image/middle-a.svg" className="middleaaa" alt=""/>
            </div> */}
      <div className="auth-form login-form">
        <p className="private-sale"> - {t("Presale")} - </p>
        <div className="slamLogo">
          <img
            src="/image/slam.png"
            className="slamcoin"
            alt=""
            onClick={login}
          />
        </div>
        {success && (
          <div className="mt-150 mb-150">
            <p className="success ft-20">{t("EmailConfirm")}</p>
          </div>
        )}
        {confirm && <p className="confirm">{t("PasswordNotMatched")}</p>}
        {type && <p className="confirm">{t("AffiliationLinkIncorrect")}</p>}
        {fail && <p className="fail">{t("AuthInUse")}</p>}

        {!success && (
          <div className="">
            <div className="signup-prefix">
              <PhoneInput
                country={"us"}
                value={phone}
                inputClass="phoneInput"
                onChange={(phone, country) => {
                  setPhone(phone);
                  setCountry(country.name);
                }}
              />
            </div>
            {phoneW && (
              <p className="form-required">{t("FormFieldRequired")}</p>
            )}
            <div>
              <input
                type="email"
                className="slam-register-pass"
                style={{ marginTop: phoneW ? "0px" : "" }}
                id="email"
                placeholder={t("EnterEmail")}
                onChange={(e) => {
                  setEmail(e.target.value);
                  fillfunc();
                  setFail(false);
                }}
              />
            </div>
            {emailW && (
              <p className="form-required">{t("FormFieldRequired")}</p>
            )}
            {emailV && <p className="form-required">{t("InvalidEmail")}</p>}
            <div>
              <input
                type="password"
                className="slam-login-pass"
                style={{ marginTop: emailW || emailV ? "0px" : "" }}
                id="pass"
                placeholder={t("EnterPassword")}
                onChange={(e) => {
                  setPass(e.target.value);
                  fillfunc();
                }}
              />
            </div>
            {passW && <p className="form-required">{t("FormFieldRequired")}</p>}
            <div>
              <input
                type="password"
                className="slam-login-pass"
                style={{ marginTop: passW ? "0px" : "" }}
                id="cpass"
                placeholder={t("EnterConfirmPassword")}
                onChange={(e) => {
                  setCpass(e.target.value);
                  fillfunc();
                }}
              />
            </div>
            {cpassW && (
              <p className="form-required">{t("FormFieldRequired")}</p>
            )}

            <div className="slam-terms-condition row">
              <input
                type="checkbox"
                value="lsRememberMe"
                id="rememberMe"
                className="rememberMe"
                onClick={(e) => {
                  setTermsCond(e.target.checked);
                }}
              />
              <label htmlFor="rememberMe">
                <a
                  className="text-white"
                  href="https://slamcoin.io/SLM_Terms&Conditions.pdf"
                  target="_blank"
                >
                  {t("AgreeTAC")}
                </a>
              </label>
            </div>
            {!termsCondW && <p className="form-required">{t("ReqTAC")}</p>}

            <button
              className={
                phone !== "" &&
                email !== "" &&
                pass !== "" &&
                cpass !== "" &&
                emailV === false &&
                cpass === pass &&
                termsCond
                  ? "btn slam-register-button"
                  : "btn slam-register-button disabled"
              }
              style={{
                marginTop: cpassW ? "25px" : "",
                backgroundColor: fill ? "#d8d9fe" : "",
              }}
              onClick={register}
            >
              {t("SignUp")}
            </button>
          </div>
        )}
        <p className="slam-login-back" onClick={login}>
          {t("Login")}?
        </p>
      </div>
      <div className="slam-footer">
        <img
          src="/image/slamblack.png"
          className="slam-footer-icon"
          alt=""
          onClick={login}
        />
        <p className="slam-copyright"> © Copyright 2021 by Slamcoin</p>
      </div>
    </div>
  );
}
