import React, { useState } from "react";
import Search from "../components/Search";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Pagination from "../Pagination";
import { useDispatch } from "react-redux";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import StatusPill from "../components/StatusPill";
import {
  get_seller_order,
  get_seller_orders,
} from "./../../store/Reducers/OrderReducer";
const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const { myOrders } = useSelector((state) => state.order);
  const userInfo = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInfo?.userInfo?._id) return;
    dispatch(
      get_seller_orders({
        parPage,
        page: currentPage,
        searchValue,
        sellerId: userInfo?.userInfo?._id,
      }),
    );
  }, [currentPage, searchValue, parPage, userInfo]);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-slate-800 font-bold text-xl font-display mb-3">Orders</h1>

      <div className="w-full p-5 bg-[#6a5fdf] rounded-xl shadow-soft">
        <Search
          setParPage={setParPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />

        <div className="relative overflow-x-auto mt-5">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  Order Id
                </th>
                <th scope="col" className="py-3 px-4">
                  Price
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Order Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {myOrders.map((d, i) => (
                <tr key={i} className="border-b border-slate-600/40 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-medium whitespace-nowrap">#{d._id}</td>
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">${d.price}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <StatusPill status={d.payment_status} />
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <StatusPill status={d.delivery_status} />
                  </td>

                  <td className="py-3 px-4 whitespace-nowrap">
                    <Link
                      to={`/seller/dashboard/order/details/${d._id}`}
                      className="inline-flex w-9 h-9 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
                    >
                      <FaEye />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full flex justify-end mt-4 bottom-4 right-4">
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={50}
            parPage={parPage}
            showItem={3}
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
