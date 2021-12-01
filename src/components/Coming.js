import React from 'react'
import { useTranslation } from "react-i18next";
import './../translations/i18n';

export default function Coming(){
    const { t } = useTranslation();
    
    return (
        <div className="row main">
            <div className="col-lg-12 col-md-12 main-content" style={{height: '100vh'}}>
            <p style={{fontSize:'25px'}}>{t('ComingSoon')}...</p>
            <div className="mobile">
                <i className="fa fa-bars" />
            </div>
            </div>
        </div>
    );
}