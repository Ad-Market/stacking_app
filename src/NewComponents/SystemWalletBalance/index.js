import slmIcon from "../Home/images/icons/2.png";
import bnbIcon from "../Home/images/icons/bnb.png";
import ethIcon from "../Home/images/icons/eth.png";
import MainCard from "./MainCard";

export default function SystemWalletBalance({coin, slam, tokenPrice, ethBalance, ethPrice, bnbBalance, bnbPrice}) {
  return (
    <div class="main-system_wallet my-5">
      <div className="font-36 main-bold color-black my-4">
        System Wallet Balance
      </div>
      <div className="row">
        <MainCard
          imgUrl={slmIcon}
          symbol="$SLM"
          coinAmount={slam}
          coinName="Slamcoin"
          usdAmount={parseFloat(slam*tokenPrice).toFixed(2)}
        />
        <MainCard
          imgUrl={bnbIcon}
          symbol={"BNB"}
          coinAmount={parseFloat(bnbBalance).toFixed(4)}
          coinName="BNB (Bep-20)"
          usdAmount={parseFloat(bnbBalance*bnbPrice).toFixed(2)}
        />
        <MainCard
          imgUrl={ethIcon}
          symbol="ETh"
          coinAmount={parseFloat(ethBalance).toFixed(4)}
          coinName="Ethereum (ERC-20)"
          usdAmount={parseFloat(ethBalance*ethPrice).toFixed(2)}
        />
      </div>
    </div>
  );
}
