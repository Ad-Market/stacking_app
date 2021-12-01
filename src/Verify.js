import React, {useState} from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useTranslation } from "react-i18next";
import "./translations/i18n";

export default function Verify() {
    const { t } = useTranslation();
    const [pass, setPass] = useState("");
    const [cpass, setCpass] = useState("");
    const [input, setInput] = useState(false);
    const [input1, setInput1] = useState(false);
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const [match, setMatch] = useState(false);
    const {url} = useParams();
    
    const reset = () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const token = urlParams.get('token');

        if(pass === ""){
            setInput(true);
        }else{
            setInput(false);
        }
        if(cpass === ""){
            setInput1(true);
        }else{
            setInput1(false);
        }
        if(pass !== cpass){
            setMatch(true);
        }else{
            setMatch(false);
        }
        const send = {
            password: pass,
            decode_url: token
        }

        if(pass !== "" && cpass !== "" && pass == cpass){
            axios.post(process.env.REACT_APP_SLAMBACKEND+'api/verify', send)
            .then(res => {
                if(res.data.status === "success"){
                    setSuccess(true);
                    setFailure(false);
                    setMatch(false);
                }else{
                    setSuccess(false);
                    setFailure(true);
                    setMatch(false);
                }
            })
        }
    }
    
    return (
        <div className="login-background">
            <img src="/image/right-top.svg" className="right-top"  alt=""/>
            <img src="/image/middle.svg" className="right-middle" alt=""/>
            <img src="/image/middle.svg" className="right-bottom" alt=""/>
            
            <img src="/image/middle.svg" className="left-top" alt=""/>
            <img src="/image/middle.svg" className="left-middle" alt=""/>
            <img src="/image/middle.svg" className="left-bottom" alt=""/>

            <div className="auth-form login-form">
                <p className="private-sale"> - {t('Presale')} - </p>
                <div className="slamLogo">
                    <img src="/image/slam.png" className="slamcoin" alt=""/>
                </div>
                {success && <div className="passChanged ft-20"><p className="text-white">{t('PasswordSaved')}</p></div>}
                {failure && <p style={{color:'red'}}>{t('Fail')}</p>}
                {match && <p style={{color:'red', marginBottom:'0px'}}>{t('PasswordNotMatched')}</p>}
                {
                    !success && 
                    <div className="slam-verify-email mt-100">
                       <input type="password" className="verify_npass slam-login-email" id="email" placeholder={t('EnterNewPassword')}  onChange={e=>{setPass(e.target.value)}}/>
                    </div>
                }
                {input && <p style={{color:'red', textAlign:'left'}}>{t('FormFieldRequired')}</p>}
                {
                    !success && 
                    <div>
                        <input type="password" className="verify_cpass slam-login-pass" id="pass" placeholder={t('EnterPassword')} onChange={e=>{setCpass(e.target.value)}}/>
                    </div>
                }
                {input1 && <p style={{color:'red', textAlign:'left'}}>{t('FormFieldRequired')}</p>}
                {!success && <button className="btn slam-auth-button forget_button" onClick={reset}>{t('Send')}</button>}
                <div className="slam-confirm slam-verify">
                    <p className=""><a className="slam-register-link" href="/">{t('Login')}</a></p>
                </div>
            </div>
            <div className="slam-footer">
                <img src="/image/slamblack.png" className="slam-footer-icon" alt=""/>
                <p className="slam-copyright"> © Copyright 2021 by Slamcoin</p>
            </div>
        </div>
    );
}