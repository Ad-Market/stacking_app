import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { validate, res } from 'react-email-validator';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import "./translations/i18n";
// import './AppHeader.css'

function First() {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailWarning, setEmailWarning] = useState(false);
  const [passwarning, setPasswarning] = useState(false);
  const [validEamil, setValidEamil] = useState(false);
  const [credential, setCredential] = useState(false);
  const [formFill, setFormFill] = useState(false);
  const [basicLogin, setBasicLogin] = useState(false);
  const [emailCode, setEmailCode] = useState("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [input, setInput] = useState(false);
  const [termsCond, setTermsCond] = useState(false);
  const [emailVerify, setEmailVerify] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState('');

  const history = useHistory();
  const register = () => {
    history.push('register');
  }
  const forget = () => {
    history.push('/forget');
  }
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const status = queryParams.get('status'); //code
    setVerifyStatus(status);

    const token   = localStorage.getItem('slamtoken');
    const isLogin = localStorage.getItem('isLogin');
    if(token && isLogin) 
      history.push('/presale/home');
  }, [])

  const formfillcheck = () => {
    if(email !== '' && password !== ''){
      setFormFill(true);
    }else{
      setFormFill(false);
    }
  }
  const handleEnterKeyPress = (event) => {
    if(event.key == "Enter")
      login()
  }
  const login = () => {
    if(!termsCond)
      return false;

    if(email===""){
      setEmailWarning(true);
    }else{
      // console.log("email is empty")
      setEmailWarning(false);
    }

    if(password===""){
      // console.log("hi")
      setPasswarning(true);
    }else{
      // console.log("pass is empty")
      setPasswarning(false);
    }

    if(email !== ""){
      validate(email);
      if(res){
        setValidEamil(false);
      }else{
        setValidEamil(true);
      }
    }

    if(email !== "" && password !== "" && validEamil === false && termsCond){
      axios.post(process.env.REACT_APP_SLAMBACKEND+'api/signin', {email:email, password: password})
      .then(res=>{

        if(res.data.status === "success"){
          setBasicLogin(true)
          // history.push('/email-verify');
          setCredential(false);
          // console.log(res.data, "res data")
          if(res.data.verifyToggle != 'checked') {
            localStorage.setItem('isLogin', "1");
            localStorage.setItem('slamtoken', res.data.token);
            history.push('/presale/home');
            setCredential(false);
          }
        }
        else if(res.data.status == "emailVerify"){
          setEmailVerify(true);
        }
        else if(res.data.status == "email"){
          setBasicLogin(true);
          setCredential(false);
        }else {
          setCredential(true);
          setBasicLogin(false);
        }
      })
      .catch(error=>{
        // console.log(error, "this is catch error")
      })
    }
  }

  const emailCodeSend = () => {
    if(emailCode === ""){
      setInput(true);
    }else{
      setInput(false);
    }
    
    const send = {
      email: email,
      emailCode: emailCode,
    }

    if(emailCode){
        axios.post(process.env.REACT_APP_SLAMBACKEND+'api/email-verify', send)
        .then(res => {
            if(res.data.status === "success"){
                setSuccess(true);
                setFailure(false);
                localStorage.setItem('isLogin', "1");
                localStorage.setItem('slamtoken', res.data.token);
                history.push('/presale/home');
            }else{
                setSuccess(false);
                setFailure(true);
            }
        })
    }
  }
  return (
    <div className="login-background">
          <img src="./image/right-top.svg" className="right-top"  alt=""/>
          <img src="./image/middle.svg" className="right-middle" alt=""/>
          <img src="./image/middle.svg" className="right-bottom" alt=""/>
          
          <img src="./image/middle.svg" className="left-top" alt=""/>
          <img src="./image/middle.svg" className="left-middle" alt=""/>
          <img src="./image/middle.svg" className="left-bottom" alt=""/>
          
          <div className="auth-form login-form">
            <p className="private-sale"> - {t('Presale')} - </p>
            <div className="slamLogo">
              <img src="./image/slam.png" className="slamcoin" alt=""/>
            </div>
            {emailVerify && <h4 className="text-danger">{t('VerificationLink')} <br/>{t('VerifyEmail')}</h4>}
            {verifyStatus == 'emailVerified' && <h4 className="text-success">{t('Verified')}</h4>}
            {verifyStatus == 'emailNotVerified' && <h4 className="text-danger">{t('NotVerified')}</h4>}
            {!basicLogin ?
            <div id="basic_login">
              {credential && <p className="credential">{t('AuthIncorrect')}</p>}
              <div>
              <input type="email" className="slam-login-email" id="email" placeholder={t('EnterEmail')}  onChange={e=>{setEmail(e.target.value); formfillcheck();}}/>
              </div>
              {emailWarning && <p className="form-required">{t('FormFieldRequired')}</p>}
              {validEamil && <p className="form-required">{t('InvalidEmail')}</p>}
              <div>
              <input type="password" className="slam-login-pass" id="pass" placeholder={t('EnterPassword')} onKeyPress={handleEnterKeyPress} onChange={e=>{setPassword(e.target.value); formfillcheck();}}/>
              </div>
              {passwarning && <p className="form-required">{t('FormFieldRequired')}</p>}
              
              <div className="text-left slam-password-forget"><p className="slam-register-link" onClick={e=>{forget()}}>{t('ForgetPassword')}</p></div>
              
              <div className="text-left slam-terms-condition">
                    <input type="checkbox" value="lsRememberMe" id="rememberMe" className="rememberMe" onClick={e => {setTermsCond(e.target.checked)}} />
                    <label htmlFor="rememberMe">
                      {t('Accept')} &nbsp;
                      <a className="text-white" href="https://slamcoin.io/SLM_Terms&Conditions.pdf" target="_blank">
                        <strong>{t('Terms')}</strong> {t('And')} <strong>{t('Conditons')}</strong>
                      </a>
                    </label>
              </div>
                <button className={(email != '' && password !== "" && validEamil === false && termsCond) ? "btn slam-auth-button":"btn slam-auth-button disabled"} onClick={login} style={{backgroundColor: formFill?'#d8d9fe':''}}>{t('Login')}</button>
            </div>
            :
            <div id="emailVerification">
                {failure && <p style={{color:'red'}}>{t('Fail')}</p>}
                <p className="text-center validationCode text-white">
                    {t('ValidationCode')}?
                </p>
                <p className="text-center text-white enterValidationCode">{t('Enter')} {t('Your')} {t('ValidationCode')}</p>
                {
                    !success && 
                    <div>
                       <input type="text" className="verify_npass slam-login-email" id="code" placeholder={t('Code')}  onChange={e=>{setEmailCode(e.target.value)}}/>
                    </div>
                }
                
                {!success && <button className="btn slam-auth-button forget_button" onClick={emailCodeSend}>{t('Submit')}</button>}
            </div>}
            <div className="slam-confirm">
              {/* {!basicLogin && <p className=""><a className="slam-register-link" href="/forget">Password forget</a></p>} */}
              <p className="">{t('NoAccount')}? <span className="slam-register-link" onClick={register}>{t("Registration")}</span></p>
            </div>
      </div>
      <div className="slam-footer">
        <img src="./image/slamblack.png" className="slam-footer-icon" alt=""/>
        <p className="slam-copyright"> © Copyright 2021 by Slamcoin</p>
      </div>
    </div>
  );
}

export default First;
