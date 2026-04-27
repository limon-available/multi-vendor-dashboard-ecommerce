import React, { forwardRef, useEffect, useState } from "react";
import { MdCurrencyExchange } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FixedSizeList as List } from "react-window";
import {
  get_seller_payment_details,
  messageClear,
  send_withdrowal_request,
} from "../../store/Reducers/PaymentReducer";
import toast from "react-hot-toast";
import moment from "moment";

// scroll handler
function handleOnWheel({ deltaY }) {
  console.log("scroll:", deltaY);
}

const formatMoney = (num) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
  }).format(num);
// custom outer div
const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const Payments = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const {
    successMessage,
    errorMessage,
    loader,
    pendingWithdrows = [],
    successWithdrows = [],
    totalAmount = 0,
    withdrowAmount = 0,
    pendingAmount = 0,
    availableAmount = 0,
  } = useSelector((state) => state.payment);

  const [amount, setAmount] = useState("");

  // send request
  const sendRequest = (e) => {
    e.preventDefault();

    if (!amount || amount <= 0) {
      return toast.error("Enter valid amount");
    }

    if (availableAmount - amount > 10) {
      dispatch(
        send_withdrowal_request({
          amount,
          sellerId: userInfo?._id,
        }),
      );
      setAmount("");
    } else {
      toast.error("Insufficient Balance");
    }
  };

  // pending row
  const PendingRow = ({ index, style, data }) => {
    const item = data[index];
    if (!item) return <div style={style}>--</div>;

    return (
      <div style={style} className="flex text-sm text-white font-medium">
        <div className="w-[25%] p-2">{index + 1}</div>
        <div className="w-[25%] p-2"> {formatMoney(item.amount || 0)}</div>
        <div className="w-[25%] p-2">
          <span className="bg-slate-300 text-blue-500 px-2 py-[2px] rounded">
            {item.status}
          </span>
        </div>
        <div className="w-[25%] p-2">{moment(item.createdAt).format("LL")}</div>
      </div>
    );
  };

  // success row
  const SuccessRow = ({ index, style, data }) => {
    const item = data[index];
    if (!item) return <div style={style}>--</div>;

    return (
      <div style={style} className="flex text-sm text-white font-medium">
        <div className="w-[25%] p-2">{index + 1}</div>
        <div className="w-[25%] p-2">${item.amount}</div>
        <div className="w-[25%] p-2">
          <span className="bg-green-300 text-green-700 px-2 py-[2px] rounded">
            {item.status}
          </span>
        </div>
        <div className="w-[25%] p-2">{moment(item.createdAt).format("LL")}</div>
      </div>
    );
  };

  // load data
  useEffect(() => {
    if (userInfo?._id) {
      dispatch(get_seller_payment_details(userInfo._id));
    }
  }, [dispatch, userInfo?._id]);

  // messages
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      dispatch(get_seller_payment_details(userInfo._id)); // 🔥 refresh
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch, userInfo]);

  return (
    <div className="px-2 md:px-7 py-5">
      {/* cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
        <Card value={totalAmount} label="Total Sales" />
        <Card value={availableAmount} label="Available" />
        <Card value={withdrowAmount} label="Withdrawn" />
        <Card value={pendingAmount} label="Pending" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Pending */}
        <div className="bg-[#6a5fdf] p-5 rounded text-white">
          <h2 className="mb-3">Send Request</h2>

          <form onSubmit={sendRequest} className="flex gap-2 mb-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="flex-1 px-3 py-2 bg-transparent border rounded outline-none"
            />
            <button className="bg-red-500 px-5 rounded">
              {loader ? "..." : "Submit"}
            </button>
          </form>

          <TableHeader />

          {pendingWithdrows.length > 0 ? (
            <List
              height={300}
              itemCount={pendingWithdrows.length}
              itemSize={40}
              itemData={pendingWithdrows}
              outerElementType={outerElementType}
              width={"100%"}
            >
              {PendingRow}
            </List>
          ) : (
            <p>No pending requests</p>
          )}
        </div>

        {/* Success */}
        <div className="bg-[#6a5fdf] p-5 rounded text-white">
          <h2 className="mb-3">Success Withdrawals</h2>

          <TableHeader />

          {successWithdrows.length > 0 ? (
            <List
              height={300}
              itemCount={successWithdrows.length}
              itemSize={40}
              itemData={successWithdrows}
              width={"100%"}
            >
              {SuccessRow}
            </List>
          ) : (
            <p>No successful withdrawals</p>
          )}
        </div>
      </div>
    </div>
  );
};

// card
const Card = ({ value, label }) => (
  <div className="bg-white p-4 rounded flex justify-between items-center">
    <div>
      <h2 className="text-xl font-bold">{formatMoney(value || 0)}</h2>
      <p>{label}</p>
    </div>
    <MdCurrencyExchange size={25} />
  </div>
);

// table header
const TableHeader = () => (
  <div className="flex bg-[#a7a3de] text-xs font-bold mb-2">
    <div className="w-[25%] p-2">No</div>
    <div className="w-[25%] p-2">Amount</div>
    <div className="w-[25%] p-2">Status</div>
    <div className="w-[25%] p-2">Date</div>
  </div>
);

export default Payments;
