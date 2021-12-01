import React, { useEffect, useState, useCallback } from "react";
import { Modal } from "react-bootstrap";
import slmIcon from "../Home/images/icons/2.png";
import bnbIcon from "../Home/images/icons/bnb.png";
import dangerIcon from "../Home/images/icons/danger.svg";
import ethIcon from "../Home/images/icons/eth.png";
import "./stakeModal.css";
import "./../Home/index.css";

export default function StackModal({
  stakeCoin,
  stakeModalshow,
  setStakeModalshow,
}) {
  const [confirmed, setConfirmed] = useState(false);

  const handleClose = () => {
    setConfirmed(false);
    setStakeModalshow(false);
  };

  return (
    <Modal show={stakeModalshow} className="stakeModal" centered scrollable={true} onHide={() => handleClose()}>
      <Modal.Header className="p-0" closeButton={confirmed}>
        <Modal.Title className="main-bold font-36 color-black">
          DeFi-Staking
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        className={
          confirmed && "d-flex align-items-center justify-content-center"
        }
      >
        {confirmed ? (
          <div className="text-center confirmed-panel justify-content-center">
            <img src={dangerIcon} className="mb-30" alt="danger-image" />
            <h3 className="font-black main-bold font-48">Coming Soon</h3>
          </div>
        ) : (
          <>
            <div className="title-panel d-flex align-items-center py-30">
              <img
                src={
                  stakeCoin === "$SLM"
                    ? slmIcon
                    : stakeCoin === "BNB"
                    ? bnbIcon
                    : ethIcon
                }
                alt="coin-icon"
              />
              <span className="main-semibold font-20 color-black">
                {stakeCoin}
              </span>
            </div>
            <div className="type-panel">
              <label
                htmlFor="typeSelect"
                className="font-16 color-gray main-medium"
              >
                Type
              </label>
              <select
                id="typeSelect"
                className="form-select main-big_form font-18 color-black main-medium rounded-form border-form mb-30"
                aria-label="Default select example"
              >
                <option defaultValue>Flexible</option>
              </select>
            </div>
            <div className="lock-amount-panel">
              <label
                htmlFor="amountInput"
                className="d-flex justify-content-between font-16 color-gray main-medium align-items-center"
              >
                <span>Lock Amount</span>
                <span>Available amount 0.000000BNB</span>
              </label>
              <div className="input-box mb-30">
                <input
                  type="text"
                  id="amountInput"
                  className="form-control main-big_form d-flex align-items-center p-form-control font-18 color-black main-medium rounded-form border-form"
                  placeholder="Please enter the amount"
                />
                <span className="stake-unit main-semiblod color-black font-18">
                  {stakeCoin}
                </span>
              </div>
            </div>
            <div className="min-max-amount-panel main-medium">
              <p className="color-gray font-16 mb-20">
                Locked Amount Limitation
              </p>
              <p className="d-flex justify-content-between color-black font-18 pb-15">
                <span>Minimum: 0.00001 BNB</span>
                <span>Maximum: 100 BNB</span>
              </p>
            </div>
            <div className="summary-panel">
              <h3 className="title main-semibold color-black font-24 py-30">
                Summary
              </h3>
              <div className="d-flex justify-content-between align-items-center mb-30">
                <span className="color-gray main-medium font-16">
                  Redemption Period
                </span>
                <span className="color-black main-mediumn font-18">1 Days</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-30">
                <span className="color-gray main-medium font-16">
                  Interest Period
                </span>
                <span className="color-black main-mediumn font-18">1 Days</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span className="color-gray main-medium font-16">Est. APY</span>
                <span className="color-green main-mediumn font-18">5%</span>
              </div>
            </div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn confirm-btn m-0 main-big_button color-white bg-blue main-semibold"
          onClick={() => (confirmed ? handleClose() : setConfirmed(true))}
        >
          {confirmed ? "Close" : "Confirm"}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
