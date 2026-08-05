import React, { useEffect } from "react";
import { MdCurrencyExchange, MdProductionQuantityLimits } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_seller_dashboard_data } from "../../store/Reducers/dashboardReducer";
import moment from "moment";
import customer from "../../assets/demo.jpg";
import StatusPill from "../components/StatusPill";
import socket from "../../utils/socket";

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const {
    totalSale,
    totalOrder,
    totalProduct,
    totalPendingOrder,
    recentOrder,
    recentMessage,
  } = useSelector((state) => state.dashboard);
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo?.id && userInfo.role === "seller") {
      const sellerId = userInfo.id;

      socket.emit("add_seller", sellerId, {
        id: sellerId,
        name: userInfo.name,
        image: userInfo.image,
        role: userInfo.role,
      });

      return () => {
        socket.off("add_seller");
      };
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(get_seller_dashboard_data());
  }, []);

  const monthData = Array(12)
    .fill(0)
    .map(() => ({ orders: 0, revenue: 0, sales: 0 }));

  recentOrder.forEach((order) => {
    const orderDate = order.createdAt || order.date;
    const monthIndex = orderDate ? moment(orderDate).month() : -1;

    if (monthIndex >= 0 && monthIndex < 12) {
      monthData[monthIndex].orders += 1;
      monthData[monthIndex].revenue += Number(order.price) || 0;
      monthData[monthIndex].sales +=
        order.products?.reduce(
          (total, product) => total + (Number(product.quantity) || 0),
          0,
        ) || 0;
    }
  });

  if (!recentOrder.length) {
    const currentMonth = moment().month();
    monthData[currentMonth].orders = totalOrder;
    monthData[currentMonth].revenue = Number(totalSale) || 0;
  }

  const state = {
    series: [
      {
        name: "Orders",
        data: monthData.map((month) => month.orders),
      },
      {
        name: "Revenue",
        data: monthData.map((month) => month.revenue),
      },
      {
        name: "Sales",
        data: monthData.map((month) => month.sales),
      },
    ],
    options: {
      color: ["#181ee8", "#181ee8"],
      plotOptions: {
        radius: 30,
      },
      chart: {
        background: "transparent",
        foreColor: "#d0d2d6",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: ["smooth", "straight", "stepline"],
        lineCap: "butt",
        colors: "#f0f0f0",
        width: 0.5,
        dashArray: 0,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apl",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      legend: {
        position: "top",
      },
      responsive: [
        {
          breakpoint: 565,
          yaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apl",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            chart: {
              height: "550px",
            },
          },
        },
      ],
    },
  };

  return (
    <div className="px-2 md:px-7 py-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        <div className="flex justify-between items-center p-5 bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl gap-3 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
          <div className="flex flex-col justify-start items-start text-white">
            <h2 className="text-3xl font-bold">${totalSale?.toFixed(2)}</h2>
            <span className="text-md font-medium">Total Sales</span>
          </div>

          <div className="w-[48px] h-[48px] shadow-md rounded-full bg-white/25 flex justify-center items-center text-xl">
            <MdCurrencyExchange className="text-white shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-2xl gap-3 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
          <div className="flex flex-col justify-start items-start text-white">
            <h2 className="text-3xl font-bold">{totalProduct}</h2>
            <span className="text-md font-medium">Products</span>
          </div>

          <div className="w-[48px] h-[48px] shadow-md rounded-full bg-white/25 flex justify-center items-center text-xl">
            <MdProductionQuantityLimits className="text-white shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl gap-3 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
          <div className="flex flex-col justify-start items-start text-white">
            <h2 className="text-3xl font-bold">{totalOrder}</h2>
            <span className="text-md font-medium">Orders</span>
          </div>

          <div className="w-[48px] h-[48px] shadow-md rounded-full bg-white/25 flex justify-center items-center text-xl">
            <FaCartShopping className="text-white shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl gap-3 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
          <div className="flex flex-col justify-start items-start text-white">
            <h2 className="text-3xl font-bold">{totalPendingOrder}</h2>
            <span className="text-md font-medium">Pending Orders</span>
          </div>

          <div className="w-[48px] h-[48px] shadow-md rounded-full bg-white/25 flex justify-center items-center text-xl">
            <FaCartShopping className="text-white shadow-lg" />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-wrap mt-7">
        <div className="w-full lg:w-7/12 lg:pr-3">
          <div className="w-full bg-[#6a5fdf] p-5 rounded-xl shadow-soft">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              height={350}
            />
          </div>
        </div>

        <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
          <div className="w-full bg-[#6a5fdf] p-5 rounded-xl shadow-soft text-[#d0d2d6]">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg text-[#d0d2d6] pb-3">
                Recent Customer Message
              </h2>
              <Link className="font-semibold text-sm text-[#d0d2d6]">
                View All
              </Link>
            </div>

            <div className="flex flex-col gap-2 pt-6 text-[#d0d2d6]">
              <ol className="relative border-1 border-slate-600 ml-4">
                {recentMessage.map((m, i) => (
                  <li key={i} className="mb-3 ml-6">
                    <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#4c7fe2] rounded-full z-10">
                      {m.senderId !== userInfo.id ? (
                        <img
                          className="w-full rounded-full h-full shadow-lg"
                          src={userInfo.image}
                          alt=""
                        />
                      ) : (
                        <img
                          className="w-full rounded-full h-full shadow-lg"
                          src={customer}
                          alt=""
                        />
                      )}
                    </div>
                    <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <Link className="text-md font-normal">
                          {m.senderName}
                        </Link>
                        <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                          {" "}
                          {moment(m.createdAt).startOf("hour").fromNow()}
                        </time>
                      </div>
                      <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                        {m.message}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-5 bg-[#6a5fdf] rounded-xl shadow-soft mt-6">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg text-[#d0d2d6] pb-3 ">
            Recent Orders
          </h2>
          <Link className="font-semibold text-sm text-[#d0d2d6]">View All</Link>
        </div>

        <div className="relative overflow-x-auto">
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
                  Active
                </th>
              </tr>
            </thead>

            <tbody>
              {recentOrder.map((d, i) => (
                <tr key={i} className="border-b border-slate-600/40 hover:bg-white/5 transition-colors">
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    #{d._id}
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    ${d.price}
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    <StatusPill status={d.payment_status} />
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    <StatusPill status={d.delivery_status} />
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    <Link
                      to={`/seller/dashboard/order/details/${d._id}`}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-all"
                    >
                      View
                    </Link>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
