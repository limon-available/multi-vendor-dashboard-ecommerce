import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { admin_login, messageClear } from "../../store/Reducers/authReducer";
import { PropagateLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth,
  );

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(admin_login(state));
  };

  const overrideStyle = {
    display: "flex",
    margin: "0 auto",
    height: "24px",
    justifyContent: "center",
    alignItems: "center",
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigate("/admin/dashboard");
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [errorMessage]);

  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 flex justify-center items-center px-4">
      <div className="w-[380px] text-[#ffffff] p-2 animate-fade-in-up">
        <div className="bg-white/10 backdrop-blur-xl border border-white/15 p-7 rounded-2xl shadow-soft">
          <div className="h-[70px] flex justify-center items-center">
            <div className="w-[180px] h-[50px]">
              <img
                className="w-full h-full object-contain"
                src="/images/logo.png"
                alt="image"
              />
            </div>
          </div>

          <form onSubmit={submit}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="email">Email</label>
              <input
                onChange={inputHandle}
                value={state.email}
                className="px-3 py-2.5 outline-none border border-white/20 bg-white/10 rounded-lg text-white placeholder-white/50 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-400/30 transition-all"
                type="email"
                name="email"
                placeholder="Email"
                id="email"
                required
              />
            </div>

            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="password">Password</label>
              <input
                onChange={inputHandle}
                value={state.password}
                className="px-3 py-2.5 outline-none border border-white/20 bg-white/10 rounded-lg text-white placeholder-white/50 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-400/30 transition-all"
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                required
              />
            </div>

            <button
              disabled={loader ? true : false}
              className="bg-gradient-to-r from-indigo-600 to-indigo-500 w-full hover:shadow-indigo-500/40 hover:shadow-lg font-semibold text-white rounded-lg px-7 py-2.5 mb-3 transition-all"
            >
              {loader ? (
                <PropagateLoader color="#fff" cssOverride={overrideStyle} />
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
