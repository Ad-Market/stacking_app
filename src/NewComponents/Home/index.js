import React, { useEffect, useState, useCallback } from "react";
import QRCode from "qrcode.react";
import axios from "axios";
import Web3 from "web3";
// import { useHistory } from 'react-router-dom';
import { Button, Popup, Grid, Modal } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useTranslation } from "react-i18next";
import "../../translations/i18n";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import Header from "../Header";
import Wallet from "../Wallet";
import TokenSale from "../TokenSale";
import StakeModal from "../Modals/StakeModal";
import SystemWalletBalance from "../SystemWalletBalance";
import DifiShaking from "../DifiStaking";

export default function Home({ childToParent }) {
  const { t } = useTranslation();

  const token = localStorage.getItem("slamtoken");

  const [isActive, setActive] = useState(false);
  const [overlayText, setOverlayText] = useState("Please wait ...");

  const handleButtonClicked = useCallback(() => {
    setActive((value) => !value);
  }, []);
  // const options = {
  //   timeout: 20000,
  //   headers: [
  //       {
  //           name: 'Access-Control-Allow-Origin', value: '*'
  //       },
  //   ]
  // };

  // const httpProviderEth = new Web3.providers.HttpProvider(process.env.REACT_APP_ETH, options);
  // const httpProviderBsc = new Web3.providers.HttpProvider(process.env.REACT_APP_BSC, options);

  const web3 = new Web3(process.env.REACT_APP_ETH);
  const web3_bnb = new Web3(process.env.REACT_APP_BSC);
  // console.log(web3.version, "web3 version", web3_bnb.version)
  const [email, setEmail] = useState("");
  const [tokenPrice, setTokenPrice] = useState(0.07);
  const [exchange, setExchange] = useState(false);
  const [exchangeSuccess, setExchangeSuccess] = useState(false);
  const [exchangePending, setExchangePending] = useState(false);
  const [warningTrans, setWarningTrans] = useState(false);
  const [progressbarToggle, setProgressbarToggle] = useState(false);
  const [countdownToggle, setCountdownToggle] = useState(false);
  const [endTimeSeconds, setEndTimeSeconds] = useState(0);
  const [presaleTokenNumber, setPresaleTokenNumber] = useState(0);
  const [soldTokenNumber, setSoldTokenNumber] = useState(0);
  const [presaleEndSec, setPresaleEndSec] = useState(false);
  const [marketCap, setMarketCap] = useState(0);
  const [marketCapOld, setMarketCapOld] = useState(0);
  const [soldAmount, setSoldAmount] = useState(0);
  const [transferMode, setTransferMode] = useState("swap");
  const [providerError, setProviderError] = useState(false);
  const [providerErrorDialog, setProviderErrorDialog] = useState(false);

  let interval;
  let togglePresalePrice = "";
  let limitTokenNumber = 0;
  let limitTokenPrice = 0;
  let maximumExchangeOrg = 0;
  let minimumExchangeOrg = 0;
  let maximumExchangeInc = 0;
  let minimumExchangeInc = 0;

  const [buyingBlock, setBuyingBlock] = useState(true);
  const [maximumExchange, setMaximumExchange] = useState(0);
  const [minimumExchange, setMinimumExchange] = useState(0);
  const [maxMinEnable, setMaxMinEnable] = useState(false);
  const [minError, setMinError] = useState(false);
  const [maxError, setMaxError] = useState(false);

  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [bnbBalance, setBnbBalance] = useState(0.0);
  const [ethBalance, setEthBalance] = useState(0.0);
  const [maxBalance, setMaxBalance] = useState(0.0);
  const [maxInput, setMaxInput] = useState("");
  const [maxInputVal, setMaxInputVal] = useState("");
  // const [insertMax, setInsertMax] = useState("");
  const [transaction, setTransaction] = useState([]);
  const [coin, setCoin] = useState("$SLM");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenM, setIsOpenM] = useState(false);
  const [bnbPrice, setBnbPrice] = useState(0.0);
  const [ethPrice, setEthPrice] = useState(0.0);
  const [modalInput, setModalInput] = useState(0.0);
  const [open, setOpen] = React.useState(false);
  const [openBnbOut, setOpenBnbOut] = React.useState(false);
  const [stakeModalshow, setStakeModalshow] = useState(false);
  const [minCryptoSend, setMinCryptoSend] = useState(0.00012);
  const [selectCrypto, setSelectCrypto] = useState("BNB");
  const [adminWallet, setAdminWallet] = useState("");
  const [recipientWallet, setRecipientWallet] = useState("");
  const [id, setId] = useState("");
  const [slam, setSlam] = useState(0);
  const [progressAmount, setProgressAmount] = useState(0);
  const [currency, setCurrency] = useState("");
  const [lastAmount, setLastAmount] = useState(0);
  const [lastDate, setLastDate] = useState("");
  const [progressBNB, setProgressBNB] = useState(0);
  const [progressUSD, setProgressUSD] = useState(0);
  const [stakeCoin, setStakeCoin] = useState("$SLM");

  const minuteSeconds = 60;
  const hourSeconds = 3600;
  const daySeconds = 86400;

  const timerProps = {
    isPlaying: true,
    size: 90,
    strokeWidth: 5,
  };

  const affiliate = () => {
    const el = document.createElement("textarea");

    if (id === 379) el.value = "https://wallet.slamcoin.io/register/nft";
    else if (id === 161) el.value = "https://wallet.slamcoin.io/register/Ar";
    else el.value = "https://wallet.slamcoin.io/register/" + id;

    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  const renderTime = (dimension, time) => {
    return (
      <div className="time-wrapper">
        <div className="time">{time}</div>
        <div className="timeDemention">{dimension}</div>
      </div>
    );
  };

  const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
  const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
  const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
  const getTimeDays = (time) => (time / daySeconds) | 0;

  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = stratTime + endTimeSeconds; // use UNIX timestamp in seconds

  const remainingTime = endTime - stratTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  // web3 send ETH function
  // async function sendCryptobalances() {
  //   axios.post(process.env.REACT_APP_SLAMBACKEND+'api/eth_slam', {ethAmount:0.01, slamAmount:30, user_id:id})
  //   .then(res=>{console.log("okokokok")});
  // }
  const getGasPrice = async () => {
    let getGasPrice = await web3.eth.getGasPrice(function (e, r) {
      return r;
    });
    return getGasPrice;
  };

  async function sendCryptobalance() {
    // console.log("========================", modalInput, selectCrypto)
    setIsOpenM(false);
    if (modalInput > 0.009) {
      if (transferMode == "send") {
        handleClose();
      } else {
        setExchangePending(true);
      }

      if (transferMode == "swap" && maxMinEnable) {
        if (modalInput < minimumExchange) {
          setMinError(true);
          return false;
        } else setMinError(false);

        if (modalInput > maximumExchange) {
          setMaxError(true);
          return false;
        } else setMaxError(false);
      }
      setExchange(false);
    } else {
      setExchange(true);
      return false;
    }

    // setOverlayText(t('TransactionProcessing'));
    // handleButtonClicked();
    // setOpen(false);
    setExchange(false);
    let receiver = transferMode == "swap" ? adminWallet : recipientWallet;
    let txType = transferMode == "swap" ? "" : "OUT";
    let cryptoPrice = selectCrypto == "BNB" ? bnbPrice : ethPrice;
    console.log(selectCrypto, "=== crypto");
    // http://3.122.149.23:8080/api/cryptoTx
    const txHandle = await axios
      .post("/api/cryptoTx", {
        userId: id,
        address: address,
        modalInput: modalInput,
        selectCrypto: selectCrypto,
        receiver: receiver,
        privateKey: privateKey,
        tokenPrice: tokenPrice,
        cryptoPrice: cryptoPrice,
        txType: txType,
      })
      .then((res) => {
        if (res.data.status === "success") {
          let slam_amount = res.data.slam_amount;
          let sentAmount = res.data.sentAmount;
          const backendUrl = selectCrypto === "BNB" ? "bnb_slam" : "eth_slam";
          axios
            .post(process.env.REACT_APP_SLAMBACKEND + "api/" + backendUrl, {
              bnbAmount: sentAmount,
              slamAmount: slam_amount,
              user_id: id,
              txmode: transferMode,
            })
            .then((res) => {
              if (res.data.status === "ok") {
                setExchangeSuccess(true);
                setTransaction(res.data.trans);
                setSlam(Number(slam) + Number(slam_amount));
                if (selectCrypto == "BNB") {
                  setBnbBalance(
                    parseFloat(Number(bnbBalance) - Number(modalInput)).toFixed(
                      6
                    )
                  );
                  setMaxBalance(
                    parseFloat(Number(bnbBalance) - Number(modalInput)).toFixed(
                      6
                    )
                  );
                } else {
                  setEthBalance(
                    parseFloat(Number(ethBalance) - Number(modalInput)).toFixed(
                      6
                    )
                  );
                  setMaxBalance(
                    parseFloat(Number(ethBalance) - Number(modalInput)).toFixed(
                      6
                    )
                  );
                }
                setWarningTrans(false);
                setOpenBnbOut(true);
              }
            });
        }
      });

    // handleButtonClicked();
    // setOpen(true)
  }

  // const history = useHistory();
  const addresscopy = () => {
    const el = document.createElement("textarea");
    el.value = address;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  const maxcheck = (val) => {
    if (val > maxBalance) {
      setModalInput(maxBalance);
    } else {
      setModalInput(val);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpenM = () => {
    setIsOpenM(true);
  };

  const handleCloseM = () => {
    setIsOpenM(false);
  };

  async function getETHBalance(address) {
    await axios
      .get("https://api.binance.com/api/v3/avgPrice?symbol=ETHUSDT")
      .then((res) => {
        setEthPrice(res.data.price);
      });

    await web3.eth.getBalance(address, function (error, wei) {
      if (!error) {
        setEthBalance(parseFloat(web3.utils.fromWei(wei, "ether")).toFixed(6));
      } else {
        console.log(error, "eth getBalance get error");
        setProviderError(true);
        setProviderErrorDialog(true);
      }
    });
  }

  async function getBNBBalance(address) {
    await axios
      .get("https://api.binance.com/api/v3/avgPrice?symbol=BNBUSDT")
      .then((res) => {
        setBnbPrice(res.data.price);
      });

    await web3_bnb.eth.getBalance(address, function (error, wei) {
      if (!error) {
        setBnbBalance(
          parseFloat(web3_bnb.utils.fromWei(wei, "ether")).toFixed(6)
        );
        setMaxBalance(
          parseFloat(web3_bnb.utils.fromWei(wei, "ether")).toFixed(6)
        );
      } else {
        console.log(error, "bnb getBalance get error");
        setProviderError(true);
        setProviderErrorDialog(true);
      }
    });
  }

  async function getBNBBalanceBE(address) {
    handleButtonClicked();
    await axios
      .post(process.env.REACT_APP_SLAMBACKEND + "api/getBnbBalance/" + address)
      .then((res) => {
        setBnbBalance(parseFloat(res.data).toFixed(6));
      });
    handleButtonClicked();
  }

  async function getETHBalanceBE(address) {
    handleButtonClicked();
    await axios
      .post(process.env.REACT_APP_SLAMBACKEND + "api/getEthBalance/" + address)
      .then((res) => {
        setEthBalance(parseFloat(res.data).toFixed(6));
      });
    handleButtonClicked();
  }

  const [coinBalance, setCoinBalance] = useState(0);
  const [coinBalanceUsd, setCoinBalanceUsd] = useState(0);

  const tokenData = async () => {
    await axios
      .post(process.env.REACT_APP_SLAMBACKEND + "api/token", { token: token })
      .then((res) => {
        if (res.data.status === "ok") {
          const address = res.data.address;

          getBNBBalance(address);
          getETHBalance(address);

          childToParent(res.data);

          setAddress(res.data.address);
          setPrivateKey(res.data.privateKey);
          setAdminWallet(res.data.admin);
          setId(res.data.id);
          setTransaction(res.data.trans);
          setSlam(res.data.slam);

          setCoinBalance(res.data.slam);
          // setCurrency(res.data.currency);
          setLastAmount(res.data.last_amount);
          setLastDate(res.data.last_date);
          setCurrency(res.data.currency);
        } else {
          localStorage.setItem("slamtoken", "");
          localStorage.setItem("isLogin", "");
          // window.location.href = '/';
        }
      })
      .catch((error) => {
        // console.log(error, "this is error")
        localStorage.setItem("slamtoken", "");
        localStorage.setItem("isLogin", "");
        window.location.href = "/";
      });
  };

  const manageData = async () => {
    const res = await axios.get(
      process.env.REACT_APP_SLAMBACKEND + "api/manages",
      { token: token }
    );
    setEmail(res.data.email);
    setSoldAmount(res.data.soldAmount);
    setPresaleTokenNumber(res.data.presaleTokenNumber);

    if (
      res.data.currentSoldAmount > res.data.limitTokenNumber &&
      res.data.limitTokenNumber > 0 &&
      res.data.togglePresalePrice == "Yes"
    ) {
      setTokenPrice(res.data.limitTokenPrice);
      setPresaleTokenNumber(11000000);
    } else setTokenPrice(res.data.tokenPrice);

    if (res.data.presaleEndSec > 0) {
      setEndTimeSeconds(res.data.presaleEndSec);
      setPresaleEndSec(true);
    } else {
      setEndTimeSeconds(res.data.countDownSec);
      setPresaleEndSec(false);
    }

    setMarketCap(res.data.marketCap);
    setMarketCapOld(res.data.marketCapOld);
    setMaximumExchange(res.data.maximumExchange);
    setMinimumExchange(res.data.minimumExchange);
    setSoldTokenNumber(res.data.currentSoldAmount);

    maximumExchangeOrg = res.data.maximumExchange;
    minimumExchangeOrg = res.data.minimumExchange;
    maximumExchangeInc = res.data.maximumExchangeInc;
    minimumExchangeInc = res.data.minimumExchangeInc;

    limitTokenNumber = res.data.limitTokenNumber;
    limitTokenPrice = res.data.limitTokenPrice;
    togglePresalePrice = res.data.togglePresalePrice;

    if (res.data.maxMinToggle == "Yes") setMaxMinEnable(true);
    else setMaxMinEnable(false);

    if (res.data.blockBuyToggle == "Yes") setBuyingBlock(true);
    else setBuyingBlock(false);

    if (res.data.progressbarToggle == "Yes") setProgressbarToggle(true);
    else setProgressbarToggle(false);

    if (res.data.countdownToggle == "Yes") setCountdownToggle(true);
    else setCountdownToggle(false);
  };

  const getCurSoldAmount = () => {
    axios
      .post(process.env.REACT_APP_SLAMBACKEND + "api/currentSoldTokenAmount")
      .then((res) => {
        setSoldTokenNumber(res.data.currentSoldAmount);
        if (res.data.currentSoldAmount > 11000000) {
          clearInterval(interval);
          setSoldTokenNumber(11000000);
          // setBuyingBlock(true);
          // setMinimumExchange(minimumExchangeOrg);
          // setMaximumExchange(maximumExchangeOrg);
        } else {
          if (
            res.data.currentSoldAmount > limitTokenNumber &&
            res.data.limitTokenNumber > 0 &&
            res.data.limitTokenPrice > 0 &&
            res.data.togglePresalePrice == "Yes"
          ) {
            setTokenPrice(res.data.limitTokenPrice);
            setMinimumExchange(minimumExchangeInc);
            setMaximumExchange(maximumExchangeInc);
            setPresaleTokenNumber(11000000);
          } else {
            setTokenPrice(tokenPrice);
          }
        }
      });
  };

  const [coinImg, setCoinImg] = useState("/image/new-slamcoin.svg");

  const setCardContent = (token, image, coinAmount, amount, minAmount) => {
    setCoin(token);
    setSelectCrypto(token);
    setCoinImg(image);
    setCoinBalance(coinAmount);
    setCoinBalanceUsd(amount);
    setMinCryptoSend(minAmount);
  };

  useEffect(() => {
    if (!web3 || !web3_bnb) {
      setProviderError(true);
      setProviderErrorDialog(true);
    }
    const init = async () => {
      await tokenData();
      await manageData();

      interval = setInterval(() => {
        getCurSoldAmount();
      }, 5000);
    };
    init();
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="main-container py-30 px-20 bg-white main-body">
      <Header />
      <main>
        <div className="main-title font-48 main-bold color-black my-5">
          My Wallet
        </div>
        <Wallet
          slam={slam}
          tokenPrice={tokenPrice}
        />
        <TokenSale
          setMaxBalance={setMaxBalance}
          setSelectCrypto={setSelectCrypto}
          setExchange={setExchange}
          setExchangeSuccess={setExchangeSuccess}
          sendCryptobalance={sendCryptobalance}
          setWarningTrans={setWarningTrans}
          presaleTokenNumber={presaleTokenNumber}
          tokenPrice={tokenPrice}
          progressbarToggle={progressbarToggle}
          soldAmount={soldAmount}
          soldTokenNumber={soldTokenNumber}
          sendCryptobalance={sendCryptobalance}
          ethBalance={ethBalance}
          bnbBalance={bnbBalance}
          modalInput={modalInput}
          setModalInput={setModalInput}
        />
        <SystemWalletBalance
          coin={coin}
          slam={slam}
          tokenPrice={tokenPrice}
          ethBalance={ethBalance}
          ethPrice={ethPrice}
          bnbBalance={bnbBalance}
          bnbPrice={bnbPrice}
        />
        <DifiShaking
          setStakeCoin={setStakeCoin}
          setStakeModalshow={setStakeModalshow}
        />
        <StakeModal
          stakeCoin={stakeCoin}
          stakeModalshow={stakeModalshow}
          setStakeModalshow={setStakeModalshow}
        />
      </main>
    </div>
  );
}
