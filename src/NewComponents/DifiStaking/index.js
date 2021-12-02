import slmIcon from "../Home/images/icons/2.png";
import bnbIcon from "../Home/images/icons/bnb.png";
import ethIcon from "../Home/images/icons/eth.png";
import DataRow from "./DataRow";

export default function DifiShaking({ setStakeCoin, setStakeModalshow }) {
  return (
    <div className="main-difi_staking my-5">
      <div className="font-36 main-bold color-black my-4">DeFi-Staking</div>
      <div className="main-card p-30 w-100 table-body">
        <div className="table-responsive-xl">
          <table className="table text-center">
            <thead>
              <tr className="color-gray font-18 main-semibold">
                <th scope="col">Token</th>
                <th scope="col">Est. APY</th>
                <th scope="col">Duration (days) </th>
                <th scope="col">Minimum Locked Amount</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <DataRow
                imgUrl={slmIcon}
                symbol="$SLM"
                percent={5}
                amount={0.001}
                setStakeCoin={setStakeCoin}
                setStakeModalshow={setStakeModalshow}
              />
              <DataRow
                imgUrl={bnbIcon}
                symbol="BNB"
                percent={5}
                amount={0.001}
                setStakeCoin={setStakeCoin}
                setStakeModalshow={setStakeModalshow}
              />
              <DataRow
                imgUrl={ethIcon}
                symbol="ETH"
                percent={5}
                amount={0.001}
                setStakeCoin={setStakeCoin}
                setStakeModalshow={setStakeModalshow}
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
