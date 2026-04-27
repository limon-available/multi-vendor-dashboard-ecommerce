import React, { useState } from "react";
import Search from "../components/Search";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Pagination from "../Pagination";
import { useDispatch } from "react-redux";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
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
  console.log("userInfo", userInfo);
  console.log("orders", myOrders);
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
      <h1 className="text-[#000000] font-semibold text-lg mb-3">Orders</h1>

      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
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
                <tr key={i}>
                  <td>#{d._id}</td>
                  <td>${d.price}</td>
                  <td>{d.payment_status}</td>
                  <td>{d.delivery_status}</td>

                  <td>
                    <Link to={`/seller/dashboard/order/details/${d._id}`}>
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
