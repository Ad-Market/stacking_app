import React, {useState} from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';
import { useTranslation } from "react-i18next";
import './../translations/i18n';

export default function Tfaverify() {
    const { t } = useTranslation();
    
    const [emailCode, setEmailCode] = useState("");
    const [input, setInput] = useState(false);
    const [input1, setInput1] = useState(false);
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const [match, setMatch] = useState(false);
    const {url} = useParams();
    const history = useHistory();
    const register = () => {
        history.push('register');
    }

    const reset = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token')

        if(emailCode === ""){
            setInput(true);
        }else{
            setInput(false);
        }
        
        const send = {
            email_code: emailCode
        }

        if(emailCode){
            axios.post(process.env.REACT_APP_SLAMBACKEND+'api/email-verify', send)
            .then(res => {
                if(res.data.status === "success"){
                    setSuccess(true);
                    setFailure(false);
                }else{
                    setSuccess(false);
                    setFailure(true);
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
            <div className="middle-div">
                <img src="/image/middle-a.svg" className="middleaaa" alt=""/>
            </div>
            <div className="login-form">
                <p className="private-sale"> - {t('Presale')} - </p>
                <div>
                <img src="/image/slam.png" className="slamcoin" alt=""/>
                </div>
                {success && <div className="passChanged"><p style={{color:'white'}}>{t('LoginNow')}</p></div>}
                
                {failure && <p style={{color:'red'}}>{t('Fail')}</p>}
                <p className="text-center validationCode text-white">
                    {t('ValidationCode')}?
                </p>
                <p className="text-center text-white enterValidationCode">{t('EnterValidationCode')}</p>
                {
                    !success && 
                    <div>
                       <input type="text" className="verify_npass slam-login-email" id="code" placeholder={t('Code')}  onChange={e=>{setEmailCode(e.target.value)}}/>
                    </div>
                }
                
                {!success && <button className="btn slam-auth-button forget_button" onClick={reset}>{t('Submit')}</button>}
                <div className="slam-confirm">
                    <p className="">{t('NoAccount')}? <span className="slam-register-link" onClick={register}>{t('Registration')}</span></p>
                </div>
            </div>
            <div className="slam-footer">
                <img src="/image/slamblack.png" className="slam-footer-icon" alt=""/>
                <p className="slam-copyright"> © Copyright 2021 by Slamcoin</p>
            </div>
        </div>
    );
}