export default function DataRow({
  index,
  imgUrl,
  symbol,
  percent,
  amount,
  setStakeCoin,
  setStakeModalshow,
}) {
  return (
    <tr key={`row-${index}`}>
      <th scope="row">
        <div className="d-flex align-items-center justify-content-center">
          <div>
            <img
              src={imgUrl}
              alt="main-coin"
              className="data-row_img"
              width="34px"
              height="34px"
            />
          </div>
          <div className="color-black font-18 main-semibold ml-3">{symbol}</div>
        </div>
      </th>
      <td className="color-green font-18 main-semibold">{percent}%</td>
      <td className="color-black font-18 main-semibold">Flexible Lock</td>
      <td className="color-black font-18 main-semibold">{amount} ETH</td>
      <td>
        <button
          type="button"
          className="main-small_button bg-blue color-white main-border_green"
          data-bs-toggle="modal"
          data-bs-target="#stakeModal"
          onClick={() => {
            setStakeCoin(symbol);
            setStakeModalshow(true)
          }}
        >
          Stake Now
        </button>
      </td>
    </tr>
  );
}
