import React, {useState, useEffect} from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';
import { useTranslation } from "react-i18next";
import './../translations/i18n';

export default function EmailVerify() {
    const { t } = useTranslation();
    
    const [verified, setVerified] = useState();
    const history = useHistory();
    const emailVerified = () => {
        history.push('/?status=emailVerified');
    }
    const emailNotVerified = () => {
        history.push('/?status=emailNotVerified');
    }
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const swuev = queryParams.get('swuev'); //code
        const ueecp = queryParams.get('ueecp'); //email

        const send = {
            swuev: swuev,
            ueecp: ueecp
        }
        verificationCheck(send)
    }, []);
    
    const verificationCheck = (send) => {
        axios.post(process.env.REACT_APP_SLAMBACKEND+'api/email-verify', send)
        .then(res => {
            if(res.data.status === 'emailVerified') {
                emailVerified();
            }else
                emailNotVerified();
        })
        .catch(error => {
            // console.log(error)
        })
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
                <div className="mb-235 mt-130">
                    <p className="text-center validationCode text-white">
                        {t('BeRedirected')} .......
                    </p>
                </div>
         
                <div className="slam-confirm">
                    <p className=""><span className="slam-register-link">{t('Login')}</span></p>
                </div>
            </div>
            <div className="slam-footer">
                <img src="/image/slamblack.png" className="slam-footer-icon" alt=""/>
                <p className="slam-copyright"> © Copyright 2021 by Slamcoin</p>
            </div>
        </div>
    );
}