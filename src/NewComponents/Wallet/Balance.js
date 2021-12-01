export default function Balance({ slam, tokenPrice }) {
  return (
    <div className="col-xl-8 px-2">
      <div className="main-card p-30 bg-blue color-white h-100 w-100 position-relative">
        <div class="big-circle"></div>
        <div class="small-circle"></div>
        <div className="main-balance_title font-36 main-bold">Your Balance</div>
        <div className="main-balance_text font-24 py-20 main-semibold w-75">
          Here you can check your balance in USD. Here you can check your
          balance in USD.
        </div>
        <div className="main-balance_bottom d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-end">
            <div className="main-balance_value font-78 main-bold">
              ${parseFloat(slam * tokenPrice).toFixed(2)}
            </div>
            <div className="main-balance_percent font-24 main-bold mb-4 ml-3">
              +12.5%
            </div>
          </div>
          <div>
            <button className="main-big_button main-border_white bg-trans color-white font-24">
              Top Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
