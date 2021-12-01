import React, {useEffect, useState, useMemo} from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { validate, res } from 'react-email-validator';
import { Message, Checkbox, Button, Modal, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { useTranslation } from "react-i18next";
import './../translations/i18n';

export default function Setting({childToParent}){
    const history = useHistory();
    const { t } = useTranslation();

    const [id, setId] = useState('');
    const [open, setOpen] = React.useState(false)
    // setting input value
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [tgName, setTgName] = useState('');
    const [slamName, setSlamName] = useState('');
    const [cpass, setCpass] = useState('');
    const [npass, setNpass] = useState('');
    const [rpass, setRpass] = useState('');
    const [birthday, setBirthday] = useState('');
    const [place, setPlace] = useState('');
    const [gender, setGender] = useState('Male');
    const [passwdFail, setPasswdFail] = useState(false);
    const [passwdSuccess, setPasswdSuccess] = useState(false);
    const [verifyModal, setVerifyModal] = useState(false);
    const [timeOverModal, setTimeOverModal] = useState(false);
    
    // setting warning 
    const [emailW, setEmailW] = useState(false);
    const [emailV, setEmailV] = useState(false);
    const [phoneW, setPhoneW] = useState(false);
    const [tgNameW, setTgNameW] = useState(false);
    const [slamNameW, setSlamNameW] = useState(false);
    const [cpassW, setCpassW] = useState(false);
    const [passconfirm, setPassconfirm] = useState(false);
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);
    const [passmatch, setPassmatch] = useState(false);
    const [emailExist, setEmailExist] = useState(false);
    const [value, setValue] = useState('')
    const [tfaToggle, setTfaToggle] = useState('')
    const countryOptions = useMemo(() => countryList().getData(), [])
    const token  = localStorage.getItem('slamtoken');
    
    const verifyEmail = (e) => {
        const verificationSent = parseInt(localStorage.getItem('verificationSent')) > 0 ? parseInt(localStorage.getItem('verificationSent')) : 1634012342754;
        // console.log(Date.now() , verificationSent , "check verify", verificationSent > 0)
        if(Date.now() - verificationSent > 60000 && verificationSent > 0) {
            axios.post(process.env.REACT_APP_SLAMBACKEND+'api/verificationEmail?email='+email)
            .then(res => {
                if(res.data.status == 'success') {
                    setVerifyModal(true);
                    localStorage.setItem('verificationSent', Date.now());
                }
            })
        }else
            setTimeOverModal(true);
    }

    const updateTfaToggle = (e) => {
        let status = '';
        if(tfaToggle == 'checked') {
            setTfaToggle('')
            status = 'off';
        }
        else {
            setTfaToggle('checked')
            status = 'on';
        }
        axios.post(process.env.REACT_APP_SLAMBACKEND+'api/toggle/'+status+'/email-verify', {token: token})
        .then(res=>{
            
        })
        .catch(error=>{
            // console.log(error)
        })
    }

    const onAvatarChange = (e) => {
        
    }
    const filter = id => {
        
    }

    const removeImage = id => {
        // setState({ images: filter(id) })
    }

    const onError = id => {
        // this.setState({ images: this.filter(id) })
    }
    
    const resetPasswd = () => {
        if(cpass === ''){
            setCpassW(true);
        }else{
            setCpassW(false);
        }
        
        if(npass !== ''){
            if(npass !== rpass){
                setPassconfirm(true);
            }else{
                setPassconfirm(false);
            }
        }else {
            return false;
        }
        if(cpass !== '' && npass !== '' && npass === rpass){
            axios.post(process.env.REACT_APP_SLAMBACKEND+'api/'+id+'/resetPasswd', {token: token, cpass: cpass, npass: npass})
            .then(res => {
                // console.log(res, "result")
                if(res.data.status == "success") {
                    // console.log(res.data.status, "success")
                    setPassmatch(false)
                    setPasswdFail(false);
                    setPasswdSuccess(true);
                    setCpass('');
                    setNpass('');
                    setRpass('');
                }else
                    setPasswdFail(true);
                    setPasswdSuccess(false)
            })
        }
    }
    
    const changeHandler = value => {
      setValue(value)
    }
    
    useEffect(() => {
        async function fetchdata(){
            const res = await axios.post(process.env.REACT_APP_SLAMBACKEND+'api/token', {token:token});
            
            if(res.data.status === 'ok'){
                childToParent(res.data)
                setId(res.data.id);
                setName(res.data.name);
                setEmail(res.data.email);
                setPhone(res.data.phone);
                setTgName(res.data.tgName);
                setSlamName(res.data.slamName);
                setBirthday(res.data.birthday);
                setGender(res.data.gender);
                setPlace(res.data.place);
                setValue(res.data.country);
                setTfaToggle(res.data.email_verify_toggle)
            }else{
                localStorage.setItem('slamtoken', '');
                localStorage.setItem('isLogin', '');
                history.push('/');
            }
        }
        fetchdata();
      }, []);
    
    const affilcopy = () => {
        const el = document.createElement('textarea');
        el.value = 'https://wallet.slamcoin.io/register/' + id;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }
 
    // setting save
    const save = () => {
        
        if(email === ''){
            setEmailW(true);
        }else{
            validate(email);
            if(res){
                setEmailV(false);
            }else{
                setEmailV(true);
            }
            setEmailW(false);
        }

        if(phone === ''){
            setPhoneW(true);
        }else{
            setPhoneW(false);
        }

        if(email !== '' && phone !== ''){
            // if(email !== '' && phone !== '' && cpass !== '' && npass === rpass){
            const user_info = {
                name: name,
                email: email,
                phone: phone,
                tgName: tgName,
                slamName: slamName,
                place: place,
                birthday: birthday,
                // country: value['label'],
                country: value,
                gender: gender,
                cpass: cpass,
                npass: npass,
                token: token
            };

            axios.post(process.env.REACT_APP_SLAMBACKEND+'api/'+id+'/reset', user_info)
            .then(res=>{
                if(res.data.status === 'ok'){
                    setSuccess(true);
                    // setPassmatch(false);
                    setFail(false);
                    setEmailExist(false);
                  
                }else if(res.data.status === 'pass'){
                    // setPassmatch(true);
                    setSuccess(false);
                    setFail(false);
                    setEmailExist(false);
                }else if(res.data.status === 'email'){
                    setEmailExist(true);
                    setSuccess(false);
                    setFail(false);
                    // setPassmatch(false);
                }else{
                    setSuccess(false);
                    setFail(true);
                    setPassmatch(false);
                    setEmailExist(false);
                }
            })
            .catch(error=>{
                // console.log(error)
                if(error){
                    setFail(true);
                }else{
                    setFail(false);
                }
            })

        }
    }
     
    return (
        <div className="row main setting-right">
            {success && 
                <Message positive className="messagebox" onClick={e=>setSuccess(false)}>
                    <Message.Header>{t('Success')}</Message.Header>
                    <p>
                        {t('InfoSaved')}
                    </p>
                </Message>
            }
            {fail &&
                <Message negative className="messagebox" onClick={e=>{setFail(false);}}>
                    <Message.Header>{t('Failed')}</Message.Header>
                    <p>{t('Fail')}</p>
                </Message>
            }
            {passmatch &&
                <Message negative className="messagebox" onClick={e=>setPassmatch(false)}>
                    <Message.Header>{t('Warning')}</Message.Header>
                    <p>{t('PassNotMatch')}</p>
                </Message>
            }
            {emailExist &&
                <Message negative className="messagebox" onClick={e=>setPassmatch(false)}>
                    <Message.Header>{t('Warning')}</Message.Header>
                    <p>{t('BeUnique')}</p>
                </Message>
            }
            <div className="mobile">
              <i className="fa fa-bars" />
            </div>
            <div className="col-lg-12 col-md-12">
                <div className="rows">
                    <p className="transaction-title">{t('Settings')}</p>
                    <p className="all-yourss">{t('AllSetting')}</p>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-12 text-center">
                        <div className="setting-input-div">
                            <img src="/image/profile.png" />      
                            {/* {content()} */}
                            <input type='file' className="d-none" id='single' onChange={onAvatarChange} /> 
                        </div>
                        <div className="setting-input-div profile">
                            <Header as="h3">{name}</Header>
                        </div>
                        <div className="setting-input-div profile setting-profile-item">
                            <span>2FA (Email)</span>
                            <Checkbox onClick={e=>{updateTfaToggle()}} toggle checked = {tfaToggle} />
                        </div>
                        <div className="setting-input-div profile">
                            
                            <Modal
                                className="buy-modal pawd-modal"
                                closeIcon
                                open={open}
                                trigger={<div className="setting-profile-item"><button className="btn btn-primary">{t('ChangePassword')}</button></div>}
                                onClose={() => setOpen(false)}
                                onOpen={() => setOpen(true)}
                                >  
                            <div className="modal-content">
                                <div className="modal-header">
                                    <p className="ChangePasswordHeader">{t('ChangePassword')}!</p>
                                </div>
                                <div className="modal-body">
                                    <div className="setting-input-div">
                                        <p className="passwdChangeLabel">{t('EnterCurrentPassword')}</p>
                                        <div id="currentPasswd">
                                            <input type="password" className="form-control setting-user-info setting-input-group" placeholder={t('EnterCurrentPassword')} value={cpass} onChange={e=>{setCpass(e.target.value); setCpassW(false);  setSuccess(false);}}/>
                                        </div>
                                        {cpassW && <p className="setting-input-warning">{t('FormFieldRequired')}.</p>}
                                    </div>
                                    <div className="setting-input-div">
                                        <p className="passwdChangeLabel">{t('EnterNewPassword')}</p>
                                        <div id="newPasswd">
                                            <input type="password" className="form-control setting-user-info setting-input-group" placeholder={t('EnterNewPassword')} value={npass} onChange={e=>{setNpass(e.target.value); setPassconfirm(false);  setSuccess(false);}}/>
                                        </div>
                                        {passconfirm && <p className="setting-input-warning">{t('PasswordNotMatched')}</p>}
                                    </div>
                                    <div className="setting-input-div">
                                        <p className="passwdChangeLabel">{t('EnterConfirmPassword')}</p>
                                        <div id="confirmPasswd">
                                            <input type="password" className="form-control setting-user-info setting-input-group" placeholder={t('EnterConfirmPassword')} value={rpass} onChange={e=>{setRpass(e.target.value);  setSuccess(false);}}/>
                                        </div>
                                    </div>
                                    {passwdFail &&
                                        <Header color='red' as='h4'>{t('PasswordMismatched')}</Header>
                                    }
                                    {passwdSuccess &&
                                        <Header color='green' as='h4'>{t('PasswordUpdated')}</Header>
                                    }
                                    <div className="text-right">
                                        <Button className="ui button" onClick={() => setOpen(false)}>{t('Cancel')}</Button>
                                        <Button color='violet' className="ui button" onClick={() => resetPasswd()}>{t('Submit')}</Button>
                                    </div>
                                </div>
                            </div>
                            </Modal>
                        </div>
                        
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className="setting-input-div">
                            <label>{t('EnterName')}</label>
                            <div id="setting-input-username">
                                <input type="text" className="form-control setting-user-info setting-input-group" placeholder="" value={name} onChange={e=>{setName(e.target.value); setSuccess(false);}}/>
                            </div>
                        </div>
                        <div className="setting-input-div">
                            <label>{t('BirthDay')}</label>
                            <div id="setting-input-date">
                                <input type="date" className="form-control setting-user-info setting-input-group" placeholder="" value={birthday} onChange={e=>{setBirthday(e.target.value); setSuccess(false);}}/>
                            </div>
                        </div>
                        <div className="setting-input-div">
                            <label>{t('EnterYourPlace')}</label>
                            <div id="setting-input-place">
                                <input type="text" className="form-control setting-user-info setting-input-group" placeholder="" value={place} onChange={e=>{setPlace(e.target.value); setSuccess(false);}}/>
                            </div>
                        </div>
                        <div className="setting-input-div">
                            <label>{t('EnterEmail')}</label>
                            <div id="setting-input-email">
                                <input type="text" className="form-control setting-user-info setting-input-group" value={email} placeholder="" onChange={e=>{setEmail(e.target.value); setEmailW(false); setEmailV(false); setSuccess(false);}}/>
                                <div className="setting-input-verify-email">
                                    <p className="text-success" onClick={verifyEmail} >{t('VerifyEmail')}</p>
                                </div>
                            </div>
                            {emailW && <p className="setting-input-warning">{t('FormFieldRequired')}.</p>}
                            {emailV && <p className="setting-input-warning">{t('EmailStyle')}</p>}
                        </div>
                        <div className="setting-input-div">
                            <label>Slamchat {t('UserName')}</label>
                            <div id="setting-input-slam">
                                <input type="text" className="form-control setting-user-info setting-input-group" placeholder="" value={slamName} onChange={e=>{setSlamName(e.target.value); setSuccess(false);}}/>
                            </div>
                        </div>
                        {/*                             
                        <p className="Please-note-to-inpu">
                            *Please note to input the correct information for further inquiries in case of any unusual activities in your account.
                        </p> */}
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12" style={{position:'relatives'}}>
                        <div className="setting-input-div">
                            <label>{t('Telegram')} {t('UserName')}</label>
                            <div id="setting-input-tg">
                                <input type="text" className="form-control setting-user-info setting-input-group" value={tgName} placeholder="" onChange={e=>{setTgName(e.target.value); setTgNameW(false);  setSuccess(false);}}/>
                            </div>
                        </div>
                        <div className="setting-input-div">
                            <label>{t('SelectGender')}</label>
                            <div id="setting-input-gender">
                                <select className="form-control setting-user-info setting-input-group" value={gender} onChange={ e=> {setGender(e.target.value); }}>
                                    <option value="male">{t('Male')}</option>
                                    <option value="female">{t('Female')}</option>
                                </select>
                            </div>
                        </div>
                        <div className="setting-input-div">
                            <label>{t('SelectCountry')}</label>
                            <div id="setting-input-country">
                                <Select className="form-control setting-user-info setting-input-groups country" options={countryOptions} value={value} onChange={changeHandler} />
                            </div>
                            {/* <CountrySelector /> */}
                        </div>
                        <div className="setting-input-div">
                            <label>{t('EnterPhone')}</label>
                            <PhoneInput
                                country={'us'}
                                value={phone}
                                inputClass="form-control setting-user-info setting-input-group"
                                onChange={phone=>setPhone(phone)}
                            />
                        </div>
                        <div className="setting-input-div profile">
                            <label className="affil-link">{t('AffiliateLink')} <span className="earn-up">{t('AffiliateEarn')}</span></label>
                            <div className="setting-cards setting-card2" onClick={affilcopy}>
                                <button className="btn setting-links btn-success">https://wallet.slamcoin.io/register/{id}</button>
                            </div>
                            <div className="toast setting-toast">
                                <div className="toast-copy setting-toast-copy">
                                    {t('Copied')}
                                </div>
                            </div>
                        </div>
                        <button className="Rectangle form-control" onClick={save} style={{backgroundColor: (success)?'rgba(230, 230, 230, 0.99)':'', color:(success)?'black':''}}> {(success)?'Saved':'Save'}</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="policy-box">
                            <p className="policy-title">{t('Disclaimer')}</p>
                            <p className="policy-content">
                                {t('NoteInformation')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                  className="buy-modal"
                  closeIcon
                  open={verifyModal}
                  onClose={() => setVerifyModal(false)}
                  onOpen={() => setVerifyModal(true)}
                >   
                <div className="modal-content">
                  {/* Modal body */}
                  <div className="modal-body">
                    
                    <div className="text-center">
                        <p>{t('VerificationEmailSent')}</p>
                    </div>
                  </div>
                </div>
            </Modal>
            <Modal
                  className="buy-modal"
                  closeIcon
                  open={timeOverModal}
                  onClose={() => setTimeOverModal(false)}
                  onOpen={() => setTimeOverModal(true)}
                >   
                <div className="modal-content">
                  {/* Modal body */}
                  <div className="modal-body">
                    
                    <div className="text-center">
                        <p>{t('EmailSentAlready')}</p>
                    </div>
                  </div>
                </div>
            </Modal>
        </div>
    );
}
// https://academind.com/tutorials/reactjs-image-upload