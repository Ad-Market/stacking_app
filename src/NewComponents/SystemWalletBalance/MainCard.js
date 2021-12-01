export default function MainCard({
  imgUrl,
  symbol,
  coinAmount,
  coinName,
  usdAmount,
}) {
  return (
    <div className="col-xl-4 px-2">
      <div className="main-card p-30 w-100 d-flex">
        <div className="mr-4">
          <img src={imgUrl} alt="main-coin" className="main-coin_img" width="92px" height="92px" />
        </div>
        <div className="w-100 d-flex flex-column justify-content-between">
          <div className="d-flex justify-content-between">
            <div className="font-24 main-semibold color-black">{symbol}</div>
            <div className="font-24 main-semibold color-black">{coinAmount}</div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="font-18 main-medium color-gray">{coinName}</div>
            <div className="font-18 main-medium color-gray">${usdAmount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
