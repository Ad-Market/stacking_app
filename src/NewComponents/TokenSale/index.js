import { useState } from "react";
import chart from "../Home/images/chart.png";
import twoIcon from "../Home/images/icons/2.png";
import { useTranslation } from "react-i18next";
import Modal from "react-bootstrap/Modal";

export default function TokenSale({
  presaleTokenNumber,
  tokenPrice,
  progressbarToggle,
  soldAmount,
  soldTokenNumber,
  sendCryptobalance,
  setTransferMode,
  setMaxBalance,
  setSelectCrypto,
  setExchange,
  setExchangeSuccess,
  setWarningTrans,
  modalInput,
  setModalInput,
  ethBalance,
  bnbBalance,
}) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  return (
    <div className="main-statistic my-5">
      <div className="main-card p-30 w-100">
        <div className="main-statistic_title main-bold font-36 color-black">
          Token Sale
        </div>
        <div className="main-statistic_chart my-4">
          <img src={chart} alt="chart" width="100%" height="300px" />
        </div>
        <div className="main-statistic_bottom my-4">
          <div className="d-flex justify-content-between">
            <div className="token-symbol_text font-24 main-semibold color-black">
              Token Symbol
            </div>
            <div className="token-symbol_symbols d-flex align-items-center">
              <img
                src={twoIcon}
                alt="main-coin"
                className="token-sale_img"
                width="45px"
                height="45px"
              />
              <div className="color-gray font-18 main-regular ml-3">$SLM</div>
            </div>
          </div>
          <div className="d-flex justify-content-between py-2">
            <div className="token-symbol_text font-24 main-semibold color-black">
              Tokens for Presale
            </div>
            <div className="token-symbol_symbols d-flex align-items-center">
              <div className="color-gray font-18 main-regular">
                {new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(presaleTokenNumber)}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="token-symbol_text font-24 main-semibold color-black">
              Token Presale Price
            </div>
            <div className="token-symbol_symbols d-flex align-items-center">
              <div className="color-gray font-18 main-regular">
                $ {tokenPrice.toLocaleString("en-US")}
                {progressbarToggle && (
                  <span>
                    &nbsp;/&nbsp;
                    <span className="text-success">
                      {new Intl.NumberFormat("en-US", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(soldAmount ? soldAmount : soldTokenNumber)}
                    </span>
                    &nbsp;$SLM {t("Sold")}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="main-statistic_btn d-flex justify-content-end">
          <button
            className="main-big_button bg-blue main-border_green color-white font-18 main-semibold"
            onClick={() => setShow(true)}
          >
            Buy
          </button>
        </div>
      </div>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <div className="p-30">
          <div className="modal-header border-0 row">
            <h4 className="modal-title color-gray font-24 main-medium">
              Buy $SLM token
            </h4>
          </div>

          <div>
            <div className="form-group">
              <div className="d-flex align-items-center justify-content-between">
                <button
                  className="main-small_button color-white mr-3 flex-fill bg-blue font-24 main-medium main-border_green change_button"
                  onClick={(e) => {
                    setMaxBalance(ethBalance);
                    setSelectCrypto("ETH");
                    setModalInput("");
                    setExchange(false);
                    setExchangeSuccess(false);
                    setWarningTrans(false);
                  }}
                >
                  ETH
                </button>
                <button
                  className="main-small_button color-blue bg-white flex-fill font-24 main-medium color-black main-border_green change_button"
                  onClick={(e) => {
                    setMaxBalance(bnbBalance);
                    setSelectCrypto("BNB");
                    setModalInput("");
                    setExchange(false);
                    setExchangeSuccess(false);
                    setWarningTrans(false);
                  }}
                >
                  BNB
                </button>
              </div>
            </div>
            <div className="form-group my-4">
              <div>
                <label
                  for="coin-amount"
                  className="font-18 color-blue main-medium"
                >
                  <img src="images/icons/wallet-icon.jpg" alt="" width="30px" />
                  0.00000(max):
                </label>
                <input
                  type="number"
                  className="form-control font-24 p-2 main-medium"
                  id="coin-amount"
                  width="100%"
                  placeholder="0.0"
                  step="0.01"
                  value={modalInput}
                  onChange={(e) => setModalInput(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                type="button"
                className="main-small_button color-white w-100 bg-blue main-border_green font-24 main-medium"
                data-dismiss="modal"
                onClick={sendCryptobalance}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
