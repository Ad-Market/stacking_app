import logo from "../Home/images/logo/logo.png";
import Balance from "./Balance";
import Transfer from "./Transfer";

export default function Wallet({ slam, tokenPrice}) {
  return (
    <div className="main-balance my-5">
      <div className="row">
        <Balance slam={slam} tokenPrice={tokenPrice} />
        <Transfer/>
      </div>
    </div>
  );
}
