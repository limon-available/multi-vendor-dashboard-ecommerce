import React from "react";
import { FaList, FaRegBell } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ showSidebar, setShowSidebar }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  // Derive a friendly page title from the route (presentational only).
  const parts = pathname.split("/").filter(Boolean);
  const di = parts.indexOf("dashboard");
  const rest = (di >= 0 ? parts.slice(di + 1) : parts).filter(
    (p) => !/^[0-9a-f]{12,}$/i.test(p),
  );
  const pageTitle = rest.length ? rest.join(" ").replace(/-/g, " ") : "Overview";

  if (!userInfo) return null;
  return (
    <div className="fixed top-0 left-0 w-full py-5 px-2 lg:px-7 z-40">
      <div className="ml-0 lg:ml-[260px] rounded-2xl h-[68px] flex justify-between items-center bg-white/90 backdrop-blur shadow-card border border-slate-100 px-4 lg:px-5 transition-all">
        {/* Left: menu + page title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="w-[40px] flex lg:hidden h-[40px] rounded-xl bg-indigo-600 text-white shadow-lg hover:shadow-indigo-500/50 justify-center items-center cursor-pointer"
            aria-label="Toggle menu"
          >
            <FaList />
          </button>
          <div className="leading-tight">
            <h1 className="text-lg md:text-base font-bold font-display text-slate-800 capitalize">
              {pageTitle}
            </h1>
            <p className="text-xs text-slate-400 md:hidden">
              Welcome back, {userInfo.name?.split(" ")[0]} 👋
            </p>
          </div>
        </div>

        {/* Right: search + bell + profile */}
        <div className="flex items-center gap-3 lg:gap-4">
          <div className="relative hidden md:block">
            <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              className="w-[220px] xl:w-[170px] pl-9 pr-4 py-2.5 outline-none border bg-slate-50 border-slate-200 rounded-xl text-slate-700 text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all"
              type="text"
              name="search"
              placeholder="Search…"
            />
          </div>

          <button
            className="relative w-[42px] h-[42px] flex items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 transition-all"
            aria-label="Notifications"
          >
            <FaRegBell />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
          </button>

          <div className="h-8 w-px bg-slate-200 sm:hidden"></div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col text-end sm:hidden">
              <h2 className="text-sm font-bold text-slate-800 leading-tight">
                {userInfo.name}
              </h2>
              <span className="text-[12px] font-medium text-indigo-500 capitalize">
                {userInfo.role}
              </span>
            </div>

            <img
              className="w-[44px] h-[44px] rounded-full object-cover ring-2 ring-indigo-100"
              src={userInfo.role === "admin" ? "/images/admin.jpg" : userInfo.image}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
